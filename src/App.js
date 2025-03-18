import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/NavbarBook";
import Home from "./pages/Home";
import Login from "./pages/LoginPage";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import AddBook from "./pages/AddBook";
import About from './pages/AboutUs'
import Books from "./pages/Books";

const PrivateRoute = ({ element, roleRequired }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== roleRequired) {
        return <Navigate to="/" />;
    }

    return element;
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/book" element={<Books />} />
                

                {/* Buyer-only routes */}
                <Route path="/profile" element={<PrivateRoute element={<Profile />} roleRequired="buyer" />} />
                <Route path="/cart" element={<PrivateRoute element={<Cart />} roleRequired="buyer" />} />

                {/* Seller-only routes */}
                <Route path="/orders" element={<PrivateRoute element={<Orders />} roleRequired="seller" />} />
                <Route path="/add-book" element={<PrivateRoute element={<AddBook />} roleRequired="seller" />} />
            </Routes>
        </Router>
    );
}

export default App;
