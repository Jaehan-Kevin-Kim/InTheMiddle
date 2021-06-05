import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import { auth, db } from "../../firebase";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import SearchResult from "../searchBar/SearchResult";
import Shop from "../shop/Shop";

const Header = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchBtnClicked, setSearchBtnClicked] = useState(false);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  useEffect(() => {
    setSearchBtnClicked(false);
    // setSearchedItem([]);
    // setSearchedItem([]);
    console.log(searchedItem);
  }, [searchBtnClicked]);

  const itemSearch = () => {
    console.log(searchName);
    console.log("itemSearchButton");
    if (searchName !== "" || searchCategory !== "" || searchLocation !== "") {
      console.log("check");
      setSearchBtnClicked(true);
      /*
      const result = items.filter((item) => {
        item.data.itemName.toLowerCase().includes(searchName.toLowerCase());

        // console.log(item.data.itemName);
        // if (item.data.itemName.includes(searchName)) {
        //   setSearchedItem((prevState) => {
        //     return [...prevState, { itemName: item.data.itemName }];
        //   });
        // }
        // item.data.itemName.includes(searchName);
      });
      setSearchedItem((prevState) => {
        return [...prevState, result];
      });
      console.log(result);
      console.log(searchedItem);
      */

      items.map((item) => {
        // let value;
        console.log(item.data.itemName);
        console.log(item.data.itemName.toLowerCase().includes(searchName.toLowerCase()));

        if (item.data.itemName.toLowerCase().includes(searchName.toLowerCase())) {
          console.log("value", item.data.itemName);

          setSearchedItem((prevSearched) => {
            console.log("prevSearched", prevSearched);
            console.log(searchedItem);
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

      // setSearchedItem([]);

      //   items.map((item) => {
      //     console.log(item.data.itemName);
      //     console.log(item.data.itemName.toLowerCase().includes(searchName.toLowerCase()));
      //     if (item.data.itemName.includes(searchName)) {
      //       setSearchedItem((prevState) => {
      //         return [...prevState, { itemName: item.data.itemName }];
      //       });
      //     }
      //   });
      // }
      // console.log("searchedItem", searchedItem);
      // setSearchName("");
      // setSearchCategory("");
      // setSearchLocation("");
    }

    setSearchName("");
    setSearchCategory("");
    setSearchLocation("");
    // return <Shop searchedItem={searchedItem} />;
  };

  const logoutEvent = () => {
    auth.signOut();
    history.push("/");
  };

  return (
    <>
      <div className="header__main">
        <div className="header__main__left">
          <Link to="/">
            <img className="header__main__logo" src="../../images/logo.png" alt="logo" />
          </Link>
          <div className="header__main__left__inputs">
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search item or location..."
            />
            <div className="ExpandMoreIcon">
              <input
                type="text"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="All category"
              />
              <ExpandMoreIcon />
            </div>
            <div className="locationBox">
              <LocationOnIcon />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Calgary, Alberta"
              />
            </div>
            <div className="searchBox">
              <SearchIcon onClick={itemSearch} />
              {searchBtnClicked && <Shop searchedItem={searchedItem} />}
              {/* {searchedItem && <Shop searchedItem={searchedItem} />} */}
            </div>
          </div>
        </div>
        <div className="header__main__right">
          <FavoriteBorderIcon />
          <NotificationsNoneIcon />
          <ChatBubbleOutlineIcon />
          <a href="/">
            <Avatar className="header__main__right__avatar">J</Avatar>
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
