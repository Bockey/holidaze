import { API_URL } from "../../constants/api";

//fetches all Accommodations, filters them if they include what is typed in the search input and creates link to matching ones
export default function SearchFunctionality(event) {
  let searchValue = event.target.value.trim().toLowerCase();

  (async function () {
    const searchResultsContainer = document.querySelector(".search-container");
    try {
      const response = await fetch(API_URL);
      const json = await response.json();

      /* Search results */

      let places = json;
      let filteredPlaces = places.filter((place) => {
        if (
          place.name.toLowerCase().includes(searchValue) &&
          searchValue.length > 0
        ) {
          return true;
        }
        return false;
      });
      places = filteredPlaces;
      searchResultsContainer.innerHTML = "";
      for (let i = 0; i < places.length; i++) {
        searchResultsContainer.innerHTML += `<a href="/enquiry/${places[i].id}">${places[i].name} <span>Go!</span></a>`;
      }
    } catch (error) {
      console.log(error);
    }
  })();
}
