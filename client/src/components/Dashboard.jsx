import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "./Header";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import useEth from "../contexts/EthContext/useEth.js";
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const [patients, setPatients] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const rows = []
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "publicAddress",
      headerName: "Public Address",
      type: "string",
      headerAlign: "left",
      align: "left",
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
    (role === "Admin" && patients.length !== 0 ) && {
      field: "update",
      headerName: "Update",
      flex: 1,
      renderCell: (params) => {
          return (
            <Link to={`/update/${params.row.publicAddress}`}>
              <Button variant="contained" color="primary">
                Update
              </Button>
            </Link>
            
          );
      }
    }
  ];

  useEffect(() => {
    const getPatients = async () => {
      try {
        const patients = await contract.methods.getAllPatients().call({ from: accounts[0] })
        setPatients(patients)
      } catch (error) {
        console.log(error)
      }
    }

    getPatients();
  }, [contract, accounts])

  console.log(patients)

  patients.forEach((patient) => {
    rows.push({
      id: patient.id,
      publicAddress: patient.pub_address,
      age: patient.age,
      gender: patient.gender,
      vaccineStat: patient.vaccine_status,
      symptomDetails: patient.symptoms_details,
      district: patient.district,
      isDead: patient.is_dead,
    })
  })

  if (loading || patients.length === 0) {
    return (
      <h1>Please Wait</h1>
    )
  } else {
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
        <DataGrid rows={rows} columns={columns} />
      </Box>
    </Box>
  );
  }
};

export default Dashboard;