import AuthLayout from '@/components/layout/AuthLayout';
import LoginForm from '@/features/user/components/LoginForm';

function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
export default LoginPage;
