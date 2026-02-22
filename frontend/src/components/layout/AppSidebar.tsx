import {
  ChevronsUpDown,
  LogOutIcon,
  LucidePlus,
  SquareKanban,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getCsrfToken } from '@/lib/csrf';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

function AppSidebar() {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();
  const myBoards = useSelector((state: RootState) => state.boards.boards);

  async function handleLogout() {
    const csrfToken = await getCsrfToken();

    const response = await fetch('http://localhost:8000/api/logout/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    if (response.ok) {
      navigate('/login');
    }
  }

  function openCreateBoardModal() {
    setSearchParams({ 'create-board': 'open' });
  }

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="py-5" asChild>
              <Link to="/app">
                <SquareKanban className="size-6!" />
                <span className="ml-1 text-lg font-bold">Kanban</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Boards</SidebarGroupLabel>
          <SidebarGroupContent>
            {myBoards.length === 0 ? (
              <SidebarGroupLabel>
                <p className="text-md text-muted-foreground">
                  You don't have any boards yet.
                </p>
              </SidebarGroupLabel>
            ) : (
              myBoards.map((board) => (
                <SidebarMenuItem key={board.id}>
                  <SidebarMenuButton asChild>
                    <Link to={`/app/board/${board.id}`}>{board.name}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
            <SidebarGroupAction onClick={openCreateBoardModal}>
              <LucidePlus />
            </SidebarGroupAction>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">JD</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">John Doe</span>
                    <span className="truncate text-xs">
                      john.doe@example.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
export default AppSidebar;
