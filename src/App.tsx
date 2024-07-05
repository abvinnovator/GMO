import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import SecondPage from './components/SecondPage';
import ProtectedRoute from './ProtectedRoute';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/second" element={<SecondPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;