import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Button } from "@chakra-ui/react";
// import { ExternalLinkIcon } from "@chakra-ui/icons";

const NavBar = () => {
  const navigate = useNavigate();
  const [path, setPath] = useState(null);

  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path, navigate]);

  const handleNavigation = (newPath) => {
    setPath(newPath);
  };

  return (
    <header>
      <Link
        onClick={() => handleNavigation("/")}
        data-testid="home-page"
        variant="solid"
      >
        <h1>Student Portal</h1>
      </Link>

      <section>
        <Link
          onClick={() => handleNavigation("/student")}
          data-testid="student-page"
        >
          All Student
        </Link>
        <Link onClick={() => handleNavigation("/add")} data-testid="add-page">
          Add Student
        </Link>
      </section>
    </header>
  );
};

export default NavBar;
