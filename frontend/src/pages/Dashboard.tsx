import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { ArchiveX } from 'lucide-react';

function Dashboard() {
  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back! Here's an overview of your boards and tasks.
            </p>
          </div>
        </div>

        <div className="mt-8 p-8 rounded-lg border border-neutral-200 text-center ">
          <ArchiveX className="mx-auto mb-4 text-muted-foreground" size={36} />
          <p className="text-center text-muted-foreground">
            You don't have any boards yet. <br />
            Start by creating a new board to organize your tasks and projects.
          </p>
          <Button className="mt-4">Create Board</Button>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="bg-card p-4">
            <p className="text-center text-muted-foreground">
              No recent activity.
            </p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
export default Dashboard;
