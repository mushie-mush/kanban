import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { AlertCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { login } from './authSlice';
import { getCsrfToken } from '@/lib/csrf';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const csrfToken = await getCsrfToken();

    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      dispatch(login(data));
      navigate('/app');
    } else {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <form
      className="flex flex-col flex-1 justify-center"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-8">Sign in to your board</h1>
      <div className="flex flex-col gap-6">
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input
            type="text"
            id="username"
            required
            disabled={loading}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            type="password"
            id="password"
            required
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <FieldDescription className="text-right">
            <Button variant="link" size="sm" type="button" disabled={loading}>
              Forgot password?
            </Button>
          </FieldDescription>
        </Field>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon />
            <AlertTitle>Login failed</AlertTitle>
            <AlertDescription>
              Please check your credentials and try again.
            </AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          Sign In
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Don't have an account?
        </span>
        <Button variant="link" size="sm" type="button" asChild>
          <Link to="/register">Sign Up</Link>
        </Button>
      </div>
    </form>
  );
}
export default LoginForm;
