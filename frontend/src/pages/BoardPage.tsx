import { Container, Heading } from '@radix-ui/themes';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/Tabs';
import Board from '../features/board/components/Board';
import Setting from '../features/board/components/Setting';

function BoardPage() {
  return (
    <Container p="5">
      <header className="mb-4">
        <Heading as="h1" size="8" mb="2">
          Kanban Board
        </Heading>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ea quia
          autem adipisci nostrum nihil fugit corporis. Porro unde blanditiis
          explicabo nisi reiciendis, sapiente aut voluptas assumenda minus quod
          voluptatibus!
        </p>
      </header>
      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Board View</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="board">
          <Board />
        </TabsContent>
        <TabsContent value="settings">
          <Setting />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
export default BoardPage;
