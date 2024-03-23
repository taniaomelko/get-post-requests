import './App.scss';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Cards } from './components/Cards/Cards';
import { Form } from './components/Form/Form';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <Header />
      <Hero />
      <Cards />
      <Form />
    </div>
  </QueryClientProvider>
  );
}

export default App;
