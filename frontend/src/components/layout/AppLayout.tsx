import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import { useEffect } from 'react';
import { getCsrfToken } from '@/lib/csrf';
import { useDispatch } from 'react-redux';
import { loadBoards } from '@/features/board/components/boardSlice';
import { Toaster } from '@/components/ui/sonner';
import Modal from '../ui/Modal';
import CreateBoard from '@/features/board/components/CreateBoard';

function AppLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBoards() {
      try {
        const csrfToken = await getCsrfToken();
        const response = await fetch('http://localhost:8000/api/boards/', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken,
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch boards');
          return;
        }

        const data = await response.json();
        dispatch(loadBoards(data));
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    }

    fetchBoards();
  }, [dispatch]);

  return (
    <>
      <SidebarProvider>
        <Modal>
          <AppSidebar />
          <SidebarInset>
            <main className="flex flex-col flex-1 p-4 max-w-full">
              <SidebarTrigger />
              <div className="flex-1 mt-4 max-w-full">
                <Outlet />
              </div>
            </main>
            <CreateBoard />
          </SidebarInset>
        </Modal>
      </SidebarProvider>
      <Toaster position="top-right" />
    </>
  );
}
export default AppLayout;
