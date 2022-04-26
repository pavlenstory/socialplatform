import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { gql, useMutation } from "@apollo/client";
import MenuSpinner from "../comonents/Spinner";
import { useForm } from "../util/hooks";
import FormElement from "../comonents/FormElement";

function Login() {
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values, history } = useForm(loginUserCallBack, {
    username: "",
    password: "",
  });

  const [LoginUser, { data, loading, error }] = useMutation(LOGIN_USER, {
    update() {
      history("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallBack() {
    LoginUser();
  }

  const isInvalidUsernameField = errors.username ? true : false;
  const isInvalidPasswordField = errors.password ? true : false;
  console.log(loading);
  //need to add loading
  return (
    <>
      {false ? (
        <MenuSpinner />
      ) : (
        <Form onSubmit={onSubmit}>
          <div>Login</div>
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
            label="Password"
            value={values.password}
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChange}
            errorMessage={errors.password}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
