import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDisclosure } from '@mantine/hooks';
import { ProtectedRoute } from './components/ProtectedRoute';
import Auth from './components/Auth';
import Home from './components/Home';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App
