import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '@radix-ui/react-toast';
import { Toaster } from './components/ui/toaster';
import { Toaster as Sonner } from 'sonner';

import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BuilderCollaboration from './components/BuilderCollaboration';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Hero />
                                <About />
                                <Services />
                                <BuilderCollaboration />
                                <ContactForm />
                                <Footer />
                            </>
                        } />
                    </Routes>
                </BrowserRouter>
            </ToastProvider>
        </QueryClientProvider>
    );
};

export default App;