import React, { useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

const Login = ({ setId }) => {
  const idRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    setId(idRef.current.value);
  };

  const createNewId = () => {
    setId(uuidv4());
  };

  return (
    <Container
      className='align-items-center d-flex'
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handleLogin} className='w-100'>
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type='text' ref={idRef} required />
        </Form.Group>

        <Button type='submit'>Login</Button>
        <Button
          onClick={createNewId}
          type='button'
          variant='secondary'
          className='ml-2'
        >
          Create a new ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
