import React, { useState, useEffect } from "react";
import StudentItem from "./StudentItem"; // Import component StudentItem

export default function StudentList() {
  // Load dữ liệu từ localStorage khi trang được tải lại
  const loadStudentsFromLocalStorage = () => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  };

  // Khởi tạo state với dữ liệu từ localStorage hoặc mảng rỗng nếu không có dữ liệu
  const [students, setStudents] = useState(loadStudentsFromLocalStorage());

  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", class: "", age: "" });
  const [selectedClass, setSelectedClass] = useState(""); // Trạng thái cho lớp đã chọn

  // Hàm lưu danh sách sinh viên vào localStorage khi có thay đổi
  const saveStudentsToLocalStorage = (students) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  useEffect(() => {
    // Đồng bộ dữ liệu với localStorage mỗi khi danh sách sinh viên thay đổi
    saveStudentsToLocalStorage(students);
  }, [students]); // Mỗi khi state `students` thay đổi, gọi hàm lưu vào localStorage

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
            {filteredStudents.map((sv) => (
              <StudentItem
                key={sv.id}
                student={sv}
                editingId={editingId}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleSave={handleSave}
                handleCancel={handleCancel}
                editedStudent={editedStudent}
                handleEditChange={handleEditChange}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
