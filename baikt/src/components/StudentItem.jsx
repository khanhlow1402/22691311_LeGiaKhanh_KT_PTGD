import React from "react";

export default function StudentItem({
  student,
  editingId,
  handleEdit,
  handleDelete,
  handleSave,
  handleCancel,
  editedStudent,
  handleEditChange
}) {
  return (
    <tr className={student.id % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-gray-100"}>
      {editingId === student.id ? (
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
              onClick={() => handleSave(student.id)}
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
          <td className="px-4 py-3 border-b">{student.name}</td>
          <td className="px-4 py-3 border-b">{student.class}</td>
          <td className="px-4 py-3 border-b">{student.age}</td>
          <td className="px-4 py-3 border-b space-x-2">
            <button
              onClick={() => handleEdit(student)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Sửa
            </button>
            <button
              onClick={() => handleDelete(student.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Xoá
            </button>
          </td>
        </>
      )}
    </tr>
  );
}
