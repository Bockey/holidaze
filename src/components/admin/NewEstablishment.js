import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import PageTitle from "../layout/PageTitle";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../common/FormError";
import { useForm } from "react-hook-form";
import axios from "axios";
import Heading from "../layout/Heading";
import GetImages from "./GetImages";
import BackBtn from "./BackBtn";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const key = "ck_0f39a04d30e832adea2829b010a147ca08770493";
const secret = "cs_0ef523179fa8ff7bce26194106b680b5bc91e740";

function NewEstablishment(props) {
  PageTitle("New Establishment");

  useEffect(() => {
    document.body.className = "admin-newest-body"; //adds class to body
  }, []);

  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setServerError(null);

    data.status = "publish";

    const postData = {
      type: "variable",
      sku: data.roomdescription,
      tags: [
        { name: data.address },
        { name: data.rating },
        { name: data.price },
        { name: data.roomname },
      ],
      name: data.name,
      description: data.description,
      categories: [{ id: data.categories }],
      images: [
        {
          id: data.images,
        },
        {
          id: data.images2,
        },
        {
          id: data.images3,
        },
      ],
    };
    console.log(postData);

    const url =
      "https://holidaze.bockey.one/wp-json/wc/v3/products?" +
      "consumer_key=" +
      key +
      "&consumer_secret=" +
      secret;
    try {
      const response = await axios.post(url, postData);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setServerError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  //upload image
  async function uploadImage(data) {
    const imageUrl =
      "https://holidaze.bockey.one/wp-json/wp/v2/media" +
      "consumer_key=" +
      key +
      "&consumer_secret=" +
      secret;
    try {
      const response = await axios.post(imageUrl, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <BackBtn />
      <Form onSubmit={handleSubmit(onSubmit)}>
        {serverError && <FormError>{serverError}</FormError>}
        <fieldset disabled={submitting}>
          <Heading type={"h1"}>Create new establishment</Heading>
          <Form.Group controlId="name" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Name">
              <Form.Control
                name="name"
                placeholder="Name"
                type="text"
                {...register("name")}
              />
            </FloatingLabel>
            {errors.name && <FormError>{errors.name.message}</FormError>}
          </Form.Group>
          <Form.Group controlId="address" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Address">
              <Form.Control
                name="address"
                placeholder="Address"
                type="text"
                {...register("address")}
              />
            </FloatingLabel>
          </Form.Group>
          <FloatingLabel controlId="floatingSelect" label="Type">
            <Form.Select
              aria-label="Select guests"
              className="mb-3"
              name="categories"
              {...register("categories")}
            >
              <option value="22">Hotel</option>
              <option value="24">Guest House</option>
              <option value="33">B&B</option>
            </Form.Select>
          </FloatingLabel>
          <Form.Group controlId="rating" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Rating">
              <Form.Control
                name="rating"
                placeholder="Rating"
                type="number"
                step="0.1"
                {...register("rating")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Description">
              <Form.Control
                name="description"
                placeholder="Description"
                as="textarea"
                {...register("description")}
              />
            </FloatingLabel>
          </Form.Group>
          <GetImages register={register} images="images" />
          <GetImages register={register} images="images2" />
          <Heading>Room details</Heading>
          <Form.Group controlId="roomname" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Room name">
              <Form.Control
                name="roomname"
                placeholder="Room name"
                type="text"
                {...register("roomname")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="roomdescription" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Room description">
              <Form.Control
                name="roomdescription"
                placeholder="Room description"
                as="textarea"
                {...register("roomdescription")}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="price" className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Price">
              <Form.Control
                name="price"
                placeholder="Price"
                type="number"
                {...register("price")}
              />
            </FloatingLabel>
          </Form.Group>
          <GetImages register={register} images="images3" />

          <Button type="submit" variant="primary" className="mb-3">
            {submitting ? "Creating..." : "Create"}
          </Button>
        </fieldset>
      </Form>
      <Form onSubmit={uploadImage} encType="multipart/form-data" method="POST">
        <Heading>Upload images to database</Heading>
        <Form.Group className="mb-3">
          <Form.Control
            name="image-up"
            placeholder="Upload image"
            type="file"
          />
        </Form.Group>
        <Button type="submit">Upload</Button>
      </Form>
    </>
  );
}

export default NewEstablishment;
