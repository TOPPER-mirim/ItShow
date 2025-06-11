import ResultAnimation from '../components/ResultAnimation';
import "../styles/reset.css";

function TicketView() {
    return (
        <div className="ResTicketView">
            <img src="../images/연두색별.png" alt="green star left" />
            <img src="ticket" alt="dbticket" className="ticket-img" />
            <img src="../images/연두색빈별.png" alt="green star right" />
        </div>
    );
}

function DownloadSection({ userName }) {
    return (
        <div className="download-section">
            <p className="complete-msg">🍀 {userName}님의 티켓이 완성 되었어요! 🍀</p>

            <div className="download-box">
                <p>티켓 다운로드 받기</p>
                <img src="../images/qr.png" alt="QR 코드" className="qr-img" />
            </div>

            <button className="back-btn" onClick={() => window.location.href = '/'}>
                돌아가기
            </button>
        </div>
    );
}

function ResultPage() {
    return (
        <div className="result-page">
            <ResultAnimation />

            <div className="ticketResContainer">
                <TicketView />
                <DownloadSection userName="현서" />
            </div>
        </div>
    );
}

export default ResultPage;