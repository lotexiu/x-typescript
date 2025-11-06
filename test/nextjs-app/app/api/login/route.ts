import { NextRequest, NextResponse, userAgent } from 'next/server';
import { getRequestClientInfo } from '@/lib/request-info';

const fakeDatabase = [
  {email: 'admin@example.com', password: 'admin123'},
  {email: '1@gmail.com', password: '1'}
]

export async function POST(request: NextRequest) {
  const clientInfo = getRequestClientInfo(request);
  const { email, password } = await request.json();
  const user = fakeDatabase.find(user => user.email === email && user.password === password);

  if (user) {
    // Para fins de demonstração, geramos um "token" simples e estático.
    // Em produção, você geraria um JWT/código opaco no servidor.
    const fakeToken = `demo.${Buffer.from(email).toString('base64')}.${Date.now()}`;

    // Observação: Poderíamos também definir o cookie aqui no lado do servidor usando
    // NextResponse.cookies.set('session_token', fakeToken, { httpOnly: true, ... })
    // Porém, como vamos demonstrar o uso do cookies-next no cliente, vamos apenas
    // retornar o token e deixaremos o componente de login criá-lo no browser.
    return NextResponse.json({ message: 'Login bem-sucedido', token: fakeToken }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }
}