import style from "../styles/Single.module.scss";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../context/Context";

const Single = () => {
  const [single, setSingle] = useState("");
  const [comment, setComment] = useState("");
  const [commentUpdateInputShow, setCommentUpdateInputShow] = useState(false);
  const [commentUpdateValue, setCommentUpdateValue] = useState("");

  const { currentUser } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleCommentSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:8080/posts/${id}/comment`,
        {
          content: comment,
        },
        {
          withCredentials: true,
        }
      );
      setComment("");
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(
        `http://localhost:8080/posts/${id}/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const handleCommentUpdate = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:8080/posts/${id}/comment/${commentId}`,
        { content: commentUpdateValue },
        { withCredentials: true }
      );
      setCommentUpdateValue("");
      setCommentUpdateInputShow(false);
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(
        `http://localhost:8080/posts/${id}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      const res = await axios.get(`http://localhost:8080/posts/${id}`);
      setSingle(res.data);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${id}`, {
        withCredentials: true,
      });
      alert("게시글이 삭제되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const getSingle = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/posts/${id}`);
        setSingle(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSingle();
  }, [id]);

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.left}>
          <span className={style.title}>{single.title}</span>
          <span
            onClick={() => {
              navigate(`/userprofile/${single.author.id}`);
            }}
          >
            {single.author && single.author.nickname}
          </span>
          <span>{single.createdAt && single.createdAt.replace("T", " ")}</span>
          <span
            className={style.update}
            onClick={() => navigate(`/write/${id}`, { state: { single } })}
          >
            수정
          </span>
          <span className={style.delete} onClick={handleDelete}>
            삭제
          </span>
        </div>
        <div className={style.right}>
          <span>좋아요: {single.likeCount}</span>
          <span>조회수: {single.viewCount}</span>
        </div>
      </div>
      <div className={style.body}>
        {single.imageUrls &&
          single.imageUrls.map((item, index) => (
            <img key={index} src={`http://localhost:8080${item}`} alt="" />
          ))}
        <span className={style.content}>{single.content}</span>
        <div className={style.buttonGroup}>
          {currentUser?.nickname === single.author?.nickname ? (
            ""
          ) : (
            <button onClick={handleLike}>좋아요</button>
          )}
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            목록으로
          </button>
        </div>
      </div>
      <div className={style.commentContainer}>
        <div className={style.inputContainer}>
          <textarea
            placeholder="댓글"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          <button onClick={handleCommentSubmit}>등록</button>
        </div>
        {single.comments?.map((item, index) => {
          return (
            <div className={style.comment} key={index}>
              <div className={style.left}>
                <span className={style.author}>{item.author.nickname}</span>
                <span className={style.date}>
                  {item.createdAt.replace("T", " ")}
                </span>
                {commentUpdateInputShow ? (
                  <div className={style.updateCommentInputContainer}>
                    <textarea
                      placeholder="댓글 수정"
                      value={commentUpdateValue}
                      onChange={(e) => {
                        setCommentUpdateValue(e.target.value);
                      }}
                    />
                    <div className={style.buttonContainer}>
                      <button
                        onClick={() => {
                          handleCommentUpdate(item.id);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          setCommentUpdateInputShow(false);
                        }}
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className={style.content}>{item.content}</span>
                )}
              </div>
              <div className={style.right}>
                <button
                  onClick={() => {
                    setCommentUpdateInputShow(true);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => {
                    handleCommentDelete(item.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Single;
