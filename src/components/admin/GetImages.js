import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { FloatingLabel } from "react-bootstrap";

function GetImages({ register, images, label }) {
  const url = "https://holidaze.bockey.one/wp-json/wp/v2/media";

  const [media, setMedia] = useState([]);

  useEffect(function () {
    async function getMedia() {
      try {
        const response = await axios.get(url);
        console.log("response", response);
        setMedia(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FloatingLabel controlId="floatingSelect" label={label}>
      <Form.Select
        aria-label="Select image"
        className="mb-3"
        name={images}
        {...register(images)}
      >
        {media.map((media) => {
          return (
            <option key={media.id} value={media.id}>
              {media.title.rendered}
            </option>
          );
        })}
      </Form.Select>
    </FloatingLabel>
  );
}

export default GetImages;

GetImages.propTypes = {
  register: PropTypes.func,
};

GetImages.defaultProps = {
  register: () => {},
};
