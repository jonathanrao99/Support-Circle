import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Lazy load components for better performance
const Navbar = lazy(() => import('./components/Navbar'));
const Hero = lazy(() => import('./components/Hero'));
const Footer = lazy(() => import('./components/Footer'));
const Addiction = lazy(() => import('./components/Addiction'));
const Drug = lazy(() => import('./components/Drug'));
const Confirmation = lazy(() => import('./components/Confirmation'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Community = lazy(() => import('./components/Community'));
const Resources = lazy(() => import('./components/Resources'));
const Profile = lazy(() => import('./components/Profile'));
const LoadingSpinner = lazy(() => import('./components/LoadingSpinner'));

// Enhanced loading component with better UX
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <p>Loading amazing content...</p>
  </div>
);

// Route-based code splitting with preloading
const preloadComponent = (importFunc) => {
  const Component = lazy(importFunc);
  Component.preload = importFunc;
  return Component;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>Support Circle - Mental Health & Recovery Community</title>
          <meta name="description" content="Join our supportive community for addiction recovery, mental health support, and personal growth. Access therapy sessions, resources, and connect with others on similar journeys." />
          <meta name="keywords" content="addiction recovery, mental health, therapy, support group, community, wellness" />
          <meta property="og:title" content="Support Circle - Mental Health & Recovery Community" />
          <meta property="og:description" content="Join our supportive community for addiction recovery, mental health support, and personal growth." />
          <meta property="og:type" content="website" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        </Helmet>
        
        <Suspense fallback={<PageLoader />}>
          <Navbar />
        </Suspense>
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route 
              path="/" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Hero />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/addiction" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Addiction />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/drug" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Drug />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/confirmation" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    exit={{ opacity: 0, rotateY: -90 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Confirmation />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Dashboard />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/community" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Community />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/resources" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Resources />
                  </motion.div>
                </Suspense>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <Suspense fallback={<PageLoader />}>
                  <motion.div
                    initial={{ opacity: 0, rotateX: 90 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: -90 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Profile />
                  </motion.div>
                </Suspense>
              } 
            />
          </Routes>
        </AnimatePresence>
        
        <Suspense fallback={<PageLoader />}>
          <Footer />
        </Suspense>
      </div>
    </Router>

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

