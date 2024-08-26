import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  emailState,
  fullNameState,
  getSetStatusUsersState,
  getThemeState,
  passwordState,
  roleState,
} from "../../../store/selector";
import FormUser from "../../form/formUsers/FormUser";
import "./ModalUsers.scss";
import {
  destroyUser,
  patchUpdateUser,
  postSendVerifyAuthentication,
  postUser,
  postVerifyAuthentication,
} from "../../../api/call_api/auth/fetchApiAuth";
import { Tag } from "antd";
import { FloatingLabel, Form } from "react-bootstrap";
import { valueFormUsers } from "../../../store/valueForm/users/actions";

const ModalUsers = ({
  show,
  handleClose,
  verifyCode,
  setVerifyCode,
  setSend,
  send,
}) => {
  console.log("render modal users");
  const fullName = useSelector(fullNameState);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const role = useSelector(roleState);
  const theme = useSelector(getThemeState);
  const getStatusUsers = useSelector(getSetStatusUsersState);
  console.log(getStatusUsers, "check getStatusUsers");

  const dispatch = useDispatch();
  const userItem = getStatusUsers[1];
  const handleClickXacNhan = async () => {
    if (send === true) {
      await postSendVerifyAuthentication(email, setSend, dispatch);
    } else {
      if (getStatusUsers[0] === "create") {
        const data = {
          fullName,
          email,
          password,
          role,
        };
        await postUser(dispatch, data, handleClose);
      }
      if (getStatusUsers[0] === "delete") {
        await destroyUser(dispatch, userItem._id, handleClose);
      }
      if (getStatusUsers[0] === "authentication") {
        await postVerifyAuthentication(
          getStatusUsers[1].email,
          verifyCode,
          handleClose,
          dispatch
        );
      }
      if (getStatusUsers[0] === "update") {
        await patchUpdateUser(
          getStatusUsers[1]._id,
          fullName,
          role,
          dispatch,
          handleClose
        );
      }
    }
  };

  const handleClickSendEmail = async () => {
    setSend(true);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-delete ${theme ? "theme" : ""}`}
        backdrop={"static"}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {getStatusUsers[0] === "create"
              ? "Tạo mới người dùng"
              : getStatusUsers[0] === "delete"
              ? "Xóa người dùng"
              : getStatusUsers[0] === "update"
              ? "Cập nhật người dùng"
              : `Xác thực ${getStatusUsers[1].role && "Nhân viên"} ${
                  getStatusUsers[1].fullName
                }`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusUsers[0] === "create" ? (
            <FormUser />
          ) : getStatusUsers[0] === "delete" ? (
            <div>
              <span>Bạn có chắc là muốn xóa </span>
              <Tag color="red">{`${
                userItem?.role === "client"
                  ? "khách hàng"
                  : userItem?.role === "admin"
                  ? "quản lí"
                  : userItem?.role === "staff"
                  ? "nhân viên"
                  : userItem?.role
              } ${userItem.fullName}`}</Tag>
              <span>này không?</span>
            </div>
          ) : getStatusUsers[0] === "update" ? (
            <>
              <FormUser />
            </>
          ) : (
            <>
              <FloatingLabel
                controlId="floatingInput"
                label="E-mail"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  disabled={send ? false : true}
                  value={send ? email : getStatusUsers[1].email}
                  onChange={
                    send
                      ? (e) => dispatch(valueFormUsers.setEmail(e.target.value))
                      : null
                  }
                />
              </FloatingLabel>
              {send ? (
                <></>
              ) : (
                <div className="authentication">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Mã xác nhận của bạn"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="name@example.com"
                      onChange={(e) => setVerifyCode(e.target.value)}
                    />
                  </FloatingLabel>

                  <Tag
                    color="cyan"
                    className="tag-verify"
                    onClick={handleClickSendEmail}
                  >
                    gửi lại mã
                  </Tag>
                </div>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button
            variant={
              send
                ? "info"
                : getStatusUsers[0] === "create"
                ? "primary"
                : getStatusUsers[0] === "delete"
                ? "danger"
                : getStatusUsers[0] === "update"
                ? "primary"
                : "warning"
            }
            onClick={handleClickXacNhan}
          >
            {send
              ? "Send"
              : getStatusUsers[0] === "create"
              ? "Tạo"
              : getStatusUsers[0] === "delete"
              ? "Xóa"
              : getStatusUsers[0] === "update"
              ? "Cập nhật"
              : "Xác thực"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUsers;
