import { LoginForm } from '@/components/login-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center",
    )}>
      <LoginForm />
    </div>
  );
}
