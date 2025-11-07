import { NextRequest, NextResponse, userAgent } from 'next/server';
import { getRequestClientInfo } from '@/lib/request-info';

const fakeDatabase = [
  {email: 'admin@example.com', password: 'admin123'},
  {email: '1@gmail.com', password: '1'},
  {email: 'aleph.melo@sgsistemas.com.br', password: 'aleph123'}
]

export async function POST(request: NextRequest) {
  const clientInfo = getRequestClientInfo(request);
  const { email, password } = await request.json();
  const user = fakeDatabase.find(user => user.email === email && user.password === password);

  if (user) {
    const fakeToken = `demo.${Buffer.from(email).toString('base64')}.${Date.now()}`;
    const res = NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 });
    
    const maxAge = 60*60;
    res.cookies.set('session_token', fakeToken, {
      httpOnly: true,
      maxAge,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    // Também colocamos um cookie legível pelo cliente com o timestamp de expiração.
    // Isso permite ao frontend agendar um logout sem precisar perguntar ao servidor todas as vezes.
    const expiresAt = String(Date.now() + maxAge * 1000);
    res.cookies.set('session_expires', expiresAt, {
      maxAge,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    return res;
  } else {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }
}