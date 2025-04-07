import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./AuthForm"; // Ahora usa el nuevo componente
import Loader from "./Loader";
import Dashboard from "./Dashboard";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/login" element={<AuthForm />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<AuthForm />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;






