//fetches and renders content of enquiries for admin side

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";
import BackBtn from "./BackBtn";

function AdminEnquiry() {
  PageTitle("Admin - enquiries");

  useEffect(() => {
    document.body.className = "admin-enq-body"; //adds class to body
  }, []);

  const [enq, setEnq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url =
    "https://corsproxy.io/?https://holidaze.bockey.one/wp-json/wp/v2/comments?post=247";

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();

            setEnq(json);
            console.log(json);
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
  console.log(enq);
  return (
    <>
      <BackBtn />
      <Heading type={"h1"}>Enquiries</Heading>
      <ul>
        {enq.map(function (enquiry) {
          const { id, content } = enquiry;
          let renderedContent = content.rendered.replace(/(<([^>]+)>)/gi, " ");
          return (
            <li key={id} id={id}>
              {renderedContent}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AdminEnquiry;
