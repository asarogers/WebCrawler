import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/insert">Insert</Link>
        <Link to="/email">Send email</Link>
        <Link to="/rental">Rental Scrapper</Link>
    </div>
  );
}
