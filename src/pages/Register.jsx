import style from "../styles/Register.module.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    name: "",
    email: "",
    nickname: "",
    password1: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/members/new", input);
      alert("회원가입이 완료되었습니다. 홈 화면으로 이동합니다.");
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className={style.container}>
      <span>회원가입</span>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={input.name}
          onChange={(e) => {
            setInput({ ...input, name: e.target.value });
          }}
        />
        <input
          type="email"
          placeholder="이메일"
          value={input.email}
          onChange={(e) => {
            setInput({ ...input, email: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={input.nickname}
          onChange={(e) => {
            setInput({ ...input, nickname: e.target.value });
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
        <input
          type="password"
          placeholder="비밀번호 재입력"
          value={input.password2}
          onChange={(e) => {
            setInput({ ...input, password2: e.target.value });
          }}
        />
        <button type="submit">회원가입</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
