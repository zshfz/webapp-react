import style from "../styles/Header.module.scss";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import LoginModal from "./LoginModal";
import 로고 from "../images/로고.jpeg";

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(0);
  const [show, setShow] = useState(false);

  const { currentUser, setCurrentUser } = useContext(Context);

  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const logout = async () => {
    await axios.get("http://localhost:8080/logout", {
      withCredentials: true,
    });
    setCurrentUser(""); // currentUser 상태 초기화
    localStorage.removeItem("currentUser"); // localStorage에서 currentUser 제거
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser); // localStorage에서 currentUser 가져와 설정
    }
  }, [setCurrentUser]);

  return (
    <div className={style.container}>
      <div className={style.left}>
        <img
          src={로고}
          alt=""
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <div className={style.right}>
        <span
          className={activeMenu === 0 ? style.setBackgroundColor : ""}
          onClick={() => {
            setActiveMenu(0);
            navigate("/");
          }}
        >
          게시판
        </span>
        {currentUser ? (
          <>
            <span
              onClick={() => {
                navigate("/userprofile/내프로필");
              }}
            >
              {currentUser.nickname}
            </span>
            <span onClick={logout}>로그아웃</span>
          </>
        ) : (
          <>
            {" "}
            <span onClick={handleShow}>로그인</span>
            <LoginModal show={show} handleClose={handleClose} />
            <span
              className={activeMenu === 1 ? style.setBackgroundColor : ""}
              onClick={() => {
                setActiveMenu(1);
                navigate("/register");
              }}
            >
              회원가입
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
