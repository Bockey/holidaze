import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import SearchFunctionality from "./SearchFunction";

//Creates HTML for the element
export default function SearchForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="searchGroup">
        <FloatingLabel
          controlId="floatingInput"
          label="Search accommodation by name"
        >
          <Form.Control
            autoComplete="off"
            className="search-input"
            type="text"
            placeholder="Search accommodation by name"
            onKeyUp={SearchFunctionality}
          />
        </FloatingLabel>
        <div className="search-container"></div>
      </Form.Group>
      {/* <div className="date-input">
        <Form.Group controlId="from" className="mb-3 half-input">
          <FloatingLabel controlId="floatingInput" label="From">
            <Form.Control placeholder="Choose date" type="date" name="from" />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="to" className="mb-3 half-input">
          <FloatingLabel controlId="floatingInput" label="To">
            <Form.Control type="date" name="to" placeholder="Choose date" />
          </FloatingLabel>                                                                             /   THIS WAS SOME EXTRA INPUTS FOR SEARCH WHICH I PLANNED IN MY                   /
        </Form.Group>                                                                                  /   DESIGN BUT IT WAS NOT THE BEST SOLUTION FOR ME WHEN I STARTED WITH CODING     /
      </div>                                                                                           /   I LEFT IT SO MAYBE IN THE FUTURE I WILL WORK ON IT                            /
      <FloatingLabel controlId="floatingSelect" label="Guests">
        <Form.Select aria-label="Select guests" className="mb-3">
          <option value="1">1 Adult</option>
          <option value="2">2 Adults</option>
          <option value="3">3 Adults</option>
          <option value="4">4 Adults</option>
          <option value="5">5 Adults</option>
          <option value="6">6 Adults</option>
          <option value="7">7 Adults</option>
          <option value="8">8 Adults</option>
        </Form.Select>
      </FloatingLabel>
      <Button variant="primary" className="mb-3">
        Search
      </Button> */}
    </Form>
  );
}
