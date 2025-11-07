import { NextRequest, NextResponse } from 'next/server';

export function POST() {
  const res = NextResponse.json({ message: 'Deslogado' }, { status: 200 });
  // Remover cookie de sessão
  res.cookies.set('session_token', '', { maxAge: 0, path: '/' });
  return res;
}
