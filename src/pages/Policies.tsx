import React from 'react';
import { CustomHeader } from '@/components/CustomHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Policies = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <CustomHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-8">Políticas do Zenviax</h1>

          {/* LGPD */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Política de Privacidade e LGPD</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                A Zenviax está comprometida com a proteção dos seus dados pessoais. Esta política descreve como coletamos,
                usamos e protegemos suas informações de acordo com a Lei Geral de Proteção de Dados (LGPD).
              </p>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Dados que Coletamos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Informações de cadastro (nome, e-mail)</li>
                <li>Dados de contatos importados</li>
                <li>Histórico de mensagens enviadas</li>
                <li>Informações de pagamento</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Como Usamos seus Dados</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fornecer e melhorar nossos serviços</li>
                <li>Processar pagamentos</li>
                <li>Enviar comunicações importantes sobre o serviço</li>
                <li>Cumprir obrigações legais</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Seus Direitos</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou inexatos</li>
                <li>Solicitar a exclusão dos seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>
            </CardContent>
          </Card>

          {/* Política de Reembolso */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Política de Reembolso</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                A Zenviax oferece uma política de reembolso transparente para garantir sua satisfação com nossos serviços.
              </p>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Condições para Reembolso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Solicitações dentro de 7 dias após a contratação</li>
                <li>Problemas técnicos que impossibilitem o uso da plataforma</li>
                <li>Serviço não corresponde ao descrito</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Processo de Reembolso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Envie sua solicitação para suporte@zenviax.pro</li>
                <li>Inclua o motivo detalhado do reembolso</li>
                <li>O reembolso será processado em até 5 dias úteis</li>
                <li>O valor será devolvido no mesmo método de pagamento utilizado na compra</li>
              </ul>
            </CardContent>
          </Card>

          {/* Política de Cancelamento */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Política de Cancelamento</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Você pode cancelar sua assinatura a qualquer momento. Entenda como funciona nosso processo de cancelamento:
              </p>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Processo de Cancelamento</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acesse suas configurações de conta</li>
                <li>Clique em "Cancelar Assinatura"</li>
                <li>O acesso continua até o final do período pago</li>
                <li>Não há cobranças adicionais após o cancelamento</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-100 mt-4">Importante Saber</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Não há taxas de cancelamento</li>
                <li>Seus dados ficam disponíveis por 30 dias após o cancelamento</li>
                <li>Você pode reativar sua conta a qualquer momento</li>
                <li>Campanhas agendadas serão canceladas automaticamente</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Policies; 