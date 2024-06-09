import style from "../styles/Board.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const [board, setBoard] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await axios.get("http://localhost:8080/posts");
        setBoard(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBoard();
  }, []);

  console.log(board);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <span>게시판</span>
        <did className={style.center}>
          <select>
            <option>구분</option>
            <option>제목</option>
            <option>작성자</option>
            <option>내용</option>
          </select>
          <input type="text" placeholder="검색" />
        </did>
        <div className={style.right}>
          <select>
            <option>정렬</option>
            <option>최신순</option>
            <option>조회수</option>
            <option>댓글</option>
            <option>좋아요</option>
          </select>
          <button
            onClick={() => {
              navigate("/write/글쓰기");
            }}
          >
            글쓰기
          </button>
        </div>
      </div>
      <div className={style.body}>
        {board &&
          board.map((item1, index1) => {
            return (
              <div
                className={style.postContainer}
                key={index1}
                onClick={() => {
                  navigate(`/single/${item1.id}`);
                }}
              >
                <div className={style.left}>
                  <span className={style.title}>{item1.title}</span>
                  <span className={style.content}>{item1.content}</span>
                  <span>{item1.author.nickname}</span>
                  <span className={style.etc}>
                    조회수: {item1.viewCount} 좋아요: {item1.likeCount}{" "}
                    {item1.createdAt.replace("T", " ")}
                  </span>
                </div>
                <div className={style.right}>
                  {item1.imageUrls &&
                    item1.imageUrls.map((item2, index2) => {
                      return (
                        <img
                          key={index2}
                          src={`http://localhost:8080${item2}`}
                          alt=""
                        />
                      );
                    })}
                </div>
              </div>
            );
          })}
      </div>
      <div className={style.footer}></div>
    </div>
  );
};

export default Board;
