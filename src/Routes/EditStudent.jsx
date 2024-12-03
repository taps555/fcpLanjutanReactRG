import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Input } from "@chakra-ui/react";

// Faculty mapping object to map program study to the corresponding faculty
const FacultyMapping = {
  Ekonomi: "Fakultas Ekonomi",
  Manajemen: "Fakultas Ekonomi",
  Akuntansi: "Fakultas Ekonomi",
  "Administrasi Publik": "Fakultas Ilmu Sosial dan Politik",
  "Administrasi Bisnis": "Fakultas Ilmu Sosial dan Politik",
  "Hubungan Internasional": "Fakultas Ilmu Sosial dan Politik",
  "Teknik Sipil": "Fakultas Teknik",
  Arsitektur: "Fakultas Teknik",
  Matematika: "Fakultas Sains dan Teknologi",
  Fisika: "Fakultas Sains dan Teknologi",
  Informatika: "Fakultas Sains dan Teknologi",
};

const EditStudent = () => {
  const apiFetch = "http://localhost:3001/student";
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState({
    fullname: "",
    address: "",
    phoneNumber: "+62",
    birthDate: "",
    profilePicture: "",
    gender: "Male",
    programStudy: "Ekonomi",
    faculty: "",
  });

  useEffect(() => {
    const fetchStudentEdit = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiFetch}/${id}`);
        const result = await response.json();
        setStudents(result);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentEdit();
  }, [id, apiFetch]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudents((prev) => {
      switch (id) {
        case "input-name":
          return { ...prev, fullname: value };
        case "input-profilePicture":
          return { ...prev, profilePicture: value };
        case "input-address":
          return { ...prev, address: value };
        case "input-date":
          return { ...prev, birthDate: value };
        case "input-gender":
          return { ...prev, gender: value };
        case "input-phoneNumber":
          const sanitizedPhone = value.replace(/[^0-9]/g, "");
          return { ...prev, phoneNumber: `+${sanitizedPhone}` };
        case "input-prody":
          return {
            ...prev,
            programStudy: value,
            faculty: FacultyMapping[value] || "",
          };
        default:
          return prev;
      }
    });
  };

  const handleEditStudents = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${apiFetch}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(students),
      });
      navigate("/student");
    } catch (err) {
      console.error("Error updating student data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <form onSubmit={handleEditStudents} data-testid="edit-form">
          <img src={students.profilePicture} alt={students.fullname} />
          <label htmlFor="input-name">Fullname</label>
          <Input
            required
            data-testid="name"
            type="text"
            id="input-name"
            value={students.fullname}
            onChange={handleInputChange}
          />

          <label htmlFor="input-address">Address</label>
          <input
            required
            data-testid="address"
            type="text"
            id="input-address"
            value={students.address}
            onChange={handleInputChange}
          />

          <label htmlFor="input-phoneNumber">Phone Number</label>
          <input
            required
            data-testid="phoneNumber"
            type="text"
            id="input-phoneNumber"
            maxLength={14}
            value={students.phoneNumber}
            onChange={handleInputChange}
          />

          <label htmlFor="input-date">Birth Date</label>
          <input
            required
            id="input-date"
            type="date"
            data-testid="date"
            value={students.birthDate}
            onChange={handleInputChange}
          />

          <label htmlFor="input-gender">Gender</label>
          <select
            id="input-gender"
            data-testid="gender"
            value={students.gender}
            onChange={handleInputChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label htmlFor="input-prody">Program Study</label>
          <select
            id="input-prody"
            data-testid="prody"
            value={students.programStudy}
            onChange={handleInputChange}
          >
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">
              Hubungan Internasional
            </option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>

          <Button type="submit" data-testid="edit-btn">
            Update Student
          </Button>
        </form>
      )}
      <Footer />
    </div>
  );
};

export default EditStudent;
