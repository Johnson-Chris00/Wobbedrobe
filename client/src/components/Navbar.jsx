import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { goToPage, userLogout } from '../utils/reducers/statusSlice';
import '../styles/Navbar.scss';
import useSound from 'use-sound'
import whatever from '../images/Whatever.mp3'

export default function Navbar() {
  const user = useSelector((state) => state.status.user);
  console.log('user is ', user);
  const page = useSelector((state) => state.status.page);
  const dispatch = useDispatch();
  const [play] = useSound(whatever, {volume: 0.3})
  if (page !== 'LOGIN' && page !== 'SIGN_UP')
    return (
      <div className='container-of-navbar'>
        <nav className='navbar'>
          {user && (
            <>
              <div className='nav-items'>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('HOME'))}
                >
                  HOME
                </button>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('ADD_TO_WOBBEDROBE'))}
                >
                  ADD TO WOBBEDROBE
                </button>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('VIEW_WOBBEDROBE'))}
                >
                  VIEW WOBBEDROBE
                </button>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('ADD_TO_OOTD'))}
                >
                  ADD OOTD
                </button>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('GET_INSPIRED'))}
                >
                  GET INSPIRED
                </button>
                <button
                  className='nav-item'
                  onClick={() => dispatch(goToPage('VIEW_LOOKBOOK'))}
                >
                  VIEW LOOKBOOK
                </button>
                <button
                  className='nav-item'
                  onClick={() => {
                    play()
                    dispatch(goToPage('LANDING_PAGE'));
                    dispatch(userLogout());
                  }}
                >
                  LOGOUT
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    );
}
