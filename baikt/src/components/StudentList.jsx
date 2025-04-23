// StudentList.jsx
import React, { useState } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([
    { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 17 },
    { id: 2, name: "Trần Thị B", class: "11B2", age: 16 },
  ]);

  const [newStudent, setNewStudent] = useState({
    name: "",
    class: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAdd = () => {
    if (newStudent.name && newStudent.class && newStudent.age) {
      const newId = Date.now(); // tạo ID đơn giản
      const student = { ...newStudent, id: newId, age: parseInt(newStudent.age) };
      setStudents([...students, student]);
      setNewStudent({ name: "", class: "", age: "" });
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handleChange}
          placeholder="Họ tên"
          className="border px-4 py-2 rounded w-full md:w-1/4"
        />
        <input
          type="text"
          name="class"
          value={newStudent.class}
          onChange={handleChange}
          placeholder="Lớp"
          className="border px-4 py-2 rounded w-full md:w-1/4"
        />
        <input
          type="number"
          name="age"
          value={newStudent.age}
          onChange={handleChange}
          placeholder="Tuổi"
          className="border px-4 py-2 rounded w-full md:w-1/4"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Thêm SV
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse">
          <thead>
            <tr className="bg-blue-100 text-blue-700">
              <th className="px-4 py-2 border-b-2">👤 Tên</th>
              <th className="px-4 py-2 border-b-2">🏫 Lớp</th>
              <th className="px-4 py-2 border-b-2">🎂 Tuổi</th>
              <th className="px-4 py-2 border-b-2">🛠 Hành động</th>
            </tr>
          </thead>
          <tbody>
            {students.map((sv, idx) => (
              <tr
                key={sv.id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"}
              >
                <td className="px-4 py-3 border-b">{sv.name}</td>
                <td className="px-4 py-3 border-b">{sv.class}</td>
                <td className="px-4 py-3 border-b">{sv.age}</td>
                <td className="px-4 py-3 border-b">
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition">
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
