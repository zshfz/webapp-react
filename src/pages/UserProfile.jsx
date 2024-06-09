import style from "../styles/UserProfile.module.scss";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Context } from "../context/Context";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState("");
  const [nicknameChangeInputShow, setNicknameChangeInputShow] = useState(false);
  const [nickname, setNickname] = useState("");

  const { currentUser, setCurrentUser } = useContext(Context);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleNicknameChange = async () => {
    try {
      await axios.post(
        "http://localhost:8080/profile/updateNickname",
        { newNickname: nickname },
        {
          withCredentials: true,
        }
      );
      const updatedUserInfo = {
        ...userInfo,
        member: { ...userInfo.member, nickname: nickname },
      };
      setUserInfo(updatedUserInfo);
      setCurrentUser({ ...currentUser, nickname: nickname });
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ ...currentUser, nickname: nickname })
      );
      setNicknameChangeInputShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (id === "내프로필") {
        try {
          const res = await axios.get("http://localhost:8080/profile", {
            withCredentials: true,
          });
          setUserInfo(res.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const res = await axios.get(`http://localhost:8080/profile/${id}`);
          setUserInfo(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getUserInfo();
  }, [id, currentUser]);

  console.log(userInfo);
  return (
    <div className={style.container}>
      <div className={style.userInfoContainer}>
        <span>
          <b>이름:</b> {userInfo.member?.name}
        </span>
        <span>
          <b className={style.bold}>닉네임:</b>{" "}
          {nicknameChangeInputShow ? (
            <div className={style.nicknameChangeContainer}>
              <input
                type="text"
                placeholder="닉네임 변경"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
              />
              <button onClick={handleNicknameChange}>변경</button>
              <button
                onClick={() => {
                  setNicknameChangeInputShow(false);
                }}
              >
                취소
              </button>
            </div>
          ) : (
            <> {userInfo && userInfo.member.nickname}</>
          )}
        </span>
        <span>
          <b className={style.bold}>이메일:</b>{" "}
          {userInfo && userInfo.member.email}
        </span>
        <div className={style.buttonContainer}>
          {currentUser?.nickname === userInfo.member?.nickname ? (
            <button
              onClick={() => {
                setNicknameChangeInputShow(true);
              }}
            >
              닉네임 변경
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={style.boardContainer}>
        <div className={style.header}>
          <span>
            <b>최근 작성한 게시물</b>
          </span>
        </div>
        <div className={style.body}>
          <Table hover>
            <thead>
              <tr>
                <th>제목</th>
                <th>작성자</th>
                <th>좋아요</th>
                <th>조회수</th>
                <th>댓글</th>
              </tr>
            </thead>
            <tbody>
              {userInfo.posts &&
                userInfo.posts.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        navigate(`/single/${item.id}`);
                      }}
                    >
                      <td>{item.title}</td>
                      <td>{item.author.nickname}</td>
                      <td>{item.likeCount}</td>
                      <td>{item.viewCount}</td>
                      <td>{item.comments.length}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
