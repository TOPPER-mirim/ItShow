import React, { useState, useEffect } from 'react';
import ResultAnimation from '../components/ResultAnimation';
import "../styles/reset.css";
import "../styles/TicketView.css";

function TicketView() {
    const [capturedImageUrl, setCapturedImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const imageData = sessionStorage.getItem('capturedTicket');

        if (imageData) {
            setCapturedImageUrl(imageData);
        } else {
            console.warn('캡처된 티켓 이미지를 찾을 수 없습니다.');
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>티켓을 불러오는 중...</div>;
    }

    return (
        <div className="ResTicketView">
            <img src="../images/연두색별.png" alt="green star left"/>
            <div className="ticket-circle"></div>
            {capturedImageUrl ? (
                <img src={capturedImageUrl} alt="captured ticket"  className="ticketImg" />
            ) : (
                <div>
                    <p>티켓을 불러올 수 없습니다.</p>
                    <button onClick={() => window.location.href = '/make'}>
                        다시 만들기
                    </button>
                </div>
            )}
            <img src="../images/연두색빈별.png" alt="green star right" />
        </div>
    );
}

function DownloadSection() {
    const [userName, setUserName] = useState("현서");
    const [capturedImageUrl, setCapturedImageUrl] = useState(null);

    useEffect(() => {
        // sessionStorage에서 데이터 가져오기
        const imageData = sessionStorage.getItem('capturedTicket');
        const name = sessionStorage.getItem('userName');

        if (imageData) {
            setCapturedImageUrl(imageData);
        }
        if (name) {
            setUserName(name);
        }
    }, []);

    const handleDownload = () => {
        if (!capturedImageUrl) {
            alert('다운로드할 이미지가 없습니다.');
            return;
        }

        try {
            // 캡처된 이미지 다운로드
            const link = document.createElement('a');
            link.href = capturedImageUrl;
            link.download = `${userName}_lucky_ticket.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log('티켓 다운로드 완료');
        } catch (error) {
            console.error('다운로드 오류:', error);
            alert('다운로드 중 오류가 발생했습니다.');
        }
    };

    const handleGoBack = () => {
        // sessionStorage 정리
        sessionStorage.removeItem('capturedTicket');
        sessionStorage.removeItem('userName');
        window.location.href = '/';
    };

    return (
        <div className="download-section">
            <p className="complete-msg">🍀 {userName}님의 티켓이 완성 되었어요! 🍀</p>

            <div className="download-box">
                <p>티켓 다운로드 받기</p>
                <button
                    onClick={handleDownload}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '10px'
                    }}
                    disabled={!capturedImageUrl}
                >
                    <img src="../images/qr.png" alt="다운로드" className="qr-img" />
                </button>
            </div>

            <button className="back-btn" onClick={handleGoBack}>
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
                <DownloadSection />
            </div>
        </div>
    );
}

export default ResultPage;