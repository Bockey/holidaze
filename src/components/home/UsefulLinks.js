import { library } from "@fortawesome/fontawesome-svg-core";
import { faHotel, faHouseUser, faBed } from "@fortawesome/free-solid-svg-icons";
import { faPercent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faHotel, faHouseUser, faBed, faPercent); // adds icons from font awesome

//creates HTML for the element
function UsefulLinks(props) {
  return (
    <div className="useful-links">
      <a href="/list/category=22">
        <FontAwesomeIcon icon="fa-solid fa-hotel" />
        Hotels
      </a>
      <a href="/list/category=33">
        {" "}
        <FontAwesomeIcon icon="fa-solid fa-bed" /> B&B's
      </a>
      <a href="/list/category=24">
        {" "}
        <FontAwesomeIcon icon="fa-solid fa-house-user" /> Guesthouses
      </a>
      <a href="/list">
        {" "}
        <FontAwesomeIcon icon="fa-solid fa-percent" /> Offers
      </a>
    </div>
  );
}

export default UsefulLinks;
