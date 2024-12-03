import React from "react";
import NavBar from "../components/Navbar";
import FacultyMaping from "../components/FacultyMaping";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";

const AddStudent = () => {
  const apiFetch = "http://localhost:3001/student";
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fullname, setFullname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+");
  const [profilePicture, setProfilePicture] = useState("");
  const [gender, setGender] = useState("Male");
  const [programStudy, setProgramStudy] = useState("Ekonomi");

  const addStudents = async (studentsResult) => {
    setLoading(true);
    try {
      const response = await fetch(apiFetch, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(studentsResult),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      console.log("terjadi kesalahan saat menambahkan data student fetch");
      setLoading(false);
    }
    students();
  };

  const handleAddStudents = async (studentData) => {
    setLoading(true);
    try {
      const faculty = FacultyMaping[studentData.programStudy];
      const newAddStudents = {
        ...studentData,
        faculty,
      };
      setStudents((prevStudents) => [...prevStudents, newAddStudents]);
      await addStudents(newAddStudents);
      setLoading(false);

      console.log("data sukses di masukan");
      navigate("/student");
    } catch (err) {
      console.log(err);
      console.log("terjadi kesalahan saat menambahkan data student");

      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "input-name":
        setFullname(value);
        break;
      case "input-profilePicture":
        try {
          new URL(value); // This will throw an error if the URL is invalid
          setProfilePicture(value);
        } catch (err) {
          // Optional: You could set some error state here
          setProfilePicture(value); // or don't set it if you want strict validation
        }
        // setProfilePicture(value);
        break;
      case "input-address":
        setAddress(value);
        break;
      case "input-date":
        setBirthDate(value);
        break;
      case "input-gender":
        setGender(value);
        break;
      case "input-phoneNumber":
        const sanitizedPhone = value.replace(/[^0-9]/g, "");
        setPhoneNumber(`+${sanitizedPhone}`);
        break;
      case "input-prody":
        setProgramStudy(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitData = (e) => {
    e.preventDefault();
    handleAddStudents({
      fullname,
      address,
      phoneNumber,
      birthDate,
      profilePicture,
      gender,
      programStudy,
    });
    setFullname("");
    setBirthDate("");
    setAddress("");
    setPhoneNumber("");
    setProfilePicture("");
    setGender("Male");
    setProgramStudy("Ekonomi");
  };

  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <NavBar />
      <br />
      <form id="form-student" data-testid="form" onSubmit={handleSubmitData}>
        <label htmlFor="input-name">Fullname</label>
        <Input
          required
          data-testid="name"
          type="text"
          id="input-name"
          value={fullname}
          onChange={handleInputChange}
        ></Input>
        <br />
        <label htmlor="profilePicture">Profile Picture</label>
        <input
          required
          data-testid="profilePicture"
          type="text"
          id="input-profilePicture"
          onChange={handleInputChange}
        />
        <br />
        <label htmlfor="address">Address</label>
        <input
          required
          data-testid="address"
          type="text"
          id="input-address"
          value={address}
          onChange={handleInputChange}
        />
        <br />
        <label htmlfor="phoneNumber">Phone Number</label>
        <input
          required
          data-testid="phoneNumber"
          type="text"
          id="input-phoneNumber"
          maxLength={14}
          value={phoneNumber}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="input-date">Birth Date</label>
        <input
          required
          id="input-date"
          type="date"
          data-testid="date"
          value={birthDate}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="input-gender">Gender</label>
        <select
          id="input-gender"
          data-testid="gender"
          value={gender}
          onChange={handleInputChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br />
        <label htmlFor="input-prody">Program Study</label>
        <select
          id="input-prody"
          data-testid="prody"
          value={programStudy}
          onChange={handleInputChange}
        >
          <option value="Ekonomi">Ekonomi</option>
          <option value="Manajemen">Manajemen</option>
          <option value="Akuntansi">Akuntansi</option>
          <option value="Administrasi Publik">Administrasi Publik</option>
          <option value="Administrasi Bisnis">Administrasi Bisnis</option>
          <option value="Hubungan Internasional">Hubungan Internasional</option>
          <option value="Teknik Sipil">Teknik Sipil</option>
          <option value="Arsitektur">Arsitektur</option>
          <option value="Matematika">Matematika</option>
          <option value="Fisika">Fisika</option>
          <option value="Informatika">Informatika</option>
        </select>
        <Button
          data-testid="add-btn"
          id="add-btn"
          type="submit"
          value="Add student"
        >
          Add Student
        </Button>
      </form>
      <Footer />
    </div>
  );
};

export default AddStudent;
