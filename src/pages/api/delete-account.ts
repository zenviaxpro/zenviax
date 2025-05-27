import { Router, RequestHandler } from 'express';
import { createClient } from '@supabase/supabase-js';
import { SERVER_ENV } from '@/config/server-env';
import axios from 'axios';

const router = Router();

// Criar cliente Supabase com a service role key
const supabase = createClient(
  SERVER_ENV.SUPABASE_URL,
  SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const deleteEvolutionInstance = async (instanceName: string) => {
  try {
    const response = await axios.delete(
      `${SERVER_ENV.EVOLUTION_API_URL}/instance/delete/${instanceName}`,
      {
        headers: {
          'apikey': SERVER_ENV.EVOLUTION_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status !== 200) {
      throw new Error('Falha ao deletar instância do Evolution API');
    }

    return true;
  } catch (error) {
    console.error('Erro ao deletar instância do Evolution API:', error);
    throw error;
  }
};

const deleteAccountHandler: RequestHandler = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    let instanceName: string | null = null;
    
    if (!user_id) {
      res.status(400).json({ error: 'ID do usuário não fornecido' });
      return;
    }

    // 1. Buscar dados do usuário antes de qualquer deleção
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single();

    if (userError || !userData) {
      console.error('Erro ao buscar usuário:', userError);
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Guardar o nome da instância para deletar depois
    instanceName = userData.instance;

    // 2. Buscar dados que precisamos arquivar
    const { data: paymentHistory } = await supabase
      .from('payment_history')
      .select('*')
      .eq('user_id', user_id);

    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user_id);

    // 3. Primeiro, deletar o usuário do Auth
    const authResponse = await fetch(`${SERVER_ENV.SUPABASE_URL}/auth/v1/admin/users/${user_id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': SERVER_ENV.SUPABASE_SERVICE_ROLE_KEY
      }
    });

    if (!authResponse.ok) {
      const error = await authResponse.json();
      console.error('Erro ao deletar conta do usuário no Auth:', error);
      res.status(500).json({ error: 'Erro ao deletar conta do usuário' });
      return;
    }

    // 4. Mover dados para as tabelas de arquivo
    // 4.1 Arquivar histórico de pagamentos
    if (paymentHistory?.length > 0) {
      const paymentDataToArchive = paymentHistory.map(payment => {
        const { created_at, updated_at, ...paymentData } = payment;
        return {
          ...paymentData,
          deleted_at: new Date().toISOString()
        };
      });

      const { error: insertPaymentError } = await supabase
        .from('payment_history_deleted')
        .insert(paymentDataToArchive);

      if (insertPaymentError) {
        console.error('Erro ao mover histórico de pagamentos:', insertPaymentError);
      }
    }

    // 4.2 Arquivar assinaturas
    if (subscriptions?.length > 0) {
      const subscriptionsToArchive = subscriptions.map(sub => {
        const { created_at, updated_at, ...subData } = sub;
        return {
          ...subData,
          deleted_at: new Date().toISOString()
        };
      });

      const { error: insertSubError } = await supabase
        .from('subscriptions_deleted')
        .insert(subscriptionsToArchive);

      if (insertSubError) {
        console.error('Erro ao mover assinaturas:', insertSubError);
      }
    }

    // 4.3 Arquivar dados do usuário
    const { created_at, updated_at, ...userDataToArchive } = userData;
    const { error: insertError } = await supabase
      .from('users_deleted')
      .insert({
        ...userDataToArchive,
        deleted_at: new Date().toISOString(),
        deletion_reason: 'user_requested'
      });

    if (insertError) {
      console.error('Erro ao mover dados para users_deleted:', insertError);
      res.status(500).json({ 
        error: 'Erro ao arquivar dados do usuário',
        details: insertError.message
      });
      return;
    }

    // 5. Deletar dados das tabelas originais na ordem correta
    // 5.1 Primeiro payment_history (dependente de subscriptions)
    const { error: deletePaymentError } = await supabase
      .from('payment_history')
      .delete()
      .eq('user_id', user_id);

    if (deletePaymentError) {
      console.error('Erro ao deletar payment_history:', deletePaymentError);
      res.status(500).json({ error: 'Erro ao deletar histórico de pagamentos' });
      return;
    }

    // 5.2 Depois subscriptions
    const { error: deleteSubError } = await supabase
      .from('subscriptions')
      .delete()
      .eq('user_id', user_id);

    if (deleteSubError) {
      console.error('Erro ao deletar subscriptions:', deleteSubError);
      res.status(500).json({ error: 'Erro ao deletar assinaturas' });
      return;
    }

    // 5.3 Depois contacts (se existir)
    const { error: deleteContactsError } = await supabase
      .from('contacts')
      .delete()
      .eq('user_id', user_id);

    if (deleteContactsError) {
      console.error('Erro ao deletar contacts:', deleteContactsError);
    }

    // 5.4 Por fim, deletar o usuário
    const { error: deleteUserError } = await supabase
      .from('users')
      .delete()
      .eq('id', user_id);

    if (deleteUserError) {
      console.error('Erro ao deletar user:', deleteUserError);
      res.status(500).json({ error: 'Erro ao deletar dados do usuário' });
      return;
    }

    // 6. Por fim, deletar a instância do Evolution API
    if (instanceName) {
      try {
        await deleteEvolutionInstance(instanceName);
      } catch (error) {
        console.error('Erro ao deletar instância do Evolution API:', error);
        res.status(500).json({ 
          error: 'Usuário deletado com sucesso, mas houve um erro ao deletar a instância do Evolution API',
          details: error instanceof Error ? error.message : 'Erro desconhecido'
        });
        return;
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar conta:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

router.delete('/', deleteAccountHandler);

export default router; 