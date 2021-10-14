import React from "react";
import { db, storage } from "../../firebase";
import styled from "styled-components";

const ManageItemList = styled.li`
  margin-top: 1em;
  display: flex;
  width: 700px;
  height: 90px;
  border: 1px lightgray solid;
  border-radius: 5px;
  top: 1em;
`;

const ManageItemListItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const ManageItemListItemLeft = styled.div`
  display: flex;
  margin-left: 1em;
`;

// .manageItem__list__item__left >img {
//   object-fit: scale-down;
//   width: 100px;
// }
const ManageItemListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

// .manageItem__list__item__info > .itemName {
//   font-size: 1.2rem;
//   font-weight: 600;
// }
const ManageItemListItemRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const Button = styled.button`
  height: 2.5rem;
  margin-left: 1rem;
  background: lightgrey;
  padding: 10px;
  cursor: pointer;
  border: 1px solid lightgrey;
  &:hover {
    border: 1px solid #f2db66;
    background: #f2db66;
  }
`;
// .manageItem__list__item__right button {
//   padding: 0.25rem;
//   background-color:lightgray;
//   border: 1px solid lightgray;
//   border-radius:5px;
//   cursor:pointer;
// }

// .manageItem__list__item__right button:hover {
//   opacity: 0.6;
//   /* background-color:rgba(255, 255, 251, 0.76); */
// }

const ManageItemEach = ({ isOwner, manageItemObj }) => {
  // console.log(isOwner);
  // console.log(manageItemObj);

  const {
    data: { itemImg, itemName, itemCost, timestamp },
  } = manageItemObj;

  const deleteFunction = async (e) => {
    e.preventDefault();
    // console.log(db.doc().manageItemObj);
    // console.log(db.doc(`items/${manageItemObj.id}`));
    await db.doc(`items/${manageItemObj.id}`).delete();
    await storage.refFromURL(itemImg).delete();
  };

  console.log(timestamp.toDate());
  const date = new Date(timestamp.toDate());
  const uploadDate = `${date.getFullYear()} / ${date.getMonth()} / ${date.getDate()}`;
  //   console.log(uploadDate);
  return (
    <>
      {isOwner && (
        <ManageItemList>
          {/* <input type='checkbox' name='check' /> */}
          <ManageItemListItem>
            <ManageItemListItemLeft>
              <div style={{ display: "flex", width: "120px", justifyContent: "center" }}>
                <img
                  src={itemImg}
                  alt="item"
                  style={{ overflow: "hidden", objectFit: "contain" }}
                />
              </div>
              <ManageItemListItemInfo>
                <p className="itemName">{itemName}</p>
                <p>${itemCost}</p>
              </ManageItemListItemInfo>
            </ManageItemListItemLeft>

            <ManageItemListItemRight>
              <p>Upload Date: {uploadDate}</p>
              <div>
                <Button onClick={deleteFunction}>Delete Post</Button>
              </div>
            </ManageItemListItemRight>
          </ManageItemListItem>
        </ManageItemList>
      )}
    </>
  );
};

export default ManageItemEach;
