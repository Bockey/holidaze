//renders form for Contact page, sends post request with data from the form

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  subject: yup.string().required("Please enter your subject"),
  message: yup
    .string()
    .required("Please enter your message")
    .min(5, "The message must be at least 5 characters"),
});

export default function Contact() {
  PageTitle("Contact");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(errors);

  useEffect(() => {
    document.body.className = "contact-body"; //adds class to body for the purpose of background image
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);

  //post request function to send message data from the form
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    setSuccess(
      "Your message is sent. We will get back to you as soon as we can."
    );

    data.status = "publish";

    const newContent = data.email + " (" + data.subject + ") " + data.message; //adds multiple input values in 1 parameter so it fits api
    const newData = {
      author_name: data.username,
      content: newContent,
      author_email: data.email,
    };
    try {
      const response = await axios.post(
        "https://noroffcors.herokuapp.com/https://holidaze.bockey.one/wp-json/wp/v2/comments?post=249",
        newData
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  //rendering form on the page
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Heading type={"h1"}>Contact Us</Heading>
      {serverError && <FormError>{serverError}</FormError>}
      <Form.Group controlId="username" className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Full name">
          <Form.Control
            placeholder="Full name"
            type="text"
            name="username"
            {...register("username")}
          />
        </FloatingLabel>
        {errors.username && <span>{errors.username.message}</span>}
      </Form.Group>
      <Form.Group controlId="email" className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Email">
          <Form.Control
            placeholder="Email"
            type="email"
            name="email"
            {...register("email")}
          />
        </FloatingLabel>
        {errors.email && <span>{errors.email.message}</span>}
      </Form.Group>
      <Form.Group controlId="subject" className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Subject">
          <Form.Control
            placeholder="Subject"
            type="text"
            name="subject"
            {...register("subject")}
          />
        </FloatingLabel>
        {errors.subject && <span>{errors.subject.message}</span>}
      </Form.Group>
      <Form.Group controlId="message" className="mb-3">
        <FloatingLabel controlId="floatingInput" label="Message">
          <Form.Control
            placeholder="Message"
            as="textarea"
            name="message"
            {...register("message")}
          />
        </FloatingLabel>
        {errors.message && <span>{errors.message.message}</span>}
      </Form.Group>
      <Button type="submit" variant="primary" className="mb-3">
        {submitting ? "Sending..." : "Send"}
      </Button>
      <div className="success">{success}</div>
    </Form>
  );
}
