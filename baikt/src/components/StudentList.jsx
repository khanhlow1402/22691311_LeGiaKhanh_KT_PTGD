import React, { useState, useEffect } from "react";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", class: "", age: "" });
  const [selectedClass, setSelectedClass] = useState(""); // Trạng thái cho lớp đã chọn

  // Hàm để lưu dữ liệu vào localStorage
  const saveToLocalStorage = (students) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  // Hàm lấy dữ liệu từ localStorage
  const loadFromLocalStorage = () => {
    const storedStudents = localStorage.getItem("students");
    return storedStudents ? JSON.parse(storedStudents) : [];
  };

  // Load danh sách sinh viên khi component được mount
  useEffect(() => {
    setStudents(loadFromLocalStorage());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleAdd = () => {
    if (newStudent.name && newStudent.class && newStudent.age) {
      const newId = Date.now();
      const student = { ...newStudent, id: newId, age: parseInt(newStudent.age) };
      const updatedStudents = [...students, student];
      setStudents(updatedStudents);
      saveToLocalStorage(updatedStudents); // Lưu vào localStorage
      setNewStudent({ name: "", class: "", age: "" });
    } else {
      alert("Vui lòng nhập đầy đủ thông tin!");
    }
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xoá sinh viên này?");
    if (confirmed) {
      const updatedStudents = students.filter((sv) => sv.id !== id);
      setStudents(updatedStudents);
      saveToLocalStorage(updatedStudents); // Lưu vào localStorage
    }
  };

  const handleEdit = (sv) => {
    setEditingId(sv.id);
    setEditedStudent({ name: sv.name, class: sv.class, age: sv.age });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handleSave = (id) => {
    const updated = students.map((sv) =>
      sv.id === id ? { ...sv, ...editedStudent, age: parseInt(editedStudent.age) } : sv
    );
    setStudents(updated);
    saveToLocalStorage(updated); // Lưu vào localStorage
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  // Hàm lọc sinh viên theo lớp
  const filteredStudents = selectedClass
    ? students.filter((sv) => sv.class === selectedClass)
    : students;

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

      {/* Dropdown để lọc theo lớp */}
      <div className="flex mb-6">
        <select
          className="border px-4 py-2 rounded w-full md:w-1/4"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Chọn lớp</option>
          <option value="DHKTPM18ATT">DHKTPM18ATT</option>
          <option value="DHKTPM18BTT">DHKTPM18BTT</option>
          <option value="DHKTPM1CTT">DHKTPM1CTT</option>
        </select>
      </div>

      {/* Bảng danh sách sinh viên */}
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
            {filteredStudents.map((sv, idx) => (
              <tr
                key={sv.id}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"}
              >
                {editingId === sv.id ? (
                  <>
                    <td className="px-4 py-3 border-b">
                      <input
                        name="name"
                        value={editedStudent.name}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        name="class"
                        value={editedStudent.class}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-3 border-b">
                      <input
                        name="age"
                        type="number"
                        value={editedStudent.age}
                        onChange={handleEditChange}
                        className="border px-2 py-1 rounded w-full"
                      />
                    </td>
                    <td className="px-4 py-3 border-b space-x-2">
                      <button
                        onClick={() => handleSave(sv.id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Lưu
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      >
                        Huỷ
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 border-b">{sv.name}</td>
                    <td className="px-4 py-3 border-b">{sv.class}</td>
                    <td className="px-4 py-3 border-b">{sv.age}</td>
                    <td className="px-4 py-3 border-b space-x-2">
                      <button
                        onClick={() => handleEdit(sv)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(sv.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Xoá
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
