import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import useEth from "../contexts/EthContext/useEth.js";

const VaccineCertificate = () => {
  const {
    state: { contract, accounts, loading },
  } = useEth()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dose, setDose] = useState(false)
  const [cert, setCert] = useState();

  useEffect(() => {
    const getCert = async () => {
      try {
        const cert = await contract.methods.certificate().call({ from: accounts[0] })
        setDose(true)
        setCert(cert)
      } catch (error) {
        console.log(error)
      }
    }

    getCert();
  }, [contract, accounts])

  if (loading) {
    return (
      <h1>Please Wait</h1>
    )
  } else {
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
              {dose ? cert : "Please Receive Two Doses to Download Your Certificate"}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    ); 
  }
};

export default VaccineCertificate;