import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/api";
import { Link } from "react-router-dom";
import CarouselSpec from "./Carousel";
import { Spinner } from "react-bootstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";
library.add(faLocationDot, faStar);

//Fetches data for specific accommodation and creates HTML for the page
function Specific() {
  useEffect(() => {
    document.body.className = "specific-body"; //adds class to body for the purpose of background image
  }, []);
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/list"); //if there's not id in the url it redirects to the list page
  }

  const url = API_URL + "/" + id;

  //fetching data for that specific acc using id from url
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
  let placeDescription = place.description
    .replace(/(<([^>]+)>)/gi, "") //removes HTML tags from json response
    .replaceAll("(ovde)", "'"); //replaces that word "ovde" with a symbol

  let ratingValue;
  let roomName;
  let roomDescription;
  if (place.attributes[0]) {
    ratingValue = place.attributes[1].terms[0].name;

    roomName = place.attributes[2].name;
    roomDescription = place.attributes[2].terms[0].slug;
  } else {
    ratingValue = place.tags[0].name;
    roomName = place.tags[3].name;
    roomDescription = place.sku;
  }

  let ratingwidth = (113 / 5) * parseFloat(ratingValue); //calculates rating stars width (5 stars are 113px / 5 is 1 star and multiplied with rating is final width value)
  let accImages = [place.images[0], place.images[1]]; //first two images from response are for the accommodation (3rd is for the room)

  let roomImage = place.images[2].src;
  let roomImageAlt;
  if (place.images[2].alt) {
    roomImageAlt = place.images[2].alt;
  } else {
    roomImageAlt = "Accommodation room";
  }

  let addressValue;
  if (place.attributes[0]) {
    addressValue = place.attributes[0].terms[0].name;
  } else {
    addressValue = place.tags[2].name;
  }
  let price;
  if (place.prices.regular_price === "0") {
    price = place.tags[1].name;
  } else {
    price = place.prices.regular_price;
  }

  PageTitle(place.name);

  return (
    <div className="place-detail">
      <CarouselSpec images={accImages} />
      <Heading type={"h1"}>{place.name}</Heading>
      <div
        className="rating"
        style={{
          maxWidth: `${ratingwidth}px`,
        }}
      >
        <FontAwesomeIcon icon="fa-solid fa-star" />
        <FontAwesomeIcon icon="fa-solid fa-star" />
        <FontAwesomeIcon icon="fa-solid fa-star" />
        <FontAwesomeIcon icon="fa-solid fa-star" />
        <FontAwesomeIcon icon="fa-solid fa-star" />
      </div>
      <div>({ratingValue})</div>
      <span>
        <FontAwesomeIcon icon="fa-solid fa-location-dot" />
        {addressValue}
      </span>
      <p className="place-detail_description">{placeDescription}</p>
      <div className="place-detail_rooms">
        <Heading>Rooms</Heading>
        <div>
          <div
            className="room-image"
            style={{
              background: `url(${roomImage}) center/cover no-repeat`,
            }}
            alt={roomImageAlt}
          ></div>
          <h3>{roomName}</h3>
          <p>{roomDescription}</p>
          <div className="room-action">
            <span>NOK{price} per nigth</span>
            <Link to={`/enquiry/${id}`} className="btn-primary">
              Check
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Specific;
