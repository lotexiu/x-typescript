import { cookies } from 'next/headers';

export default async function DebugPage() {

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Debug de Autenticação</h1>
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cookies Atuais</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded overflow-auto">
            {JSON.stringify({}, null, 2)}
          </pre>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cookie de Autenticação ({})</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded overflow-auto">
            {JSON.stringify({}, null, 2)}
          </pre>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Cookie Antigo (auth_token)</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded overflow-auto">
            {JSON.stringify({}, null, 2)}
          </pre>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Usuário Atual</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded overflow-auto">
            {JSON.stringify({}, null, 2)}
          </pre>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Sessões Ativas ({})</h2>
          <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded overflow-auto text-xs">
            {JSON.stringify({}, null, 2)}
          </pre>
        </div>

        <div className="flex gap-4">
          <a 
            href="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ir para Login
          </a>
          <a 
            href="/dashboard" 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ir para Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
