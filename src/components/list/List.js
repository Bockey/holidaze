import { useState, useEffect } from "react";
import { API_URL } from "../../constants/api";
import ListItem from "./ListItem";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";

//Fetches list of all accommodation (or specific category) and creates HTML as new list element
function AllAccommodation() {
  PageTitle("Accommodation");

  const [acc, setAcc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  let url;
  if (category) {
    url = API_URL + "?" + category;
  } else {
    url = API_URL;
  }

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();

            setAcc(json);
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
    return <div>ERROR: An error occurred</div>;
  }

  return (
    <>
      {acc.map(function (place) {
        const { id, name, categories, images, attributes, tags } = place;

        return (
          <ListItem
            key={id}
            id={id}
            name={name}
            categories={categories}
            images={images}
            attributes={attributes}
            tags={tags}
          />
        );
      })}
    </>
  );
}

//Creates page HTML
export default function List() {
  useEffect(() => {
    document.body.className = "list-body"; //adds class to body for the purpose of the background image
  }, []);
  const { category } = useParams(); //gets category id from the url

  //Adds active class to the element with matching category displayed on the page
  let filterClassHotel;
  let filterClassBB;
  let filterClassGH;
  let filterClass;
  if (category === "category=22") {
    filterClassHotel = "active";
  } else if (category === "category=33") {
    filterClassBB = "active";
  } else if (category === "category=24") {
    filterClassGH = "active";
  } else {
    filterClass = "active";
  }
  return (
    <>
      <div className="landing-image"></div>
      <Heading type={"h1"}>List of accommodation</Heading>
      <Heading>
        Here you can see the list of all accommodation in our offer.
      </Heading>
      <div className="acc-filters">
        <a href="/list" className={filterClass}>
          All
        </a>
        <a href="/list/category=22" className={filterClassHotel}>
          Hotels
        </a>
        <a href="/list/category=33" className={filterClassBB}>
          B&B's
        </a>
        <a href="/list/category=24" className={filterClassGH}>
          Guest houses
        </a>
      </div>
      <AllAccommodation />
    </>
  );
}
