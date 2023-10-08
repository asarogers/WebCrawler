import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
        <Link to="/">insert</Link>
        <Link to="/insert">iterate over url</Link>
        <Link to="/email">Send email</Link>
    </div>
  );
}
