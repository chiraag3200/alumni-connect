import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComp from "./components/NavbarComp";
import SearchEmployees from "./components/SearchEmployees";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import SignInForm from "./components/SignInForm";
import CompanyData from "./Data.json";
import history from "./History";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import PendingRequest from "./components/PendingRequest";
import AcceptRequest from "./components/AcceptRequest";
import Updates from "./components/Updates";


function App() {
  return (
    <Router history={history}>
      <Routes>
        <Route exact path="/referral" element={<SearchBar />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/sign-in" element={<SignInForm />} />
        <Route exact path="/dashboard" element={<NavbarComp />}></Route>
        <Route exact path="/pendingRequests" element={<PendingRequest />} />
        <Route path="/acceptedRequests" element={<AcceptRequest />} />
        <Route path="/updates" element={<Updates />} />
        <Route exact path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

