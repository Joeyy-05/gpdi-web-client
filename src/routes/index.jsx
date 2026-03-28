import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/jemaatpublik/HomePage";
import JadwalIbadahPage from "./pages/jemaatAktif/JadwalIbadahPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<HomePage />} />
      <Route path="/jadwal-ibadah" element={<JadwalIbadahPage />} />

      {/* PROTECTED */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;