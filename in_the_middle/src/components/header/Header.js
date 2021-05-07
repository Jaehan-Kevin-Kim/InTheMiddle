import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import { auth } from "../../firebase";
import { useHistory } from "react-router";

const Header = () => {
  const history = useHistory();
  const logoutEvent = () => {
    auth.signOut();
    history.push("/");
  };
  return (
    <div className='header__main'>
      <div className='header__main__left'>
        <img className='header__main__logo' src='../../images/logo.png' alt='logo' />
        <div className='header__main__left__inputs'>
          <input type='text' placeholder='Search item or location...' />
          <div className='ExpandMoreIcon'>
            <input type='text' placeholder='All category' />
            <ExpandMoreIcon />
          </div>
          <div className='locationBox'>
            <LocationOnIcon />
            <input type='text' placeholder='Calgary, Alberta' />
          </div>
          <div className='searchBox'>
            <SearchIcon />
          </div>
          <button onClick={logoutEvent}>SignOut</button>
        </div>
      </div>

      <div className='header__main__right'>
        <FavoriteBorderIcon />
        <NotificationsNoneIcon />
        <ChatBubbleOutlineIcon />
        <Avatar className='header__main__right__avatar'>J</Avatar>
      </div>
    </div>
  );
};

export default Header;
