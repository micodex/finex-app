import { Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route path="/dashboard" />
        <Route path="/transactions" />
        <Route path="/categories" />
        <Route path="/reports" />
        <Route path="/settings" />
      </Route>
    </Routes>
  );
}

export default App;
