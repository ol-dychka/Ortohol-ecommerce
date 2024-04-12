/* eslint-disable react-refresh/only-export-components */
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import RegisterForm from "./RegisterForm";
import * as yup from "yup";

const LoginForm = () => {
  const {
    userStore: { login },
    modalStore: { openModal },
  } = useStore();
  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        login(values).catch(() =>
          setErrors({ error: "Invalid email or password" })
        )
      }
      validationSchema={yup.object({
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
            <Typography variant="h3" textAlign="center">
              Log In to Ortohall
            </Typography>
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
              Login
            </Button>
            <Typography>
              Don't have an account?{" "}
              <Link onClick={() => openModal(<RegisterForm />)}>Register</Link>{" "}
              instead
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default observer(LoginForm);
