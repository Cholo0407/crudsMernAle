export default function ProductCard({ item, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Stock: {item.stock}</p>
      <p>Precio: ${item.price}</p>
      <button onClick={() => onEdit(item)}>Editar</button>
      <button onClick={() => onDelete(item._id)}>Eliminar</button>
    </div>
  );
}
