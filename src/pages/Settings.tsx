import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomHeader } from '@/components/CustomHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

const Settings = () => {
  const { auth, updatePassword, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error('As novas senhas não conferem');
      return;
    }

    setIsLoading(true);
    try {
      await updatePassword(currentPassword, newPassword);
      toast.success('Senha atualizada com sucesso');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      toast.error('Erro ao atualizar senha');
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      toast.success('Conta excluída com sucesso');
      navigate('/');
    } catch (error) {
      toast.error('Erro ao excluir conta');
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <CustomHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-100">Configurações da Conta</h1>

          {/* Alterar Senha */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Alterar Senha</CardTitle>
              <CardDescription className="text-gray-400">
                Atualize sua senha de acesso
              </CardDescription>
            </CardHeader>

            <form onSubmit={handlePasswordUpdate}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Senha atual
                  </label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Nova senha
                  </label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Confirme a nova senha
                  </label>
                  <Input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-gray-100"
                    required
                  />
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Atualizando...' : 'Atualizar Senha'}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Excluir Conta */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Excluir Conta</CardTitle>
              <CardDescription className="text-gray-400">
                Exclua permanentemente sua conta e todos os dados associados
              </CardDescription>
            </CardHeader>

            <CardContent>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    Excluir Conta
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-gray-800 border-gray-700">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-100">
                      Tem certeza?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400">
                      Esta ação não pode ser desfeita. Isso excluirá permanentemente sua
                      conta e removerá seus dados de nossos servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-700 text-gray-100 hover:bg-gray-600">
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings; 