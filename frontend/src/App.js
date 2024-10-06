import "./app.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./appComponents/Login";
import MainPage from "./appComponents/MainPage";
import Register from "./appComponents/Register";

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/main" element={<MainPage />} />

              {/* Defalut path is login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
