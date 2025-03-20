import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/AboutUs';
import BookPage from './pages/Books';
import ProfilePage from './pages/Profile';
import CartPage from './pages/Cart';
import OrdersPage from './pages/Orders';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/Register';
import NavbarBook from './components/NavbarBook';
import AuthProvider from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AddBook from './pages/AddBook'
import { BrowserRouter } from 'react-router-dom';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';

const App = () => {
    return (
        <BrowserRouter>
        <AuthProvider>
            <NavbarBook />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/book" element={<BookPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/OrderHistory" element={<OrderHistory/>}/>
                <Route path="/profile" element={<ProfilePage/>}/>

               \

                {/* Buyer Protected Routes */}
                
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute allowedRoles={['buyer']}>
                            <CartPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute allowedRoles={['buyer']}>
                            <Payment />
                        </ProtectedRoute>
                    }
                />
                

                {/* Seller Protected Routes */}
                
                
              
                 <Route
                    path="/AddBook"
                    element={
                        <ProtectedRoute allowedRoles={['seller']}>
                            <AddBook />
                        </ProtectedRoute>
                    }
                />
                

                {/* Catch-all route for unknown pages */}
                <Route path="*" element={<div>404 - Not Found</div>} />
            </Routes>
        </AuthProvider>
        </BrowserRouter>
        
    );
};

export default App;
