import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

function GetImages({ register, images }) {
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
    <select name={images} {...register(images)}>
      <option value="">Select media</option>
      {media.map((media) => {
        return (
          <option key={media.id} value={media.id}>
            {media.title.rendered}
          </option>
        );
      })}
    </select>
  );
}

export default GetImages;

GetImages.propTypes = {
  register: PropTypes.func,
};

GetImages.defaultProps = {
  register: () => {},
};
