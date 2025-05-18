import React, { useState } from "react";
// import Button from "../components/Button";
import '../styles/InputTicketPage.css'; 


function InputTicketPage() {

    const [worryText, setWorryText] = useState("");
    const [nickname, setNickname] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = () => {
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
                    className="line-image"
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
                style={{ cursor: "pointer" }} // 클릭 가능하도록 설정
            />

            

        {/*             
            <Button onClick={handleButtonClick} size="small" variant="green">
                필터 선택 하러 가기
            </Button> */}
{showPopup && (
    <div className="custom-popup">
        <div className="popup-content">
            <img src="/images/warning-icon.png" alt="경고 아이콘" className="popup-image" />
            <p className="popup-text">{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>확인</button>
        </div>
    </div>
)}

        </div>
    );
}

export default InputTicketPage;