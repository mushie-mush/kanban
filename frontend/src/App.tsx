import { Theme } from '@radix-ui/themes';
import BoardPage from './pages/BoardPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Theme>
      <Layout>
        <BoardPage />
      </Layout>
    </Theme>
  );
}

export default App;
