import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ items, onEdit, onDelete }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <EmployeeCard key={item._id} employee={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
