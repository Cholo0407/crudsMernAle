export default function EmployeeCard({ employee, onEdit, onDelete }) {
  return (
    <div className="employee-card flex flex-col">
      <h3>
        {employee.name} {employee.lastName}
      </h3>
      <p>Email: {employee.email}</p>
      <p>Dirección: {employee.addres}</p>
      <p>Teléfono: {employee.telephone}</p>
      <p>DUI: {employee.dui}</p>
      <p>ISS: {employee.issnumber}</p>
      <p>Fecha de contratación: {employee.hireDate ? employee.hireDate.substring(0, 10) : "N/A"}</p>
      <p>Verificado: {employee.isVerified ? "Sí" : "No"}</p>
      <div>
        <button onClick={() => onEdit(employee)}>Editar</button>
        <button onClick={() => onDelete(employee._id)}>Eliminar</button>
      </div>
    </div>
  );
}
