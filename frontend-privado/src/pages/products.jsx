import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/products.css";
import ProductsList from "../components/ProducstList.jsx";

export default function ProductsForm() {
  const navigate = useNavigate();

  const initialProduct = {
    _id: null,
    name: "",
    description: "",
    stock: "",
    price: "",
  };

  const [form, setForm] = useState(initialProduct);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ visible: false, id: null });
  const [isLoading, setIsLoading] = useState(false);

  const API_PRODUCTS = "http://localhost:4000/api/products";

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(API_PRODUCTS);
      if (!res.ok) throw new Error("Error al cargar productos");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      setMessage("Error al cargar productos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || form.price === "" || form.stock === "") {
      setMessage("Por favor completa los campos obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const url = form._id ? `${API_PRODUCTS}/${form._id}` : API_PRODUCTS;
      const method = form._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) throw new Error("Error en la petición");

      const result = await res.json();
      setMessage(form._id ? "Producto actualizado." : "Producto registrado.");
      setForm(initialProduct);
      loadProducts();
    } catch (err) {
      setMessage("Error al guardar el producto.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    setForm({
      _id: item._id,
      name: item.name,
      description: item.description || "",
      price: item.price.toString(),
      stock: item.stock.toString(),
    });
    setMessage(null);
  };

  const confirmDeletion = (id) => {
    setConfirmDelete({ visible: true, id });
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_PRODUCTS}/${confirmDelete.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar producto");

      setMessage("Producto eliminado.");
      setConfirmDelete({ visible: false, id: null });
      loadProducts();
    } catch (err) {
      setMessage("Error al eliminar producto.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Botones de navegación arriba */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "30px" }}>
        <button type="submit" onClick={() => navigate("/manage-suppliers")}>
          Proveedores
        </button>

        <button type="submit" onClick={() => navigate("/manage-employees")}>
          Empleados
        </button>
      </div>

      <h2>{form._id ? "Editar Producto" : "Registrar Producto"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Grid de 2 columnas para los campos del formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label>Nombre del producto</label>
            <input
              type="text"
              name="name"
              placeholder="Ej: Shampoo Natural"
              value={form.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Descripción</label>
            <input
              type="text"
              name="description"
              placeholder="Ej: Producto para el cuidado del cabello"
              value={form.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Cantidad en stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Ej: 100"
              value={form.stock}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label>Precio</label>
            <input
              type="number"
              name="price"
              placeholder="Ej: 12.50"
              value={form.price}
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
                setForm(initialProduct);
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

      <h2>Lista de Productos</h2>
      <ProductsList items={items} onEdit={handleEdit} onDelete={confirmDeletion} />

      {confirmDelete.visible && (
        <div className="confirm-dialog">
          <p>¿Estás seguro que deseas eliminar este producto?</p>
          <button onClick={handleDelete}>Sí</button>
          <button onClick={() => setConfirmDelete({ visible: false, id: null })}>No</button>
        </div>
      )}
    </div>
  );
}