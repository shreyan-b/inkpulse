import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DataProvider from './context/DataProvider';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Login from './components/account/Login';

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    return isAuthenticated ? 
        <>
            <Outlet />
        </> 
        : <Navigate replace to='/login' />
};

function App() {
    const [isAuthenticated, isUserAuthenticated] = useState(() => {
        return sessionStorage.getItem('accessToken') ? true : false;
    });

    useEffect(() => {
        const checkAuth = () => {
            const token = sessionStorage.getItem('accessToken');
            isUserAuthenticated(!!token);
        };

        // Update auth state when storage changes (other tabs) or when our app dispatches an authChanged event
        window.addEventListener('storage', checkAuth);
        window.addEventListener('authChanged', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('authChanged', checkAuth);
        };
    }, []);

    return (
        <DataProvider>
            <BrowserRouter>
                {isAuthenticated && <Header />}
                <div>
                    <Routes>
                        <Route path='/login' element={
                            isAuthenticated ? 
                                <Navigate replace to='/' /> : 
                                <Login isUserAuthenticated={isUserAuthenticated} />
                        } />
                        <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                            <Route path='/' element={<Home />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;