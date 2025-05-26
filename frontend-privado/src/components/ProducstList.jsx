import ProductCard from "./ProductCard";

export default function ProductsList({ items, onEdit, onDelete }) {
  return (
    <div className="product-list">
      {items.map((item) => (
        <ProductCard
          key={item._id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
