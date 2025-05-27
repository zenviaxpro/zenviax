import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, User, Settings, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const CustomHeader: React.FC = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-500">Zenviax</h1>
        </Link>

        <div className="flex items-center gap-4">
          {auth.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-gray-800">
                  <User className="h-4 w-4 mr-2" />
                  {auth.user?.name?.split(' ')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-gray-800 border-gray-700">
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard")}
                  className="text-gray-300 focus:bg-gray-700 focus:text-gray-100"
                >
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/planos")}
                  className="text-gray-300 focus:bg-gray-700 focus:text-gray-100"
                >
                  Planos
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-100 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/settings')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-100 hover:bg-gray-700 cursor-pointer" onClick={() => navigate('/policies')}>
                  <FileText className="mr-2 h-4 w-4" />
                  Políticas
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-400 focus:bg-red-500/10 focus:text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                size="sm"
                className="text-gray-300 hover:bg-gray-800"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/register")}
                variant="default"
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                Criar Conta
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
