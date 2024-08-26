import React, { useCallback, useEffect, useState } from "react";
import { Card } from "antd";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import "./CardBan.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { toast } from "react-toastify";
import { apiTables } from "../../../api/AxiosInstall";
import LoadingCardBan from "./LoadingCardBan";
import ModalCardBan from "./MoadlCardBan";
import Lightbox from "react-awesome-lightbox";

const CardBan = (props) => {
  console.log("render CardBan");
  const theme = useSelector(getThemeState);
  const [listDataTable, setListDataTable] = useState([]);
  const [isOpen] = useState("open");
  const [listDataTableSuccess, setListDataTableSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [idAndTableNumber, setIdAndTableNumber] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [imageClick, setImageClick] = useState([]);
  /**********************************GET DATA********************** */
  useEffect(() => {
    getTableApi();
  }, []);
  const getTableApi = async () => {
    try {
      setIsLoading(true);

      const res = await apiTables.getTable();
      if (res && res.data && res.data.success === "success") {
        setIsLoading(false);

        setListDataTable(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };

  /**********************************DATA SUCCESS********************** */
  const getDataSuccess = useCallback(() => {
    if (listDataTable && listDataTable.length > 0 && isOpen) {
      let newData = [];
      for (let i = 0; i < listDataTable.length; i++) {
        if (listDataTable[i].status === isOpen) {
          newData.push(listDataTable[i]);
        }
      }
      setListDataTableSuccess(newData);
    }
  }, [listDataTable, isOpen]);
  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);

  const handleClickTag = (id, tableNumber) => {
    setShow(true);
    setIdAndTableNumber([id, tableNumber]);
  };

  const handleClickImageQR = (item) => {
    setIsShow(true);
    setImageClick([item.tableNumber, item.qrCode]);
  };
  console.log(imageClick, "check image click");

  return (
    <>
      <ModalCardBan
        show={show}
        setShow={setShow}
        idAndTableNumber={idAndTableNumber}
        setIdAndTableNumber={setIdAndTableNumber}
      />
      <Card
        className={`card-ban ${theme ? "theme" : ""}`}
        title={
          <div className="box-title">
            <div className="box-text">
              <p>Bàn đang hoạt động</p>
              <span>| Hôm nay</span>
            </div>
            <EllipsisOutlined className="icon-ellips" />
          </div>
        }
        bordered={false}
      >
        {isLoading ? (
          <div className="box-loading">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <div className="box-body">
            <span className="mb-1">
              Hiện có {listDataTableSuccess.length} bàn đang hoạt động
            </span>
            {listDataTableSuccess && listDataTableSuccess.length > 0 ? (
              listDataTableSuccess.map((item, index) => (
                <LoadingCardBan
                  key={index}
                  data={item}
                  handleClickTag={() =>
                    handleClickTag(item._id, item.tableNumber)
                  }
                  handleClickImageQR={() => handleClickImageQR(item)}
                />
              ))
            ) : (
              <span className="sp">Không có bàn nào hoạt động</span>
            )}
          </div>
        )}
      </Card>
      {isShow && (
        <Lightbox
          image={imageClick[1]}
          title={`Bàn ${imageClick[0]}`}
          onClose={() => setIsShow(false)}
        />
      )}
    </>
  );
};

export default React.memo(CardBan);
