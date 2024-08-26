import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";
import { apiTables } from "../../../api/AxiosInstall";
import { useCallback, useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Avatar } from "antd";
import Form from "react-bootstrap/Form";
import "./ModalCardBan.scss";
import { FaUsersSlash } from "react-icons/fa";
import { FaRegSadCry } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
const ModalCardBan = ({
  show,
  setShow,
  idAndTableNumber,
  setIdAndTableNumber,
}) => {
  const [listDataPeopleTable, setListDataPeopleTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getTablePeopleApi = useCallback(async () => {
    try {
      if (
        Array.isArray(idAndTableNumber) &&
        idAndTableNumber &&
        idAndTableNumber.length > 0
      ) {
        setIsLoading(true);
        const res = await apiTables.checkPeopleTable(idAndTableNumber[0]);
        if (res && res.data && res.data.status === "success") {
          setIsLoading(false);

          setListDataPeopleTable(res.data.data);
        }
      } else {
        setListDataPeopleTable([]);
      }
    } catch (error) {
      setIsLoading(false);
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  }, [idAndTableNumber]);
  useEffect(() => {
    getTablePeopleApi();
  }, [getTablePeopleApi]);

  const handleClose = () => {
    setShow(false);
    setIdAndTableNumber([]);
    setListDataPeopleTable([]);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-children">
        <Modal.Header closeButton>
          <Modal.Title className="title-people">
            <span className="span">Bàn {idAndTableNumber[1]}</span>
            <span className="span2">
              hiện có{" "}
              {isLoading ? (
                <LoadingOutlined className="loading" />
              ) : (
                listDataPeopleTable.length
              )}
              {listDataPeopleTable.length > 0 ? (
                <FaUsers size={30} className="ic-user" />
              ) : (
                <FaUsersSlash size={30} className="ic-user" />
              )}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="box-loading">
              <LoadingOutlined className="loading" />
            </div>
          ) : listDataPeopleTable && listDataPeopleTable.length > 0 ? (
            listDataPeopleTable.map((item, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-3">
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      icon={
                        <img
                          src={item.img_avatar_url}
                          loading="lazy"
                          alt="anh"
                        />
                      }
                    />
                  </div>
                  <div className="col-9 mt-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Họ và tên"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        placeholder="name@example.com"
                        readOnly
                        value={item.fullName}
                        disabled
                      />
                    </FloatingLabel>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center">
              Không có ai ở đây cả <FaRegSadCry />
            </div>
          )}
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

export default ModalCardBan;
