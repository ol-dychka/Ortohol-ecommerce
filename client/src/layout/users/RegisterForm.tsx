/* eslint-disable react-refresh/only-export-components */
import {
  Box,
  Button,
  IconButton,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import * as yup from "yup";
import LoginForm from "./LoginForm";
import { CloseOutlined } from "@mui/icons-material";

const RegisterForm = () => {
  const {
    userStore: { register },
    modalStore: { openModal, closeModal },
  } = useStore();
  return (
    <Formik
      initialValues={{
        displayName: "",
        userName: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        register(values).catch((error) => {
          console.log(error);
          if (error.response.data instanceof Object)
            setErrors({
              error:
                "Password must include Lowercase, Uppercase, Digit and be 8-16 symbols",
            });
          else setErrors({ error: error.response.data });
        })
      }
      validationSchema={yup.object({
        displayName: yup.string().required(),
        userName: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
      })}
    >
      {({
        handleSubmit,
        handleChange,
        isSubmitting,
        touched,
        handleBlur,
        errors,
        dirty,
        isValid,
      }) => (
        <form onSubmit={handleSubmit} autoComplete="off">
          <Box display="flex" flexDirection="column" gap="1rem">
            <Box display="flex" justifyContent="end" marginBottom="-2rem">
              <IconButton onClick={() => closeModal()}>
                <CloseOutlined />
              </IconButton>
            </Box>
            <Typography variant="h3" textAlign="center">
              Register at Ortohall
            </Typography>
            <TextField
              placeholder="Username"
              name="userName"
              type="text"
              fullWidth
              onChange={handleChange}
              helperText={
                errors.userName && touched.userName ? errors.userName : null
              }
              error={errors.userName && touched.userName ? true : false}
              onBlur={handleBlur}
            />
            <TextField
              placeholder="Display Name"
              name="displayName"
              type="text"
              fullWidth
              onChange={handleChange}
              helperText={
                errors.displayName && touched.displayName
                  ? errors.displayName
                  : null
              }
              error={errors.displayName && touched.displayName ? true : false}
              onBlur={handleBlur}
            />
            <TextField
              placeholder="Email"
              name="email"
              type="text"
              fullWidth
              onChange={handleChange}
              helperText={errors.email && touched.email ? errors.email : null}
              error={errors.email && touched.email ? true : false}
              onBlur={handleBlur}
            />
            <TextField
              placeholder="Password"
              name="password"
              type="password"
              fullWidth
              onChange={handleChange}
              helperText={
                errors.password && touched.password ? errors.password : null
              }
              error={errors.password && touched.password ? true : false}
              onBlur={handleBlur}
            />
            <Typography color="red">{errors.error}</Typography>
            <Button
              disabled={!dirty || !isValid || isSubmitting}
              type="submit"
              variant="contained"
            >
              Register
            </Button>
            <Typography>
              Already have an account?{" "}
              <Link onClick={() => openModal(<LoginForm />)}>Log In</Link>{" "}
              instead
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default observer(RegisterForm);
