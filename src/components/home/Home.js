import Heading from "../layout/Heading";
import SearchForm from "./SearchForm";
import SpecialOffer from "./SpecialOffer";
import UsefulLinks from "./UsefulLinks";
import { useEffect } from "react";
import PageTitle from "../layout/PageTitle";

export default function Home() {
  useEffect(() => {
    document.body.className = "home-body"; //added class to body for the purpose of setting background image...
  }, []);
  PageTitle("Home");
  return (
    <>
      <div className="section-one">
        <Heading type="h1">Looking for accommodation in Bergen?</Heading>
        <Heading>
          We have everything you need! Hotels, B&Bs and guesthouses.
        </Heading>
        <SearchForm />
      </div>
      <SpecialOffer />
      <UsefulLinks />
    </>
  );
}
