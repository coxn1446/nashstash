import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { NativeProvider } from '../utils/NativeContext';
// import { selectIsAuthenticated, selectAuthLoading } from '../store/auth.reducer';
import Loading from './Loading/Loading';

// Lazy load route components
const Home = lazy(() => import('../routes/Home'));
const NotFound = lazy(() => import('../routes/NotFound'));

// Protected Route component (commented out until authentication is implemented)
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useSelector(selectIsAuthenticated);
//   const loading = useSelector(selectAuthLoading);
//
//   if (loading) {
//     return <Loading />;
//   }
//
//   if (!isAuthenticated) {
//     return <Navigate to="/" replace />;
//   }
//
//   return children;
// };

function App() {
  return (
    <NativeProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-center" />
        
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </NativeProvider>
  );
}

export default App;

