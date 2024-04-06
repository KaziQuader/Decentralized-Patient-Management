import { Box, useTheme } from "@mui/material";
import Header from "./Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";
import { DataGrid } from "@mui/x-data-grid";

const CovidTrend = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

   const rows = []
  const columns = [
    { field: "district", headerName: "District", flex: 1 },
    {
      field: "medianAge",
      headerName: "Median Age of Patients",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ]

  return (
    <Box m="20px">
      <Header title="COVID TREND" subtitle="Latest Data of Covid" />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Average death rate per day
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            District with highest covid patient
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Percentage of Children, Teenage, Young and Elder patients
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Children: Number <br />
            Teenage: Number <br />
            Elder: Number 
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Box m="20px">
        <Header title="Median age of covid patients in each district" subtitle="" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid rows={rows} columns={columns} />
        </Box>
      </Box>
    </Box>
  );
};

export default CovidTrend;