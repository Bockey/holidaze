//renders Admin page content

import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import Heading from "../layout/Heading";
import PageTitle from "../layout/PageTitle";

function Admin() {
  PageTitle("Admin");

  useEffect(() => {
    document.body.className = "admin-body"; //adds class to body for the purpose of background image
  }, []);

  const [auth] = useContext(AuthContext);
  if (!auth) {
    return <h1>Please log in to se the content!</h1>;
  }
  return (
    <div className="admin-page">
      <Heading type={"h1"}>
        Welcome <span>{auth.user_display_name}</span>!
      </Heading>
      <div className="admin-page_links">
        <a href="/admin-enquiry">Enquiries</a>
        <a href="/admin-messages">Messages</a>
        <a href="new-establishment">Create new establishment</a>
      </div>
    </div>
  );
}

export default Admin;
