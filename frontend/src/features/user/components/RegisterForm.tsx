import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError(false);
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, username, password }),
    });

    if (response.ok) {
      navigate('/dashboard');
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
      <h1 className="text-3xl font-bold mb-8">Create an account</h1>
      <div className="flex flex-col gap-6">
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            type="email"
            id="email"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </Field>
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
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <FieldDescription className="text-right">
            <Button variant="link" size="sm" type="button" disabled={loading}>
              Forgot password?
            </Button>
          </FieldDescription>
        </Field>
        <Button type="submit" className="w-full" disabled={loading}>
          Sign Up
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?
        </span>
        <Button variant="link" size="sm" type="button" asChild>
          <Link to="/login">Sign In</Link>
        </Button>
      </div>
    </form>
  );
}
export default RegisterForm;
