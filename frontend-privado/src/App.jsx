import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from "./pages/products.jsx";
import Suppliers from "./pages/suppliers.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/manage-suppliers" element={<Suppliers />} />
        {/* Puedes agregar más rutas aquí si luego incluyes empleados, proveedores, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
