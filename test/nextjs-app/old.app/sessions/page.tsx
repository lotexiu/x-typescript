import SessionsClient from './sessions-client';

export default async function SessionsPage() {
  const user: any = {}
  const sessions: any = {}

  return (
    <SessionsClient 
      user={{
        id: user.id,
        name: user.name,
        email: user.email
      }}
      sessions={sessions.map(s => ({
        userId: s.userId,
        token: s.token.substring(0, 20) + '...', // Mostrar apenas parte do token
        userAgent: s.userAgent,
        ipAddress: s.ipAddress,
        createdAt: s.createdAt.toISOString(),
        lastAccess: s.lastAccess.toISOString()
      }))}
    />
  );
}
