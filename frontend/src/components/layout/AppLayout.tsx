import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import AppSidebar from './AppSidebar';
import CreateBoardModal from '@/features/board/components/CreateBoard';
import { useEffect } from 'react';
import { getCsrfToken } from '@/lib/csrf';
import { useDispatch } from 'react-redux';
import { loadBoards } from '@/features/board/components/boardSlice';

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
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="p-4">
          <SidebarTrigger />
          <div className="mt-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
      <CreateBoardModal />
    </SidebarProvider>
  );
}
export default AppLayout;
