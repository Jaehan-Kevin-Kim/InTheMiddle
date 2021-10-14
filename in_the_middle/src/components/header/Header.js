import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar, colors } from "@material-ui/core";
import "./Header.css";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router";
import { Link, Redirect } from "react-router-dom";
import SearchResult from "../searchBar/SearchResult";
import Shop from "../shop/Shop";
import { useDispatch } from "react-redux";
import { ITEM } from "../../reducers/itemsReducer";

const Header = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);
  const [logOutActive, setLogOutActive] = useState(false);
  const [expandAvatar, setExpandAvatar] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
  }, []);

  useEffect(() => {
    setSearchBtnClicked(false);
  }, [searchBtnClicked]);

  useEffect(() => {
    console.log(searchedItem);

    return dispatch(
      {
        type: ITEM,
        payload: {
          items: searchedItem,
        },
      },
      // })
    );
  }, [searchedItem]);

  const itemSearch = () => {
    if (searchName !== "" || searchCategory !== "" || searchLocation !== "") {
      setSearchBtnClicked(true);

      items.map((item) => {
        if (item.data.itemName.toLowerCase().includes(searchName.toLowerCase())) {
          setSearchedItem((prevSearched) => {
            return [...prevSearched, item];
          });

          /*backup ----
           setSearchedItem((prevSearched) => {
            console.log("prevSearched", prevSearched);
            console.log(searchedItem);
            return [...prevSearched, item.data.itemName];
          });
          */
        }
      });
    }

    setSearchName("");
    setSearchCategory("");
    setSearchLocation("");
  };

  const onKeyPress = (event) => {
    if (event.key === "Enter") {
      itemSearch(true);
    }
  };

  const onClickAvatar = (e) => {
    e.preventDefault();
    if (expandAvatar) {
      setExpandAvatar(false);
    } else {
      setExpandAvatar(true);
    }
  };

  const myAccountEvent = () => {
    console.log("click");
  };

  const myItemsEvent = () => {
    console.log("click");
  };
  const logoutEvent = () => {
    console.log("click");

    auth.signOut();
    setLogOutActive(true);
  };

  return logOutActive ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className="header__main">
        <div className="header__main__left">
          <Link to="/">
            <img className="header__main__logo" src="../../images/logo.png" alt="logo" />
          </Link>
        </div>
        <div className="header__main__right">
          <FavoriteBorderIcon />
          <ChatBubbleOutlineIcon />
          <Avatar onClick={onClickAvatar} className="header__main__right__avatar">
            J
          </Avatar>
          {expandAvatar && (
            <div className="expand_Navigation">
              <ul>
                <Link style={{ textDecoration: "none", color: "black" }} to="/myaccount">
                  My Account
                </Link>
              </ul>
              <ul>
                {" "}
                <Link style={{ textDecoration: "none", color: "black" }} to="/manageItem">
                  My Items
                </Link>
              </ul>
              <ul onClick={logoutEvent}>Logout</ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
