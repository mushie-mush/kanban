import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function Task() {
  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>
          <span className="text-lg font-semibold">Example Task 2</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Example Task 2</p>
      </CardContent>
    </Card>
  );
}
export default Task;
