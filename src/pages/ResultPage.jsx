import React, { useState, useEffect } from 'react';
import ResultAnimation from '../components/ResultAnimation';
import "../styles/reset.css";
import "../styles/TicketView.css";

function TicketView() {
  const [capturedImageUrl, setCapturedImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const id = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchLatestTicket = async () => {
      try {
        const response = await fetch(`https://lucky-ticket.mirim-it-show.site/userImage/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCapturedImageUrl(data.imageUrl);
        }
      } catch (error) {
        console.error('티켓 이미지 로딩 중 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTicket();
  }, []);

  if (loading) return <div>티켓을 불러오는 중...</div>;

  return (
    <div className="ResTicketView">
      <img
        src="/images/연두색별.png"
        alt="왼쪽 별"
        className="sparkle sparkle-left"
      />
      <div className="ticket-circle" />
      {capturedImageUrl ? (
        <img
          src={capturedImageUrl}
          alt="captured ticket"
          className="ticketImg"
        />
      ) : (
        <div>
          <p>티켓을 불러올 수 없습니다.</p>
          <button onClick={() => window.location.href = '/make'}>
            다시 만들기
          </button>
        </div>
      )}
      <img
        src="/images/연두색빈별.png"
        alt="오른쪽 별"
        className="sparkle sparkle-right"
      />
    </div>
  );
}

function QRCodeSection() {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = sessionStorage.getItem("userId");
  
  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch(`http://54.180.152.171:3000/qrcode/${id}`);
        if (response.ok) {
          const data = await response.json();
          setQrCodeUrl(data.qrCode);
        }
      } catch (error) {
        console.error('QR 코드 로딩 중 오류:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCode();
  }, []);

  if (loading) return <div>QR 코드를 불러오는 중...</div>;

  return (
    <div className="qr-section">
      <p style={{ textAlign: "center" }}>QR 코드로 티켓 확인하기</p>
      {qrCodeUrl ? (
        <img
          src={qrCodeUrl}
          alt="QR Code"
          className="qr-code-img"
          style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: "10px", padding: "10px" }}
        />
      ) : (
        <p>QR 코드를 불러올 수 없습니다.</p>
      )}
    </div>
  );
}

function DownloadSection() {

  const handleGoBack = () => {
    window.location.href = '/';
  };

  const nickname = sessionStorage.getItem("nickname");

  return (
    <div className="download-section">
      <p className="complete-msg">🍀 {nickname}님의 티켓이 완성 되었어요! 🍀</p>
      <QRCodeSection />
      <button className="back-btn" onClick={handleGoBack}>
        돌아가기
      </button>
    </div>
  );
}

function ResultPage() {
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <div className="result-page">
      {!animationDone && (
        <ResultAnimation onComplete={() => setAnimationDone(true)} />
      )}
      {animationDone && (
        <>
          <img
            src="/images/right-circle.png"
            alt="오른쪽 위 원"
            className="corner-img right-circle"
          />
          <img
            src="/images/left-circle.png"
            alt="왼쪽 아래 원"
            className="corner-img left-circle"
          />
          <div className="ticketResContainer">
            <TicketView />
            <DownloadSection />
          </div>
        </>
      )}
    </div>
  );
}

export default ResultPage;