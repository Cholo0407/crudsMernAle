import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/products.css";
import EmployeeList from "../components/employees/EmployeeList.jsx";

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

  const API_EMPLOYEES = "http://localhost:4000/api/employees";

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

      const url = form._id ? `${API_EMPLOYEES}/${form._id}` : API_EMPLOYEES;
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
        <button type="button" onClick={() => navigate("/manage-suppliers")}>
          Proveedores
        </button>
        <button type="button" onClick={() => navigate("/manage-employees")}>
          Empleados
        </button>
      </div>

      <h2>{form._id ? "Editar Empleado" : "Registrar Empleado"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Apellido" value={form.lastName} onChange={handleChange} />
        <input type="date" name="birthday" placeholder="Fecha de nacimiento" value={form.birthday} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="text" name="addres" placeholder="Dirección" value={form.addres} onChange={handleChange} />
        <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <input type="date" name="hireDate" placeholder="Fecha de contratación" value={form.hireDate} onChange={handleChange} />
        <input type="text" name="telephone" placeholder="Teléfono" value={form.telephone} onChange={handleChange} />
        <input type="text" name="dui" placeholder="DUI" value={form.dui} onChange={handleChange} />
        <input type="text" name="issnumber" placeholder="Número ISS" value={form.issnumber} onChange={handleChange} />

        <button type="submit">{form._id ? "Actualizar" : "Guardar"}</button>
        {form._id && (
          <button
            type="button"
            onClick={() => {
              setForm(initialEmployee);
              setMessage(null);
            }}
            style={{ marginLeft: "10px" }}
          >
            Cancelar
          </button>
        )}
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
