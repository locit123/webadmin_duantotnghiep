import { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { apiOrder } from "../../api/AxiosInstall";
import "./ModalConfirmOrder.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { LoadingOutlined } from "@ant-design/icons";
import FormConfirm from "./FormConfirm";
import FormUnConfirm from "./FormUnConfirm";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ConvertMoney } from "../../utils/convertMoney";
function ModalConfirmOrder({ show, setShow, dataModal, setDataModal }) {
  const [selectIdTableNumber, setSelectIdTableNumber] = useState("");
  const [dataIdTable, setDataIdTable] = useState([]);
  const [listDataOrder, setListDataOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderConfirm, setOrderConfirm] = useState([]);
  const [orderUnConfirm, setOrderUnConfirm] = useState([]);
  const [totalLoading, setTotalLoading] = useState("");
  const [totalFinished, setTotalFinished] = useState("");
  const [eventKey, setEventKey] = useState("1");
  /***************************************XU LI DATA SUCCESS************************* */
  useEffect(() => {
    if (dataModal && dataModal.length > 0) {
      let newDataId = [];
      for (const item of dataModal) {
        newDataId.push({ id: item._id, tableNumber: item.tableNumber });
      }
      setDataIdTable(newDataId);
    }
  }, [dataModal, selectIdTableNumber]);

  useEffect(() => {
    if (dataIdTable && dataIdTable.length > 0 && !selectIdTableNumber) {
      setSelectIdTableNumber(dataIdTable[0].id);
    } else if (dataIdTable.length === 0) {
      setSelectIdTableNumber("");
    }
  }, [dataIdTable, selectIdTableNumber]);

  /***********************************GET DATA ORDER************************* */
  const getOrderApi = useCallback(async () => {
    try {
      if (selectIdTableNumber) {
        setIsLoading(true);
        const res = await apiOrder.getConfirmOrder(selectIdTableNumber);
        if (res && res.data && res.data.success === "success") {
          setIsLoading(false);
          setListDataOrder(res.data.data);
        }
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  }, [selectIdTableNumber]);
  useEffect(() => {
    getOrderApi();
  }, [getOrderApi]);

  /***************************************SUCCESS DATA ORDER************************* */

  const dataOrderSuccess = useCallback(() => {
    if (listDataOrder && listDataOrder.length > 0) {
      let dataLoading = [];
      let dataFinished = [];
      let totalLoading = 0;
      let totalFinished = 0;
      for (let i = 0; i < listDataOrder.length; i++) {
        if (listDataOrder[i].status === "loading") {
          dataLoading.push(listDataOrder[i]);
          totalLoading += listDataOrder[i].menuItemId.price;
        }
        if (listDataOrder[i].status === "finished") {
          dataFinished.push(listDataOrder[i]);
          totalFinished += listDataOrder[i].menuItemId.price;
        }
      }

      setOrderUnConfirm(dataLoading);
      setOrderConfirm(dataFinished);
      setTotalLoading(totalLoading);
      setTotalFinished(totalFinished);
    } else {
      setOrderUnConfirm([]);
      setOrderConfirm([]);
      setTotalLoading("");
      setTotalFinished("");
    }
  }, [listDataOrder]);
  useEffect(() => {
    dataOrderSuccess();
  }, [dataOrderSuccess]);

  /***************************************CONFIRM MENU ITEM************************* */
  const handleClickConfirm = async (itemId, status) => {
    try {
      if (status === "loading") {
        const res = await apiOrder.patchConfirmOrder(
          selectIdTableNumber,
          itemId,
          "finished"
        );
        if (res && res.data && res.data.status === "success") {
          toast.success(res.data.status);
          await getOrderApi();
        }
      } else {
        const res = await apiOrder.patchConfirmOrder(
          selectIdTableNumber,
          itemId,
          "loading"
        );
        if (res && res.data && res.data.status === "success") {
          toast.success(res.data.status);
          await getOrderApi();
        }
      }
    } catch (error) {
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSelectIdTableNumber("");
    setDataIdTable([]);
    setDataModal([]);
  };
  const handleSelect = (e) => {
    if (e === "1") {
      setEventKey("1");
    } else {
      setEventKey("2");
    }
  };
  console.log(totalLoading);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <select
              value={selectIdTableNumber}
              onChange={(e) => setSelectIdTableNumber(e.target.value)}
            >
              {dataIdTable &&
                dataIdTable.length > 0 &&
                dataIdTable.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      Bàn:{item.tableNumber}
                    </option>
                  );
                })}
            </select>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="box-loading">
              <LoadingOutlined className="loading" />
            </div>
          ) : (
            <>
              <Tabs
                activeKey={eventKey}
                id="uncontrolled-tab-example"
                className="mb-3"
                onSelect={handleSelect}
              >
                <Tab
                  eventKey={"1"}
                  title={`Món chưa xác nhận (${orderUnConfirm.length})`}
                >
                  {totalLoading > 0 && (
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Tổng tiền"
                      className="mb-3 mt-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        value={ConvertMoney(totalLoading) || 0}
                        readOnly
                      />
                    </FloatingLabel>
                  )}

                  {orderUnConfirm && orderUnConfirm.length > 0 ? (
                    orderUnConfirm.map((item, index) => (
                      <FormConfirm
                        key={index}
                        item={item}
                        handleClickConfirm={() =>
                          handleClickConfirm(item.id, item.status)
                        }
                      />
                    ))
                  ) : (
                    <div>Không có dữ liệu món</div>
                  )}
                </Tab>
                <Tab
                  eventKey={"2"}
                  title={`Món đã xác nhận (${orderConfirm.length})`}
                >
                  {totalFinished > 0 && (
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Tổng tiền"
                      className="mb-3 mt-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        value={ConvertMoney(totalFinished) || 0}
                        readOnly
                      />
                    </FloatingLabel>
                  )}
                  {orderConfirm && orderConfirm.length > 0 ? (
                    orderConfirm.map((item, index) => (
                      <FormUnConfirm
                        key={index}
                        item={item}
                        handleClickConfirm={() =>
                          handleClickConfirm(item.id, item.status)
                        }
                        totalFinished={totalFinished}
                      />
                    ))
                  ) : (
                    <div>Không có dữ liệu món</div>
                  )}
                </Tab>
              </Tabs>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirmOrder;
