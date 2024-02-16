import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BirthdayForm from "./BirthdayForm";
import Signout from "./Signout";
import './Path.css';
import BirthdayCards from "./BirthdayCards";
function Path() {
  return (
    <div className="Path">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Birthday form</Link>
              </li>
              <li>
                <Link to="/BirthdayCards">BirthdayCards</Link>
              </li>
              <li>
                <Link to="/Signout">sign out</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<BirthdayForm />} />
            <Route path="/BirthdayCards" element={<BirthdayCards />} />
            <Route path="/Signout" element={<Signout />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default Path;
