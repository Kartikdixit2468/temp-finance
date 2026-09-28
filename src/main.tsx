import {lazy, StrictMode, Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const AdminPage = lazy(() => import('./pages/AdminPage.tsx'));
const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
const rootContent = normalizedPath === '/admin'
  ? (
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <AdminPage />
      </Suspense>
    )
  : <App />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {rootContent}
  </StrictMode>,
);
