import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import { useState } from "react";

const VaccineCertificate = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dose, setDose] = useState(false)


  return (
    <Box m="20px">
      <Header title="Vaccine Certificate" subtitle="" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Download Certificate
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {dose ? "Your Certificate is Ready" : "Please Receive Two Doses to Download Your Certificate"}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VaccineCertificate;