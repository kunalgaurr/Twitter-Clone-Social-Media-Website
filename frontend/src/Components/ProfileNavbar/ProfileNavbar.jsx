import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileNavbar.css';
import { useLocation } from 'react-router-dom';

export const ProfileNavbar = () => {
  const location = useLocation();
  const username = new URLSearchParams(location.search).get('username');

  return (
    <div id="profile-navbar-container">
      <Link
        to={`/profile?username=${username}`}
        className="profile-navbar-items"
      >
        Tweet
      </Link>
      <Link
        to={`/profile?username=${username}/shared`}
        className="profile-navbar-items"
      >
        Shared
      </Link>
      <Link
        to={`/profile?username=${username}/media`}
        className="profile-navbar-items"
      >
        Media
      </Link>
      <Link
        to={`/profile?username=${username}/saved`}
        className="profile-navbar-items"
      >
        Saved
      </Link>
    </div>
  );
};
