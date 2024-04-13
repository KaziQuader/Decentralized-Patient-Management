import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import { useState } from "react";
import useEth from "../contexts/EthContext/useEth.js";
import { useParams, useNavigate} from 'react-router-dom';

const Update = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const {id} = useParams();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    console.log(values);
    if (values.vaccineStatus.length !== 0 && values.isDead.length !== 0) {
      if (values.isDead === "True"){
        values.isDead = true
      } else {
        values.isDead = false
      }
      try {
       await contract.methods.updateVaccineStatus(id, values.vaccineStatus).send({from: accounts[0]})
       await contract.methods.updateIsDead(id, values.isDead).send({from: accounts[0]})
       navigate("/")
      } catch (error) {
        console.log(error)
      }
    } else if (values.vaccineStatus.length !== 0 && values.isDead.length === 0){
      try {
       await contract.methods.updateVaccineStatus(id, values.vaccineStatus).send({from: accounts[0]})
       navigate("/")
      } catch (error) {
        console.log(error)
      }
    } else {
      if (values.isDead === "True"){
        values.isDead = true
      } else {
        values.isDead = false
      }
      try {
       await contract.methods.updateIsDead(id, values.isDead).send({from: accounts[0]})
       navigate("/")
      } catch (error) {
        console.log(error)
      }
    }

  };

  const checkoutSchema = yup.object().shape({
    vaccineStatus: yup.string()
      .oneOf(["One Dose", "Two Dose", "Not Vaccinated"], "Vaccine Status can only be One Dose, Two Doses or Not Vaccinated"),
    isDead: yup.string().oneOf(["True", "False"], "Dead status can only be True or False"),
  });

  const initialValues = {
    vaccineStatus: "",
    isDead: "",
  };

  if (loading) {
    <h1>Please Wait</h1>
  } else {
    return (
    <Box m="20px">
      <Header title="UPDATE" subtitle="Update vaccine status or is dead status of a patient" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Status"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vaccineStatus}
                name="vaccineStatus"
                error={!!touched.vaccineStatus && !!errors.vaccineStatus}
                helperText={touched.vaccineStatus && errors.vaccineStatus}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Is Dead"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.isDead}
                name="isDead"
                error={!!touched.isDead && !!errors.isDead}
                helperText={touched.isDead && errors.isDead}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
  }
};

export default Update;