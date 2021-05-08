import React from "react";
import { db, storage } from "../../firebase";

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
  const uploadDate = `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`;
  //   console.log(uploadDate);
  return (
    <>
      {isOwner && (
        <li className='manageItem__list'>
          {/* <input type='checkbox' name='check' /> */}
          <div className='manageItem__list__item'>
            <div className='manageItem__list__item__left'>
              <img src={itemImg} alt='item' />
              <div className='manageItem__list__item__info'>
                <p>{itemName}</p>
                <p>${itemCost}</p>
              </div>
            </div>
            <div className='manageItem__list__item__right'>
              <p>{uploadDate}</p>
              <div>
                <button onClick={deleteFunction}>Delete Post</button>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default ManageItemEach;
