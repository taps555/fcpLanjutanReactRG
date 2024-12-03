import { Box } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      className="test-box footer"
      textAlign="center"
      fontSize="sm"
      data-testid="footer"
    >
      <Box as="p" data-testid="studentName" className="studentName">
        Trio Adhi Pamungkas S
      </Box>

      <Box as="p" data-testid="studentId" className="studentId">
        FS11620401
      </Box>
    </Box>
  );
};

export default Footer;
