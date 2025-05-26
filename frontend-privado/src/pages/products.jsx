import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // para navegación programática
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
          name="description"
          placeholder="Descripción"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={form.price}
          onChange={handleChange}
        />
        <button type="submit">{form._id ? "Actualizar" : "Guardar"}</button>

        {form._id && (
          <button
            type="button"
            onClick={() => {
              setForm(initialProduct);
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
