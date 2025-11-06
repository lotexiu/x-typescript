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
    return NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
  }
}