import AuthLayout from '@/components/layout/AuthLayout';
import RegisterForm from '@/features/user/components/RegisterForm';

function RegistrationPage() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
export default RegistrationPage;
