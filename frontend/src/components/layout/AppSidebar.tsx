import { ChevronsUpDown, LogOutIcon } from 'lucide-react';
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getCsrfToken } from '@/lib/csrf';
import { useNavigate } from 'react-router';

function AppSidebar() {
  const navigate = useNavigate();

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

  return (
    <Sidebar variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>My Boards</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarGroupLabel>
              <p className="text-md text-muted-foreground">
                You don't have any boards yet.
              </p>
            </SidebarGroupLabel>
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
