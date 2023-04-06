import { API_URL } from "../../constants/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Accordion, FloatingLabel, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";

//schema from yup for form validation
const schema = yup.object().shape({
  from: yup.string().required("Please choose a date"),
  to: yup.string().required("Please choose a date"),
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),
  author_email: yup
    .string()
    .required("Enter your email")
    .email("Please enter a valid email address"),
});

//page creating function and api call in one
export default function Enquiry() {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = API_URL + "/" + id;

  //fetching data to create content for Enquiry page (Accommodation data). Fetched data goes to the element from the function bellow to create HTML
  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();

            setPlace(json);
          } else {
            setError("An error occurred");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <div>An error occurred: {error}</div>;
  }
  return <Select place={place} />;
}

//creates element that displays on the page
function Select({ place }) {
  PageTitle(place.name + " - Book");

  //post request
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //POST request function - sending new enquiry
  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    const currentAccommodation = place.name.toString();

    //adds few input values to 1 parameter so it suits my api. Also adding some text between values to get final content more pleasant for the eye
    const newContent =
      currentAccommodation +
      " | From " +
      data.from +
      " to " +
      data.to +
      " | " +
      data.guests +
      " guests " +
      " | " +
      data.firstName +
      " " +
      data.lastName +
      " | " +
      data.author_email;

    //data that gets send in post req
    const newData = {
      author_name: data.lastName,
      content: newContent,
      author_email: data.author_email,
    };
    try {
      const response = await axios.post(
        "https://corsproxy.io/?https://holidaze.bockey.one/wp-json/wp/v2/comments?post=247",
        newData
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
      setSuccess(
        "Your booking request is successfully sent. You will get the confirmation on your email."
      );
    }
  }

  // const [value, setValue] = useState(1);
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  // This bellow stopped working after I included yup validation. I will try to fix it when I find the time. onChange is not working because yup is using it, I guess.

  //gets nr of adults
  const getInputValue = (event) => {
    // let userValue = event.target.value;
    // setValue(userValue);
  };

  //gets first date
  const getFrom = (event) => {
    let fromValue = event.target.value;
    console.log(event);
    setFrom(fromValue);
  };
  //gets second date
  const getTo = (event) => {
    let toValue = event.target.value;
    setTo(toValue);
  };
  //calculates nr of days between 2 dates
  let days =
    new Date(to) / (24 * 60 * 60 * 1000) -
    new Date(from) / (24 * 60 * 60 * 1000);
  if (days <= 0) {
    days = 1;
  }

  let price;
  if (place.prices.regular_price === "0") {
    price = place.tags[1].name;
  } else {
    price = place.prices.regular_price;
  }

  return (
    <div className="select-form">
      <Form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>
          <Form.Group controlId="from" className="mb-3 half-input">
            <FloatingLabel controlId="floatingInput" label="From">
              <Form.Control
                placeholder="Choose date"
                type="date"
                onKeyUp={getFrom}
                name="from"
                {...register("from")}
              />
            </FloatingLabel>
            {errors.from && <FormError>{errors.from.message}</FormError>}
          </Form.Group>
          <Form.Group controlId="to" className="mb-3 half-input">
            <FloatingLabel controlId="floatingInput" label="To">
              <Form.Control
                type="date"
                name="to"
                placeholder="Choose date"
                onChange={getTo}
                {...register("to")}
              />
            </FloatingLabel>
            {errors.to && <FormError>{errors.to.message}</FormError>}
          </Form.Group>
          <FloatingLabel controlId="floatingSelect" label="Guests">
            <Form.Select
              aria-label="Select guests"
              className="mb-3"
              onChange={getInputValue}
              name="guests"
              {...register("guests")}
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
              <option value="5">5 Adults</option>
              <option value="6">6 Adults</option>
              <option value="7">7 Adults</option>
              <option value="8">8 Adults</option>
            </Form.Select>
          </FloatingLabel>
          <div className="room-info">
            <Heading type={"h1"}>{place.name}</Heading>
            <p dangerouslySetInnerHTML={{ __html: place.description }} />
            <span>
              Price per night NOK{price}
              {/* Price per night NOK{price} <br></br>x {days} days <br></br>x{" "}
              {value} person/s <br></br>= NOK
              {price * value * days} */}
            </span>
          </div>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header className="btn-primary">Next</Accordion.Header>
              <Accordion.Body>
                <Form.Group className="mb-3" controlId="firstName">
                  <FloatingLabel controlId="floatingInput" label="First name">
                    <Form.Control
                      type="text"
                      placeholder="First name"
                      name="firstName"
                      {...register("firstName")}
                    />
                  </FloatingLabel>
                  {errors.firstName && (
                    <FormError>{errors.firstName.message}</FormError>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="lastName">
                  <FloatingLabel controlId="floatingInput" label="Last name">
                    <Form.Control
                      type="text"
                      placeholder="Last name"
                      name="lastName"
                      {...register("lastName")}
                    />
                  </FloatingLabel>
                  {errors.lastName && (
                    <FormError>{errors.lastName.message}</FormError>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <FloatingLabel controlId="floatingInput" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="author_email"
                      {...register("author_email")}
                    />
                  </FloatingLabel>
                  {errors.author_email && (
                    <FormError>{errors.author_email.message}</FormError>
                  )}
                </Form.Group>
                <div>Payment will be made at the location! </div>
                <Button variant="primary" type="submit" className="mb-3">
                  {submitting ? "Booking..." : "Book"}
                </Button>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </fieldset>
        <div className="success">{success}</div>
      </Form>
    </div>
  );
}
