import React, { useState, useEffect } from "react";
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
import { Link } from "react-router-dom";
import SearchResult from "../searchBar/SearchResult";
import Shop from "../shop/Shop";

const Header = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);

  const itemSearch = (e) => {
    console.log("itemSearchButton");
    if (searchName !== "" && searchCategory !== "" && searchLocation !== "") {
      setSearchBtnClicked(true);
    }
    setSearchName("");
    setSearchCategory("");
    setSearchLocation("");
  };
  const logoutEvent = () => {
    auth.signOut();
    history.push("/");
  };
  useEffect(() => {
    setSearchBtnClicked(false);
  }, []);

  return (
    <>
      <div className='header__main'>
        <div className='header__main__left'>
          <Link to='/'>
            <img className='header__main__logo' src='../../images/logo.png' alt='logo' />
          </Link>
          <div className='header__main__left__inputs'>
            <input
              type='text'
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder='Search item or location...'
            />
            <div className='ExpandMoreIcon'>
              <input
                type='text'
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder='All category'
              />
              <ExpandMoreIcon />
            </div>
            <div className='locationBox'>
              <LocationOnIcon />
              <input
                type='text'
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder='Calgary, Alberta'
              />
            </div>
            <div className='searchBox'>
              <SearchIcon onClick={itemSearch} />
            </div>
            <a href='/'>
              <button onClick={logoutEvent}>SignOut</button>
            </a>
          </div>
        </div>

        <div className='header__main__right'>
          <FavoriteBorderIcon />
          <NotificationsNoneIcon />
          <ChatBubbleOutlineIcon />
          <Avatar className='header__main__right__avatar'>J</Avatar>
        </div>
      </div>
      {/* {searchBtnClicked && (
        <SearchResult
          searchBtnClicked={searchBtnClicked}
          searchName={searchName}
          searchCategory={searchCategory}
          searchLocation={searchLocation}
        />
      )} */}
    </>
  );
};

export default Header;
