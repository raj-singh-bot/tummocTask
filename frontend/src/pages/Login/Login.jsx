import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  CircularProgress,
  Center,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import style from "./login.module.css";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/AuthSlice";

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast({
    position: "top",
  });
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  if (auth.authenticate == true) {
    navigate("/");
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Please enter your email address")
      .email("Invalid email address"),
    password: Yup.string().required("Please enter your password"),
  });
  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    console.log(values);

    dispatch(userLogin(values));
    setIsSubmitting(false);
  };
  const defaultValues = {
    email: "",
    password: "",
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box
        borderWidth={1}
        px={4}
        width="full"
        maxWidth="500px"
        borderRadius={4}
        textAlign="center"
        boxShadow="lg"
      >
        <Box p={4}>
          <Box textAlign="center">
            <Text>
              <br></br>
            </Text>
            <Heading>Sign In to Your Account</Heading>
            <Text>
              <br></br>
            </Text>
          </Box>
          <Box my={8} textAlign="left">
            <Formik
              initialValues={defaultValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue }) => (
                <Form>
                  <div className="row">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Enter Username </FormLabel>
                      <Field
                        name="email"
                        placeholder="Enter Your First Name"
                        type="text"
                        className={style.formInput}
                      />
                      <p className={style.textDanger}>
                        <ErrorMessage name="email" />
                      </p>
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Field
                        name="password"
                        placeholder="Enter Your Last Name"
                        type="password"
                        className={style.formInput}
                      />
                      <p className={style.textDanger}>
                        <ErrorMessage name="password" />
                      </p>
                    </FormControl>
                  </div>
                  {isSubmitting ? (
                    <Flex
                      bg="white.500"
                      color="gery.500"
                      width="full"
                      justifyContent="center"
                      mt={4}
                    >
                      <Center>
                        <CircularProgress
                          size={7}
                          isIndeterminate
                          color="green.500"
                          m={1}
                        />
                      </Center>
                    </Flex>
                  ) : (
                    <Button
                      bg="green.500"
                      color="white"
                      width="full"
                      mt={4}
                      type="submit"
                    >
                      Sign In
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default Login;
