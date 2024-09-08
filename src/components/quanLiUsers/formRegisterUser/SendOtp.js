import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { api } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
import "./SendOtp.scss";
function SendOtp({ show, setShow, email }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [count, setCount] = useState(60);
  console.log(sendOtp);

  useEffect(() => {
    let time;
    if (sendOtp === true) {
      time = setInterval(() => {
        setCount((prev) => {
          if (prev < 1) {
            clearInterval(time);
            setSendOtp(false);
            setCount(60);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(time);
  }, [sendOtp]);

  const handleClickSave = async () => {
    try {
      const data = { email, verificationCode };
      const res = await api.verifyUser(data);
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setVerificationCode("");
        setShow(false);
        setSendOtp(false);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      const status = error?.response?.data?.status;
      toast.error(message || status);
    }
  };

  const handleClickSendOtp = async () => {
    setSendOtp(true);
    try {
      let res = await api.sendVerifyUser(email);
      if (res && res.data.status === "success") {
        toast.success(res.data.message);
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      const status = error?.response?.data?.status;
      toast.error(message || status);
    }
  };

  const handleClose = () => {
    setShow(false);
    setSendOtp(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Xác thực</Modal.Title>
        </Modal.Header>
        <FloatingLabel
          controlId="floatingInput"
          label="E-mail"
          className="mb-3 mx-3 mt-3"
        >
          <Form.Control
            value={email || ""}
            type="email"
            placeholder="name@example.com"
            readOnly
            disabled
          />
        </FloatingLabel>
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Mã otp"
            className="mb-3 mx-3 box-send-otp"
          >
            <Form.Control
              value={verificationCode}
              type="text"
              placeholder="name@example.com"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <div className="send-otp">
              <span onClick={handleClickSendOtp}>
                {sendOtp ? "Đã gửi" : "Gửi lại mã"}
              </span>
              {sendOtp === true && <span className="time-count">{count}</span>}
            </div>
          </FloatingLabel>
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClickSave}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SendOtp;
