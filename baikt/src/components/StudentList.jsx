// StudentList.jsx
import React from "react";

const students = [
  { id: 1, name: "Nguyễn Văn A", class: "12A1", age: 17 },
  { id: 2, name: "Trần Thị B", class: "11B2", age: 16 },
  { id: 3, name: "Lê Văn C", class: "10C3", age: 15 },
];

export default function StudentList() {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">📋 Danh sách sinh viên</h1>
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
                  <button className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition duration-200">
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
