import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center">
      <h3>
        Studi Independent <br /> Kampus Merdeka
      </h3>
      <h1>by RUANGGURU</h1>
      <h1>Student Portal</h1>
      <Button data-testid="student-btn" onClick={() => navigate("/student")}>
        All Student
      </Button>
      <Footer />
    </Box>
  );
};

export default Home;
