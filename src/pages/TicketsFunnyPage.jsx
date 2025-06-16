import React, { useEffect, useState } from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom";
import axios from "axios";

function TicketsFunnyPage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchFunnyTickets = async () => {
            try {
                const res = await axios.post("http://54.180.152.171:3000/filterImages", {
                    filterStr: "개그",
                });
                setImages(res.data);
            } catch (error) {
                console.error("개그 티켓 불러오기 실패:", error);
            }
        };

        fetchFunnyTickets();
    }, []);

    return (
        <div className="funny-page">
            <div className="content-container">
                <Link to="/tickets">
                    <img
                        src="/images/funny-font.png"
                        alt="Funny"
                        className="funny-font-image"
                    />
                </Link>

                <div className="ticket-image-list">
                    {images.map((img) => (
                        <div key={img.id} className="ticket-image-item">
                            <img src={img.imageUrl} alt={`개그 티켓 ${img.id}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketsFunnyPage;
