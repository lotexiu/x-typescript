import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import DashboardClient from './dashboard-client';

export default async function DashboardPage() {
  const user: any = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com"
  }
  const session: any = {
    userAgent: "Mozilla/5.0",
    ipAddress: "192.168.1.1",
    createdAt: new Date(),
    lastAccess: new Date()
  }

  return (
    <DashboardClient 
      user={{
        id: user.id,
        name: user.name,
        email: user.email
      }}
      session={session ? {
        userAgent: session.userAgent,
        ipAddress: session.ipAddress,
        createdAt: session.createdAt.toISOString(),
        lastAccess: session.lastAccess.toISOString()
      } : null}
    />
  );
}
