import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import useEth from "../contexts/EthContext/useEth.js";
import {useNavigate} from "react-router-dom";

const Form = () => {
  const {
    state: { contract, accounts, role, loading },
  } = useEth()

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  
  const handleFormSubmit = async (values) => {
    console.log(values);

    if (values.isDead === "True"){
      values.isDead = true
    } else {
      values.isDead = false
    }

    try {
      await contract.methods.addPatient(values.publicAddress, values.age, values.gender, values.vaccineStatus, values.district, values.symptom, values.isDead).send({from: accounts[0]})
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  };

  const checkoutSchema = yup.object().shape({
    age: yup.string().required("Required"),
    gender: yup.string().required("Required"),
    publicAddress: yup.string().required("Required"),
    vaccineStatus: yup.string()
      .required("Required")
      .oneOf(["One Dose", "Two Dose", "Not Vaccinated"], "Invalid vaccine status"),
    district: yup.string().required("Required"),
    symptom: yup.string().required("Required"),
    isDead: yup.string().oneOf(["True", "False"], "Value can only be True or False"),
  });

  const initialValues = {
    age: "",
    gender: "",
    vaccineStatus: "",
    district: "",
    symptom: "",
    isDead: "",
    publicAddress: "",
  };

  if (loading) {
    return (
      <h1>Please Wait</h1>
    )
  } else {
    return (
    <Box m="20px">
      <Header title="CREATE PROFILE" subtitle="Create a New Profile" />

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
                label="Age"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.age}
                name="age"
                error={!!touched.age && !!errors.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.gender}
                name="gender"
                error={!!touched.gender && !!errors.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Public Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.publicAddress}
                name="publicAddress"
                error={!!touched.publicAddress && !!errors.publicAddress}
                helperText={touched.publicAddress && errors.publicAddress}
                sx={{ gridColumn: "span 4" }}
              />
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
                label="District"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.district}
                name="district"
                error={!!touched.district && !!errors.district}
                helperText={touched.district && errors.district}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Symptoms"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.symptom}
                name="symptom"
                error={!!touched.symptom && !!errors.symptom}
                helperText={touched.symptom && errors.symptom}
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
                {role === "Admin" ? "Add Patient" : "Register"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
  }  
};

export default Form;