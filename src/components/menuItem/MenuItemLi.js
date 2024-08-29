import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const MenuItemLi = ({ data, onClick, isClick }) => {
  return (
    <>
      <IoIosArrowDown className="icon-arrow" />
      <ul className="menu-sort">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => onClick(item, index)}
              className={isClick === index ? "click" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MenuItemLi;
