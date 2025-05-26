import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/products.css";
import EmployeeList from "../components/employees/employeeList.jsx";

export default function EmployeesForm() {
  const navigate = useNavigate();

  const initialEmployee = {
    _id: null,
    name: "",
    lastName: "",
    birthday: "",
    email: "",
    addres: "",
    password: "",
    hireDate: "",
    telephone: "",
    dui: "",
    isVerified: false,
    issnumber: "",
  };

  const [form, setForm] = useState(initialEmployee);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, id: null });
  const [isLoading, setIsLoading] = useState(false);

  // Endpoints separados para POST y para GET, PUT, DELETE
  const API_EMPLOYEES = "http://localhost:4000/api/employee";            // GET, PUT, DELETE
  const API_REGISTER = "http://localhost:4000/api/registerEmployees";    // POST (registro con encriptación)

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_EMPLOYEES);
      if (!res.ok) throw new Error("Error al cargar empleados");
      const data = await res.json();
      setItems(data);
    } catch {
      setMessage("Error al cargar empleados");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    if (!form.name || !form.lastName || !form.email || !form.password) {
      setMessage("Completa los campos obligatorios");
      return false;
    }
    if (form.password.length < 8) {
      setMessage("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
    if (form.dui.length < 9) {
      setMessage("El DUI debe tener al menos 9 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Para POST usar ruta especial, para PUT usar la estándar
      const url = form._id ? `${API_EMPLOYEES}/${form._id}` : API_REGISTER;
      const method = form._id ? "PUT" : "POST";

      // isVerified siempre false al crear/actualizar desde aquí
      const payload = {
        ...form,
        isVerified: false,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error en la petición");

      setMessage(form._id ? "Empleado actualizado." : "Empleado registrado.");
      setForm(initialEmployee);
      loadEmployees();
    } catch {
      setMessage("Error al guardar el empleado.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      _id: item._id,
      name: item.name || "",
      lastName: item.lastName || "",
      birthday: item.birthday ? item.birthday.substring(0, 10) : "",
      email: item.email || "",
      addres: item.addres || "",
      password: "", // No mostrar la contraseña
      hireDate: item.hireDate ? item.hireDate.substring(0, 10) : "",
      telephone: item.telephone || "",
      dui: item.dui || "",
      isVerified: item.isVerified || false,
      issnumber: item.issnumber || "",
    });
    setMessage(null);
  };

  const confirmDeletion = (id) => {
    setConfirmDelete({ visible: true, id });
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_EMPLOYEES}/${confirmDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar empleado");

      setMessage("Empleado eliminado.");
      setConfirmDelete({ visible: false, id: null });
      loadEmployees();
    } catch {
      setMessage("Error al eliminar empleado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Navegación */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
        <button type="submit" onClick={() => navigate("/manage-suppliers")}>
          Proveedores
        </button>
        <button type="submit" onClick={() => navigate("/")}>
          Productos
        </button>
      </div>

      <h2>{form._id ? "Editar Empleado" : "Registrar Empleado"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Grid de 2 columnas para los campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Ej: Juan Carlos"
              value={form.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Apellido</label>
            <input
              type="text"
              name="lastName"
              placeholder="Ej: Pérez García"
              value={form.lastName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Fecha de Nacimiento</label>
            <input
              type="date"
              name="birthday"
              placeholder="Ej: 1990-05-15"
              value={form.birthday}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="Ej: juan.perez@empresa.com"
              value={form.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Dirección</label>
            <input
              type="text"
              name="addres"
              placeholder="Ej: Calle Principal #123, San Salvador"
              value={form.addres}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="Ej: MiContraseña123!"
              value={form.password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Fecha de Contratación</label>
            <input
              type="date"
              name="hireDate"
              placeholder="Ej: 2024-01-15"
              value={form.hireDate}
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

          <div className="flex flex-col">
            <label>DUI</label>
            <input
              type="text"
              name="dui"
              placeholder="Ej: 12345678-9"
              value={form.dui}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Número ISS</label>
            <input
              type="text"
              name="issnumber"
              placeholder="Ej: 123456789012"
              value={form.issnumber}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
<br />
        <div style={{ display: "flex", gap: "10px", justifyContent: "center"}}>
          <button type="submit">{form._id ? "Actualizar" : "Guardar"}</button>
          {form._id && (
            <button
              type="button"
              onClick={() => {
                setForm(initialEmployee);
                setMessage(null);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {message && <p className="message">{message}</p>}
      {isLoading && <p>Cargando...</p>}

      <h2>Lista de Empleados</h2>
      <EmployeeList items={items} onEdit={handleEdit} onDelete={confirmDeletion} />

      {confirmDelete.visible && (
        <div className="confirm-dialog">
          <p>¿Estás seguro que deseas eliminar este empleado?</p>
          <button onClick={handleDelete}>Sí</button>
          <button onClick={() => setConfirmDelete({ visible: false, id: null })}>No</button>
        </div>
      )}
    </div>
  );
}