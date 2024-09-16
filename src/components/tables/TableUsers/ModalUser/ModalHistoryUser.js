import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Avatar } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  historyPaymentUser,
  historyPromotionUser,
} from "../../../../api/call_api/auth/fetchApiAuth";
import { FormatDay2 } from "../../../../utils/FormDay";
import _ from "lodash";
import LoadingCash from "./LoadingCash";
import LoadingBanking from "./LoadingBanking";
import HistoryPromotionUsers from "./HistoryPromotionUsers";

const ModalHistoryUser = ({ show, setShow, item }) => {
  const [data, setData] = useState([]);
  const [listCash, setListCash] = useState({});
  const [listZaloPay, setListZaloPay] = useState({});
  const [isSelectDate, setIsSelectDate] = useState("");
  const [isDataTime, setIsDataTime] = useState([]);
  const [listDataHistoryPromotion, setListDataHistoryPromotion] = useState([]);
  const [dataSuccessHistoryPromotions, setDataSuccessHistoryPromotions] =
    useState([]);
  const [selectCode, setSelectCode] = useState("");
  const [dataSelect, setDataSelect] = useState([]);

  /**********************************GET DATA*************************** */
  const getApiHistoryPayment = useCallback(async () => {
    if (item && show === true) {
      await historyPaymentUser(item._id, setData);
    } else {
      setData([]);
    }
  }, [item, show]);

  useEffect(() => {
    getApiHistoryPayment();
  }, [getApiHistoryPayment]);

  /**********************************LAY NGAY*************************** */
  const dateTime = useMemo(() => {
    return [...new Set(data.map((item) => FormatDay2(item.createdAt)) || [])];
  }, [data]);

  useEffect(() => {
    setIsDataTime(dateTime);
  }, [dateTime]);

  useEffect(() => {
    if (isDataTime && isDataTime.length > 0 && isSelectDate === "") {
      setIsSelectDate(isDataTime[0]);
    }
  }, [isDataTime, isSelectDate]);
  /**********************************LAY THEO THANH TOAN*************************** */
  const getDataListPayment = useCallback(() => {
    if (data) {
      let listDataZaloPay = [];
      let listDataCash = [];
      for (let i = 0; i < data.length; i++) {
        if (
          data[i].paymentMethod === "ZaloPay" ||
          data[i].paymentMethod === "Banking"
        ) {
          if (FormatDay2(data[i].createdAt) === isSelectDate) {
            listDataZaloPay.push(data[i]);
          }
        }
        if (data[i].paymentMethod === "Cash") {
          if (FormatDay2(data[i].createdAt) === isSelectDate) {
            listDataCash.push(data[i]);
          }
        }
      }
      setListZaloPay(listDataZaloPay);
      setListCash(listDataCash);
    }
  }, [data, isSelectDate]);
  useEffect(() => {
    getDataListPayment();
  }, [getDataListPayment]);

  /***********************************LAY paymentMethod************************************* */
  let paymentMethod = [
    ...new Set(
      (listZaloPay?.length > 0 &&
        listZaloPay?.map((item) => item.paymentMethod)) ||
        []
    ),
  ];

  /***********************************LAY HISTORY PROMOTION************************************* */
  useEffect(() => {
    getHistoryPromotion();
  }, []);

  const getHistoryPromotion = async () => {
    await historyPromotionUser(setListDataHistoryPromotion);
  };
  useEffect(() => {
    if (listDataHistoryPromotion && listDataHistoryPromotion.length > 0) {
      let newData = [];
      let newDataSelectCode = [];
      for (let i = 0; i < listDataHistoryPromotion.length; i++) {
        for (let j = 0; j < listDataHistoryPromotion[i].users.length; j++) {
          let user = listDataHistoryPromotion[i].users[j];
          let id = user.userId;
          if (id === item._id) {
            newDataSelectCode.push(listDataHistoryPromotion[i]);
          }
        }
        if (listDataHistoryPromotion[i].code === selectCode) {
          newData.push(listDataHistoryPromotion[i]);
        }
      }
      setDataSuccessHistoryPromotions(newData);
      if (newDataSelectCode && newDataSelectCode.length > 0 && show) {
        let code = new Set(newDataSelectCode.map((item) => item.code));
        if (code) {
          setDataSelect([...code]);
        }
      }
    }
  }, [listDataHistoryPromotion, item._id, selectCode, show]);
  useEffect(() => {
    if (dataSelect && dataSelect.length > 0 && !selectCode && show) {
      setSelectCode(dataSelect[0]);
    }
  }, [dataSelect, selectCode, show]);

  const handleClose = () => {
    setShow(false);
    setIsSelectDate("");
    setIsDataTime([]);
    setSelectCode("");
    setDataSelect([]);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>
            Chi tiết người dùng <b>{item.fullName}</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            {/* lich su thong tin */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Thông tin</Accordion.Header>
              <Accordion.Body>
                <div className="text-center mb-3">
                  <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={
                      <img
                        src={item.img_avatar_url}
                        alt="img_user"
                        loading="lazy"
                      />
                    }
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Full Name"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.fullName}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="E-mail"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.email}
                        type="email"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Vai trò"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          item.role === "admin"
                            ? "Quản lý"
                            : item.role === "staff"
                            ? "Nhân viên"
                            : "Khách hàng" || ""
                        }
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="col-6">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Xác Thực"
                      className="mb-3"
                    >
                      <Form.Control
                        value={
                          item.isVerified === true
                            ? "Đã xác thực"
                            : "Chưa xác thực" || ""
                        }
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            {/* lich su dat mon */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Lịch sử đặt món</Accordion.Header>
              <Accordion.Body>
                {_.isArray(data) && data.length > 0 ? (
                  <>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label="Chọn ngày-tháng-năm"
                    >
                      <Form.Select
                        value={isSelectDate}
                        aria-label="Floating label select example"
                        onChange={(e) => setIsSelectDate(e.target.value)}
                      >
                        {isDataTime?.length > 0 ? (
                          isDataTime.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })
                        ) : (
                          <option>Không có dữ liệu</option>
                        )}
                      </Form.Select>
                    </FloatingLabel>
                    <div className="row mt-3">
                      <div className="col-6">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              Thanh toán tiền mặt
                            </Accordion.Header>
                            <Accordion.Body>
                              {listCash?.length > 0 ? (
                                listCash?.map((item, index) => (
                                  <LoadingCash key={index} item={item} />
                                ))
                              ) : (
                                <div>Không có dữ liệu tiền mặt</div>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                      <div className="col-6">
                        <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="1">
                            <Accordion.Header>
                              Thanh toán bằng{" "}
                              {paymentMethod[0] ? paymentMethod[0] : "ZaloPay"}
                            </Accordion.Header>
                            <Accordion.Body>
                              {listZaloPay?.length > 0 ? (
                                listZaloPay?.map((item, index) => {
                                  return (
                                    <LoadingBanking key={index} item={item} />
                                  );
                                })
                              ) : (
                                <div>
                                  Không có dữ liệu{" "}
                                  {paymentMethod[0]
                                    ? paymentMethod[0]
                                    : "Thanh toán"}
                                </div>
                              )}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center">Không có dữ liệu</div>
                )}
              </Accordion.Body>
            </Accordion.Item>
            {/* lich su promotion */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Lịch sử dùng mã khuyến mãi</Accordion.Header>
              <Accordion.Body>
                {dataSuccessHistoryPromotions.length === 0 ? (
                  `Không có dữ liệu`
                ) : (
                  <>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Hiện đang sử dụng"
                    >
                      <Form.Control
                        value={`${dataSelect.length} mã khuyến mãi`}
                        readOnly
                        type="text"
                        placeholder="Password"
                        disabled
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingSelectGrid"
                      label="Mã"
                      className="mt-3"
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        value={selectCode}
                        onChange={(e) => setSelectCode(e.target.value)}
                      >
                        {dataSelect &&
                          dataSelect.length > 0 &&
                          dataSelect.map((item, index) => {
                            return (
                              <option value={item} key={index}>
                                {item}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </FloatingLabel>
                    {dataSuccessHistoryPromotions &&
                    dataSuccessHistoryPromotions.length > 0 ? (
                      dataSuccessHistoryPromotions.map((item, index) => (
                        <HistoryPromotionUsers key={index} data={item} />
                      ))
                    ) : (
                      <div>Không có dữ liệu</div>
                    )}
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalHistoryUser;
