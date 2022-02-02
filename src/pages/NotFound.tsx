import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h3 style={{ textAlign: "center", paddingTop: "5rem" }}>
        Sorry you need to <Link to="/">sign in</Link> first.
      </h3>
    </div>
  );
}
