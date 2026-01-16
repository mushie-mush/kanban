import BoardPage from './pages/BoardPage';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './components/ThemeProvider';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <BoardPage />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
