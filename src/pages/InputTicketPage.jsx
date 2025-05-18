import React from "react";
// import Button from "../components/Button";
import '../styles/InputTicketPage.css'; 


function InputTicketPage() {


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
                />

            </div>

            
            <img
                src="/images/filter-select-button.png"
                alt="샘플 이미지"
                className="button-image"
            />

            

        {/*             
            <Button onClick={handleButtonClick} size="small" variant="green">
                필터 선택 하러 가기
            </Button> */}
        </div>
    );
}

export default InputTicketPage;