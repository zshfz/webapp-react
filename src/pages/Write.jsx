import style from "../styles/Write.module.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Write = () => {
  const location = useLocation();
  const singleUpdatePost = location.state?.single || {};

  const [title, setTitle] = useState(singleUpdatePost.title || "");
  const [content, setContent] = useState(singleUpdatePost.content || "");
  const [images, setImage] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    if (singleUpdatePost.id) {
      try {
        await axios.put(
          `http://localhost:8080/posts/${singleUpdatePost.id}`,
          formData,
          {
            withCredentials: true,
          }
        );
        alert("게시글이 수정되었습니다.");
        navigate(-1);
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    } else {
      try {
        await axios.post("http://localhost:8080/posts/new", formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("게시글이 등록되었습니다.");
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(error.response.data);
      }
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className={style.file}
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <div className={style.buttonGroup}>
        <button onClick={handleSubmit}>등록</button>
        <button>취소</button>
      </div>
    </div>
  );
};

export default Write;
