import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (u) => setUser(u);
  const handleLogout = () => setUser(null);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-50 to-white">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="flex-1">
        {!user ? (
          <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
            <Login onLogin={handleLogin} />
          </div>
        ) : (
          <Dashboard user={user} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
