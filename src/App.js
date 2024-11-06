import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProdutorRuralPage from './pages/ProdutorRural';
import MenuLateral from './component/MenuLateral';  

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Atualiza o estado sempre que houver mudança no token
  }, []);

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {isAuthenticated && <MenuLateral />} {/* Exibe o menu se o usuário estiver logado */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/produtores-rurais" element={<ProdutorRuralPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;