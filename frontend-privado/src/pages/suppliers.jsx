import { useState, useEffect } from "react";
import "../css/products.css";
import { useNavigate } from "react-router-dom";
import SuppliersList from "../components/suppliers/SupplierList.jsx";

export default function SuppliersForm() {
  const navigate = useNavigate();

  const initialSupplier = {
    name: "",
    telephone: "",
    image: "",
  };

  const [form, setForm] = useState(initialSupplier);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, id: null });
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const API_SUPPLIERS = "http://localhost:4000/api/providers";

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_SUPPLIERS);
      if (!res.ok) throw new Error("Error al cargar proveedores");
      const data = await res.json();
      setItems(data);
    } catch {
      setMessage("Error al cargar proveedores");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.telephone) {
      setMessage("Por favor completa los campos obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("telephone", form.telephone);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(API_SUPPLIERS, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error en la petición");

      setMessage("Proveedor registrado.");
      setForm(initialSupplier);
      setImageFile(null);
      loadSuppliers();
    } catch {
      setMessage("Error al guardar el proveedor.");
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDeletion = (id) => {
    setConfirmDelete({ visible: true, id });
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_SUPPLIERS}/${confirmDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar proveedor");

      setMessage("Proveedor eliminado.");
      setConfirmDelete({ visible: false, id: null });
      loadSuppliers();
    } catch {
      setMessage("Error al eliminar proveedor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
        <button type="submit" onClick={() => navigate("/")}>
          Productos
        </button>

        <button type="submit" onClick={() => navigate("/manage-employees")}>
          Empleados
        </button>
      </div>

      <h2>Registrar Proveedor</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Grid de 2 columnas para los campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Nombre del Proveedor</label>
            <input
              type="text"
              name="name"
              placeholder="Ej: Distribuidora Central S.A."
              value={form.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Teléfono</label>
            <input
              type="text"
              name="telephone"
              placeholder="Ej: 2234-5678"
              value={form.telephone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label>Imagen del Proveedor</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <small className="text-gray-500 mt-1">Formatos permitidos: PNG, JPEG, JPG</small>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button type="submit">Guardar</button>
        </div>
      </form>

      {message && <p className="message">{message}</p>}
      {isLoading && <p>Cargando...</p>}

      <h2>Lista de Proveedores</h2>
      <SuppliersList items={items} onDelete={confirmDeletion} />

      {confirmDelete.visible && (
        <div className="confirm-dialog">
          <p>¿Estás seguro que deseas eliminar este proveedor?</p>
          <button onClick={handleDelete}>Sí</button>
          <button onClick={() => setConfirmDelete({ visible: false, id: null })}>No</button>
        </div>
      )}
    </div>
  );
}