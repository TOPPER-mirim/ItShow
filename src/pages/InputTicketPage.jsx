import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // axios 임포트
import "../styles/reset.css";
import "../styles/InputTicketPage.css";
import CustomPopup from "../components/CustomPopup";

function InputTicketPage() {
  const [worryText, setWorryText] = useState("");
  const [nickname, setNickname] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!worryText.trim()) {
      setPopupMessage("고민 내용을 입력해주세요.");
      setShowPopup(true);
      return;
    }
    if (!nickname.trim()) {
      setPopupMessage("닉네임을 입력해주세요.");
      setShowPopup(true);
      return;
    }

    try {
      // 서버에 POST 요청
      const response = await axios.post("http://54.180.152.171:3000/user", {
        name: nickname,
        content: worryText,
      });

      console.log("User created:", response.data);
      console.log("User ID:", response.data.id);
      
      sessionStorage.setItem("userId", response.data.id);

      sessionStorage.setItem("nickname", nickname);
      
      navigate("/filter");

    } catch (error) {
      console.error("Error creating user:", error);
      setPopupMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
      setShowPopup(true);
    }
  };

  return (
    <div className="input-ticket-page">
      <h1 className="title">이야기를 들려주세요!</h1>

      <div className="ticket-wrapper">
        <img
          src="/images/input-ticket.png"
          alt="샘플 이미지"
          className="main-image"
        />

        <img
          src="/images/input-ticket-ipad.png"
          alt="샘플 이미지"
          className="main-image-ipad"
        />

        <input
          type="text"
          placeholder="자신의 고민이나 하고 싶은 말을 적어주세요. (최대 200자)"
          className="worry-input"
          value={worryText}
          onChange={(e) => setWorryText(e.target.value)}
        />

        <img
          src="/images/input-line.png"
          alt="선"
          className="input-line-image"
        />

        <input
          type="text"
          placeholder="닉네임을 적어주세요."
          className="nickname-input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>

      <img
        src="/images/filter-select-button.png"
        alt="샘플 이미지"
        className="button-image"
        onClick={handleSubmit}
        style={{ cursor: "pointer" }}
      />

      <img
        src="/images/input-logo-ipad.png"
        alt="로고"
        className="logo-image"
      />

      {showPopup && (
        <CustomPopup message={popupMessage}>
          <button onClick={() => setShowPopup(false)}>확인</button>
        </CustomPopup>
      )}
    </div>
  );
}

export default InputTicketPage;
