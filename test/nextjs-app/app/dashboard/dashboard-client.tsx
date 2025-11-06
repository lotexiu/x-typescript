'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LogOut, User, Monitor, Calendar, Clock, Shield, Activity } from 'lucide-react';

interface DashboardClientProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  session: {
    userAgent: string;
    ipAddress: string;
    createdAt: string;
    lastAccess: string;
  } | null;
}

export default function DashboardClient({ user, session }: DashboardClientProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        router.push('/login');
        router.refresh();
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto space-y-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="">Bem-vindo de volta!</p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            {isLoggingOut ? 'Saindo...' : 'Sair'}
          </Button>
        </div>

        {/* Cards de informação */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Informações do Usuário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informações do Usuário
              </CardTitle>
              <CardDescription>Dados da conta autenticada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Nome</p>
                <p className="text-lg font-semibold">{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-lg font-semibold">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">ID</p>
                <p className="text-lg font-mono">{user.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Informações da Sessão */}
          {session && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Informações da Sessão
                </CardTitle>
                <CardDescription>Detalhes da máquina e acesso</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Monitor className="h-4 w-4" />
                    Navegador / Sistema
                  </p>
                  <p className="text-sm mt-1 break-all">{session.userAgent}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Endereço IP</p>
                  <p className="text-sm font-mono">{session.ipAddress}</p>
                </div>
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Login realizado em
                  </p>
                  <p className="text-sm">{formatDate(session.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Último acesso
                  </p>
                  <p className="text-sm">{formatDate(session.lastAccess)}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Card de Status */}
        <Card>
          <CardHeader>
            <CardTitle>Status da Autenticação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm">Você está autenticado e sua sessão está ativa</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => router.push('/sessions')}
              className="w-full"
            >
              <Activity className="mr-2 h-4 w-4" />
              Ver Todas as Sessões Ativas
            </Button>
          </CardContent>
        </Card>

        {/* Informações de Teste */}
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100">
              ℹ️ Informações de Teste
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
            <p>✅ Esta página é protegida pelo middleware de autenticação</p>
            <p>✅ Apenas usuários autenticados podem acessá-la</p>
            <p>✅ As informações da sessão são armazenadas no servidor</p>
            <p>✅ Tente acessar esta página em modo anônimo para ver o redirect</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
