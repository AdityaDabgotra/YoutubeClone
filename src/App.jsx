import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Video from './pages/Video/Video';
import Search from './pages/Search/Search';

const queryClient = new QueryClient();

const ErrorFallback = ({ error }) => (
  <div role="alert">
    <h2>Oops! Something went wrong:</h2>
    <pre>{error.message}</pre>
  </div>
);

const App = () => {
  const [sidebar, setSidebar] = React.useState(true);
  const [search, setSearch] = React.useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Navbar setSidebar={setSidebar} search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />} />
          <Route path="/video/:categoryId/:videoId" element={<Video />} />
          <Route path="/search" element={<Search search={search} />} />
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;