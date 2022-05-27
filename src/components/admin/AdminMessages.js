//fetches and renders content of messages for admin side

import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";
import BackBtn from "./BackBtn";

function AdminMessages() {
  PageTitle("Admin - messages");

  useEffect(() => {
    document.body.className = "admin-mess-body"; //adds class to body
  }, []);

  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url =
    "https://noroffcors.herokuapp.com/https://holidaze.bockey.one/wp-json/wp/v2/comments?post=249";

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();

            setMessage(json);
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
  console.log(message);
  return (
    <>
      <BackBtn />
      <Heading type={"h1"}>Messages</Heading>
      <ul>
        {message.map(function (mess) {
          const { id, author_name, content } = mess;
          let renderedContent = content.rendered.replace(/(<([^>]+)>)/gi, " ");
          return (
            <li key={id}>
              <span>{author_name}-</span>
              {renderedContent}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default AdminMessages;
