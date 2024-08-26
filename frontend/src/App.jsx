import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route />
      </Routes>
    </Router>
  );
}

export default App;
