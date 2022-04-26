import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import MenuSpinner from "../comonents/Spinner";
import { useForm } from "../util/hooks";
import FormElement from "../comonents/FormElement";

function Register(props) {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values, history } = useForm(registerUser, {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [addUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update() {
      history("/");
    },
    onError(err) {
      console.log(err.graphQLErrors[0].extensions.errors);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  //need to add loading
  return (
    <>
      {false ? (
        <MenuSpinner />
      ) : (
        <Form onSubmit={onSubmit}>
          Register
          <FormElement
            label="Username"
            value={values.username}
            type="text"
            placeholder="UserName"
            name="username"
            onChange={onChange}
            errorMessage={errors.username}
          />
          <FormElement
            label="Email address"
            value={values.email}
            type="email"
            placeholder="Email"
            name="email"
            onChange={onChange}
            errorMessage={errors.email}
          />
          <FormElement
            label="Password"
            value={values.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            errorMessage={errors.password}
          />
          <FormElement
            label="Confirm password"
            value={values.confirmPassword}
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={onChange}
            errorMessage={errors.confirmPassword}
          />
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
