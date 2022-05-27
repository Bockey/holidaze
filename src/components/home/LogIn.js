import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { FloatingLabel } from "react-bootstrap";

//login imports
import { useForm } from "react-hook-form";
import { useContext } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormError from "../common/FormError";

const url = "https://holidaze.bockey.one/wp-json/jwt-auth/v1/token"; //endpoint to get token

//yup schema for validation
const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LogInModal() {
  //open and close modal values
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //login part of the function
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      navigate("/admin");
      handleClose();
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  //if logged out authorization gets removed and user is redirected to the Home page
  function logout() {
    setAuth(null);
    navigate("/");
  }
  return (
    <>
      {auth ? (
        <>
          <Button variant="primary" onClick={logout}>
            Log out
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Log in
        </Button>
      )}

      <Modal show={show} onHide={handleClose}>
        <fieldset disabled={submitting}>
          <Modal.Header closeButton>
            <Modal.Title>Log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              {loginError && <FormError>{loginError}</FormError>}

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    name="username"
                    {...register("username")}
                    autoFocus
                    autoComplete="off"
                  />
                </FloatingLabel>
                {errors.username && (
                  <FormError>{errors.username.message}</FormError>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPlaintextPassword">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    {...register("password")}
                    autoComplete="off"
                  />
                </FloatingLabel>
                {errors.password && (
                  <FormError>{errors.password.message}</FormError>
                )}
              </Form.Group>
              <Button variant="primary" type="submit">
                {submitting ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </Modal.Body>
        </fieldset>
      </Modal>
    </>
  );
}
