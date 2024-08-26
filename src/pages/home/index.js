import React from "react";
import "./index.scss";
import CardHome1 from "../../components/card/card-show1/CardHome1";
import CardHome2 from "../../components/card/card-show1/CardHome2";
import CardHome3 from "../../components/card/card-show1/CardHome3";
import CardChart from "../../components/card/card-show2/CardChart";
import CardBanChay from "../../components/card/card-show3/CardBanChayNhat";
import CardMenu from "../../components/card/card-show5/CardMenu";
import CardKM from "../../components/card/card-show6/CardKhuyenMaiVaThongBao";
import CardBan from "../../components/card/card-show7/CardBan";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";

const Home = () => {
  const theme = useSelector(getThemeState);

  return (
    <div className={`layout-home ${theme ? "theme" : ""}`}>
      <div className="row">
        <div className="col-8">
          <div className="left-cart-1">
            <div className="box-1">
              <CardHome1 />
            </div>
            <div className="box-2">
              <CardHome2 />
            </div>
            <div className="box-3">
              <CardHome3 />
            </div>
          </div>
          <div className="left-cart-2">
            <CardChart />
          </div>
          <div className="left-cart-3">
            <CardBanChay />
          </div>
          <div className="right-cart-3">
            <CardBan />
          </div>
        </div>
        <div className="col-4">
          <div className="right-cart-1">
            <CardMenu />
          </div>
          <div className="right-cart-2">
            <CardKM />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Home);
