'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Monitor, MapPin, Calendar, Clock, User } from 'lucide-react';

interface SessionData {
  userId: string;
  token: string;
  userAgent: string;
  ipAddress: string;
  createdAt: string;
  lastAccess: string;
}

interface SessionsClientProps {
  user: {
    id: string;
    name: string;
    email: string;
  };
  sessions: SessionData[];
}

export default function SessionsClient({ user, sessions }: SessionsClientProps) {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getTimeDiff = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000 / 60); // minutos

    if (diff < 1) return 'agora mesmo';
    if (diff < 60) return `há ${diff} minuto${diff > 1 ? 's' : ''}`;
    
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `há ${hours} hora${hours > 1 ? 's' : ''}`;
    
    const days = Math.floor(hours / 24);
    return `há ${days} dia${days > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <div className="max-w-6xl mx-auto space-y-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sessões Ativas</h1>
            <p className="text-muted-foreground">
              Visualize todas as sessões autenticadas no sistema
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </div>

        {/* Estatísticas */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total de Sessões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sessions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Usuário Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.name}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Suas Sessões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sessions.filter(s => s.userId === user.id).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Sessões */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Todas as Sessões</h2>
          
          {sessions.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Nenhuma sessão ativa no momento
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session, index) => (
                <Card key={index} className={session.userId === user.id ? 'border-blue-500 border-2' : ''}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Usuário ID: {session.userId}
                        {session.userId === user.id && (
                          <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                            Você
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {getTimeDiff(session.lastAccess)}
                      </span>
                    </CardTitle>
                    <CardDescription className="font-mono text-xs">
                      Token: {session.token}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          Navegador / Sistema
                        </p>
                        <p className="text-sm mt-1 break-all">{session.userAgent}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Endereço IP
                        </p>
                        <p className="text-sm font-mono mt-1">{session.ipAddress}</p>
                      </div>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          Criada em
                        </p>
                        <p className="text-sm mt-1">{formatDate(session.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          Último acesso
                        </p>
                        <p className="text-sm mt-1">{formatDate(session.lastAccess)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
