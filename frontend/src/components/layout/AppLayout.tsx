import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AppSidebar from './AppSidebar';

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-4">
          <SidebarTrigger />
          <div className="mt-4">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
export default AppLayout;
