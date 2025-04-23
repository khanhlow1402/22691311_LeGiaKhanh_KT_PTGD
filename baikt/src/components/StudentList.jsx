import React, { useState, useEffect } from "react";
import StudentItem from "./StudentItem"; // Import component StudentItem

export default function StudentList() {
  const loadStudentsFromLocalStorage = () => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  };

  const [students, setStudents] = useState(loadStudentsFromLocalStorage());
  const [newStudent, setNewStudent] = useState({ name: "", class: "", age: "" });
  const [selectedClass, setSelectedClass] = useState(""); // Trạng thái cho lớp đã chọn
  const [editingId, setEditingId] = useState(null);
  const [editedStudent, setEditedStudent] = useState({ name: "", class: "", age: "" });

  const saveStudentsToLocalStorage = (students) => {
    localStorage.setItem("students", JSON.stringify(students));
  };

  useEffect(() => {
    saveStudentsToLocalStorage(students);
  }, [students]);

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

  const filteredStudents = selectedClass
    ? students.filter((sv) => sv.class === selectedClass)
    : students;

  return (
    <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Danh sách sinh viên</h1>

      {/* Form thêm sinh viên */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="flex items-center space-x-3 w-72">
          <i className="fas fa-user text-blue-500"></i>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={handleChange}
            placeholder="Họ tên"
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200 hover:border-blue-400 focus:border-blue-600 shadow-md"
          />
        </div>
        <div className="flex items-center space-x-3 w-72">
          <i className="fas fa-school text-blue-500"></i>
          <input
            type="text"
            name="class"
            value={newStudent.class}
            onChange={handleChange}
            placeholder="Lớp"
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200 hover:border-blue-400 focus:border-blue-600 shadow-md"
          />
        </div>
        <div className="flex items-center space-x-3 w-72">
          <i className="fas fa-calendar-alt text-blue-500"></i>
          <input
            type="number"
            name="age"
            value={newStudent.age}
            onChange={handleChange}
            placeholder="Tuổi"
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200 hover:border-blue-400 focus:border-blue-600 shadow-md"
          />
        </div>
        <button
          onClick={handleAdd}
          className="w-72 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
        >
          <i className="fas fa-plus"></i>
          <span>Thêm Sinh Viên</span>
        </button>
      </div>

      {/* Dropdown lọc theo lớp */}
      <div className="flex justify-center mb-8">
        <select
          className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 w-72 shadow-md"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Tất cả lớp</option>
          <option value="DHKTPM18ATT">DHKTPM18ATT</option>
          <option value="DHKTPM18BTT">DHKTPM18BTT</option>
          <option value="DHKTPM1CTT">DHKTPM1CTT</option>
        </select>
      </div>

      {/* Danh sách sinh viên */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="px-6 py-3 border-b text-lg">Họ tên</th>
              <th className="px-6 py-3 border-b text-lg">Lớp</th>
              <th className="px-6 py-3 border-b text-lg">Tuổi</th>
              <th className="px-6 py-3 border-b text-lg">Hành động</th>
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
