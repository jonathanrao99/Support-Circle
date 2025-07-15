import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const Hero = lazy(() => import('./components/Hero'));
const Addiction = lazy(() => import('./components/Addiction'));
const Drug = lazy(() => import('./components/Drug'));
const Confirmation = lazy(() => import('./components/Confirmation'));
const AITherapist = lazy(() => import('./components/AITherapist'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="App min-h-screen gradient-bg">
          <ErrorBoundary>
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/addiction" element={<Addiction />} />
                  <Route path="/drug" element={<Drug />} />
                  <Route path="/confirmation" element={<Confirmation />} />
                  <Route path="/ai-therapist" element={<AITherapist />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </ErrorBoundary>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </div>
      </Router>
    </HelmetProvider>
  );
}

// 404 Not Found component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a href="/" className="btn-primary">
        Go Home
      </a>
    </div>
  </div>
);

export default App;

