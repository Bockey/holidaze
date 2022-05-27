//creates HTML for the element
import Header from "../layout/Heading";

function SpecialOffer() {
  return (
    <div className="special-offer">
      <a href="/list" className="special-offer_link">
        <Header>Special Offer</Header>
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et, sed diam voluptua.
        </p>
      </a>
    </div>
  );
}

export default SpecialOffer;
