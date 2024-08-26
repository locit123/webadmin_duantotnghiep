import React from "react";
import { Link } from "react-router-dom";
import { ConvertMoney } from "../../../utils/convertMoney";
const LoadingCardMenu = ({ data }) => {
  return (
    <tr>
      <th>
        <Link to={"#"} className="img">
          <img src={data.image_url} alt="products-1" loading="lazy" />
        </Link>
      </th>
      <td>{data.name}</td>
      <td>{ConvertMoney(data.price)}</td>
    </tr>
  );
};

export default LoadingCardMenu;
