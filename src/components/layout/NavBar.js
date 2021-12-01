import React from 'react'
// import { Link } from "react-router-dom";
import AppLink from './AppLink';

const NavBar = () => {
  return (
    <div className="ui secondary pointing menu">
      <AppLink to="/">API Demo Home</AppLink>
      <AppLink to="/music">Spotify API</AppLink>
      <AppLink to="/wiki">Wiki API</AppLink>
      <AppLink to="/youtube">YouTube API</AppLink>
    </div>
  )
}

export default NavBar
