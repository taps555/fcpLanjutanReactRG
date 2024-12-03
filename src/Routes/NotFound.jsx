// TODO: answer here
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>404 | Not Found</h1>

      <Button
        data-testid="back"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </>
  );
};

export default NotFound;
