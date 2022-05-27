import { Link } from "react-router-dom";

function BackBtn() {
  return (
    <Link className="back-btn" to="/admin">
      Go back
    </Link>
  );
}

export default BackBtn;
