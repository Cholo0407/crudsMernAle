import SupplierCard from "./SupplierCard";

export default function SuppliersList({ items, onEdit, onDelete }) {
  return (
    <div className="supplier-list">
      {items.map((supplier) => (
        <SupplierCard
          key={supplier._id}
          supplier={supplier}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
