function EmployeeList() {
  const empArray = [
    { id: 1, name: "ayesha", department: "finance", designation: "manager" },
    { id: 2, name: "ayesha", department: "finance", designation: "manager" },
    { id: 3, name: "ayesha", department: "finance", designation: "manager" },
    { id: 4, name: "ayesha", department: "finance", designation: "manager" },
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
            <th>department</th>
            <th>designation</th>
            <th>action</th>
          </tr>
        </thead>

        <tbody>
          {empArray.map((employee) => (
            <tr key={employee.id}>
              <td> {employee.id} </td>
              <td> {employee.name} </td>
              <td> {employee.department} </td>
              <td> {employee.designation} </td>
              <td>
                <div>
                  <button className="btn btn-warning">Update</button>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
