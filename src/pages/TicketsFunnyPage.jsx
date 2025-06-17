import React, { useEffect, useState } from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom";
import axios from "axios";

function TicketsFunnyPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchEmotionTickets = async () => {
      try {
        const res = await axios.post("http://54.180.152.171:3000/filterImages", {
          filterStr: "개그",
        });
        setImages(res.data);
      } catch (error) {
        console.error("개그 티켓 불러오기 실패:", error);
      }
    };

    fetchEmotionTickets();
  }, []);

  return (
    <div className="funny-page">
      <div className="content-container">
        <Link to="/tickets">
          <img
            src="/images/funny-font.png"
            alt="Center"
            className="emotion-font-image"
          />
        </Link>

        <div className="ticket-image-list">
          {images.map((img) => (
            <div key={img.id} className="ticket-image-item">
              <img src={img.imageUrl} alt={`개그 티켓 ${img.id}`} />
            </div>
          ))}
        </div>

        {/* 도트는 무조건 1개 */}
        <div className="dot-container">
          <span className="dot active" />
        </div>
      </div>
    </div>
  );
}

export default TicketsFunnyPage;
