import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({ items, onEdit, onDelete }) {
  return (
    <div className="list-container">
      {items.map((item) => (
        <EmployeeCard key={item._id} employee={item} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}
