import style from "../styles/LoginModal.module.scss";
import axios from "axios";
import { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Context } from "../context/Context";

const LoginModal = (props) => {
  const [input, setInput] = useState({
    email: "",
    password1: "",
  });
  const [error, setError] = useState("");

  const { setCurrentUser } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", input, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div className={style.container}>
          <span>Today I Learned</span>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="이메일"
              value={input.email}
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={input.password1}
              onChange={(e) => {
                setInput({ ...input, password1: e.target.value });
              }}
            />
            <button type="submit">로그인</button>
            {error && <p>{error}</p>}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
