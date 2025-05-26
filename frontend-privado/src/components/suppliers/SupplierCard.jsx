export default function SupplierCard({ supplier, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <img
        src={supplier.image}
        alt={supplier.name}
        className="supplier-img"
      />
      <div className="supplier-info">
        <h3>{supplier.name}</h3>
        <p>📞 {supplier.telephone}</p>
      </div>
      <div className="supplier-actions">
        <button onClick={() => onDelete(supplier._id)} className="btn-delete">
          Eliminar
        </button>
      </div>
    </div>
  );
}
