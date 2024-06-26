import { useState } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth.js';
import SignupForm from './SignupModal.jsx';

const Navbar = () => {
    const [showModal, setShowModal] = useState(false);
    const handleLogin = () => {
        setShowModal(true); 
    };
    const handleOnClose = () => setShowModal(false);
    const handleLogout = () => {
        Auth.logout();
    };

   return (
    <>
        <div className='flex items-center justify-between bg-white bg-opacity-25 p-4 h-full rounded-lg mb-4'>
            <h2 className='text-xl font-bold text-white'>Twilight Imperium Co-Pilot</h2>
            <button
                className="font-bold text-lg text-blue-500 border-2 border-transparent rounded-md p-1 cursor-pointer hover:border-blue-500"   
                onClick={ Auth.loggedIn() ? (handleLogout) : ( handleLogin )} 
            >
                    {Auth.loggedIn() ? (
                        <Link to='/dashboard'>LOGOUT</Link>
                        
                    ) : (
                        <Link to='/'>LOGIN/SIGNUP</Link>
                    )}
            </button>
            <SignupForm closeModal={handleOnClose} visible={showModal} />
        </div> 
    </>
   ); 
};
export default Navbar