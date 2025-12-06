import { Card, CardContent, CardHeader } from '../../../shared/ui/card';
import { LoginForm } from '../../../features/auth/login/ui/login-form';

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4">
      <Card className="w-full max-w-md border-slate-800/80 bg-slate-900/80 p-6 shadow-xl">
        <CardHeader title="Вход" />
        <CardContent>
          <p className="mb-4 text-sm text-slate-400">Авторизуйтесь, чтобы попасть в админку</p>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}

