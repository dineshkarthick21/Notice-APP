import { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setCurrentPage(JSON.parse(storedUser).role === 'admin' ? 'admin' : 'dashboard');
    }
  }, []);

  const handleLogin = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentPage(userData.role === 'admin' ? 'admin' : 'dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentPage('login');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {!token ? (
        <>
          {currentPage === 'login' && (
            <Login 
              onLogin={handleLogin}
              onSwitchPage={() => setCurrentPage('signup')}
            />
          )}
          {currentPage === 'signup' && (
            <Signup
              onSignup={handleLogin}
              onSwitchPage={() => setCurrentPage('login')}
            />
          )}
        </>
      ) : (
        <>
          {user?.role === 'admin' ? (
            <AdminPanel user={user} token={token} onLogout={handleLogout} />
          ) : (
            <Dashboard user={user} token={token} onLogout={handleLogout} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
