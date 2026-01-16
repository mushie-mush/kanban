import Navbar from './Navbar';
import { Toaster } from '../ui/sonner';
import Sidebar from './Sidebar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
export default Layout;
