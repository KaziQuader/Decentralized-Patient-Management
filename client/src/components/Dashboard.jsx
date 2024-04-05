import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header";
import { useState } from "react";
import Button from '@mui/material/Button';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isAdmin, setIsAdmin] = useState(false)

  const rows = []
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "address",
      headerName: "Public Address",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
    },
    {
      field: "vaccineStat",
      headerName: "Vaccine Status",
      flex: 1,
    },
    {
        field: "symptomDetails",
        headerName: "Symptom Details",
        flex: 1,
    },
    {
      field: "district",
      headerName: "District",
      flex: 1,
    },
    {
      field: "isDead",
      headerName: "Is Dead",
      flex: 1,
    },
    isAdmin && {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => {
          return (
            <Button variant="outlined" color="primary">
              Update
            </Button>
          );
      }
    }
  ];

  return (
    <Box m="20px">
      <Header title="Patients" subtitle="" />
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
        <DataGrid checkboxSelection rows={rows} columns={columns} />
      </Box>
    </Box>
  );
};

export default Dashboard;