import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  const ProtectedRoute = ({ children }) => {
    const { token } = useSelector(state => state.auth);
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

  export default App;