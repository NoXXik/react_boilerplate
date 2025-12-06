import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../../../../shared/api/auth';
import { loginSchema, type LoginFormValues } from '../model/schema';
import { Button } from '../../../../shared/ui/button';
import { Input } from '../../../../shared/ui/input';
import { Label } from '../../../../shared/ui/label';

export function LoginForm() {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/');
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await mutateAsync(values);
  });

  const { errors } = form.formState;

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" {...form.register('email')} />
        {errors.email ? <p className="text-xs text-red-400">{errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Пароль</Label>
        <Input id="password" type="password" placeholder="••••••••" {...form.register('password')} />
        {errors.password ? <p className="text-xs text-red-400">{errors.password.message}</p> : null}
      </div>
      {error ? <p className="text-xs text-red-400">Ошибка входа: {error.message}</p> : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Входим...' : 'Войти'}
      </Button>
    </form>
  );
}

