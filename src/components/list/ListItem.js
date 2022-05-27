import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faLocationDot);

//creates HTML for every list item on List page
function ListItem({ id, name, categories, images, attributes, tags }) {
  //adds "B&B" to categories name if it's more than 2 of categories for that accommodation
  let cat;
  for (let i = 0; i < categories.length; i++) {
    if (categories.length === 2) {
      cat = categories[i].name + " - B&B";
    } else if (categories[i].id === 33) {
      cat = "B&B";
    } else {
      cat = categories[i].name;
    }
  }

  let addressValue;
  if (attributes[0]) {
    addressValue = attributes[0].terms[0].name;
  } else addressValue = tags[2].name;
  let image1Value;

  if (images[0]) {
    image1Value = images[0].src;
  } else
    image1Value =
      "https://holidaze.bockey.one/wp-content/uploads/2022/05/hutomo-abrianto-X5BWooeO4Cw-unsplash-scaled.jpg";
  return (
    <Card>
      <div
        className="card-image"
        variant="top"
        style={{ background: `url(${image1Value}) center/cover no-repeat` }}
      ></div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          <FontAwesomeIcon icon="fa-solid fa-location-dot" />
          {addressValue}
          <span>({cat})</span>
        </Card.Text>
        <Link to={`/list/specific/${id}`} className="btn-primary">
          Select
        </Link>
      </Card.Body>
    </Card>
  );
}
ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  images: PropTypes.array.isRequired,
};
export default ListItem;
