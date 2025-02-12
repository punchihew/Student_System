import { useEffect, useState } from "react";



type Student = {
  id: string;
  name: string;
  age: string;
  grade: string;
};

type StudentFormProps = {
  onSaveStudent: (student: Student) => void;
  editingStudent: Student | null;
  onClose: () => void; // Add this prop
};

const StudentForm = ({
  onSaveStudent,
  editingStudent,
  onClose,
}: StudentFormProps) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");

  // Populate form fields when editing a student
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setAge(editingStudent.age);
      setGrade(editingStudent.grade);
    } else {
      setName("");
      setAge("");
      setGrade("");
    }
  }, [editingStudent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: editingStudent ? editingStudent.id : Date.now().toString(),
      name,
      age,
      grade,
    };
    onSaveStudent(student);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Grade</label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {editingStudent ? "Update Student" : "Add Student"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
