import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Select, Table } from "@chakra-ui/react";
import {
  Select,
  Table,
  Button,
  Thead,
  Tbody,
  Box,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

const Student = () => {
  const navigate = useNavigate();
  const apiFetch = "http://localhost:3001/student";
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    setLoading(true);
    const fetchStudent = async () => {
      try {
        const response = await fetch(apiFetch);
        const result = await response.json();
        setStudents(result);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchStudent();
  }, []);

  const handleDeleteStudent = async (id) => {
    setLoading(true);
    try {
      await deleteStudent(id);
      setStudents(students.filter((student) => student.id !== id));
      setLoading(false);
      setError(false);
    } catch (error) {
      console.log(error);
      console.log(`Terjadi kesalahan saat menghapus data student ${id}`);

      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err);
      console.log(`terjadi kesalah ketika menghapus data student ${id}`);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter((student) => student.faculty === filter);

  if (loading)
    return (
      <p>
        Loading ... <Footer />
      </p>
    );
  if (error) return <p>Error ...</p>;

  const handleEditStudent = (id) => {
    navigate(`/student/${id}`);
  };
  return (
    <div>
      <NavBar />
      <Select data-testid="filter" value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">
          Fakultas Ilmu Sosial dan Politik
        </option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">
          Fakultas Teknologi Informasi dan Sains
        </option>
      </Select>
      <div className="test-table-container">
        <Table id="table-student" data-testid="table-student">
          <Thead className="test-thead">
            <Tr>
              <Th>No</Th>
              <Th>Full Name</Th>
              <Th>Faculty</Th>
              <Th>Program Study</Th>
              <Th>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student, index) => (
                <Tr className="student-data-row" key={student.id || index}>
                  <Td>{index + 1}</Td>
                  <Td
                    onClick={() => handleEditStudent(student.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {student.fullname}
                  </Td>
                  <Td>{student.faculty}</Td>
                  <Td>{student.programStudy}</Td>

                  <Button
                    data-testid={`delete-${student.id}`}
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan="5">No students available</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Student;
