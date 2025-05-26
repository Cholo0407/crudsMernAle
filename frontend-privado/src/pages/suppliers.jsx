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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Teléfono"
          value={form.telephone}
          onChange={handleChange}
        />
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageChange}
        />
        <button type="submit">Guardar</button>
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
