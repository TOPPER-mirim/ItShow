import React, { useEffect, useState } from "react";
import '../styles/Tickets.css';
import { Link } from "react-router-dom";
import axios from "axios";

function TicketsStylePage() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchStyleTickets = async () => {
            try {
                const res = await axios.post("http://54.180.152.171:3000/filterImages", {
                    filterStr: "가오",
                });
                setImages(res.data);
            } catch (error) {
                console.error("가오 티켓 불러오기 실패:", error);
            }
        };

        fetchStyleTickets();
    }, []);

    return (
        <div className="style-page">
            <div className="content-container">
                <Link to="/tickets">
                    <img
                        src="/images/style-font.png"
                        alt="Style"
                        className="style-font-image"
                    />
                </Link>

                <div className="ticket-image-list">
                    {images.map((img) => (
                        <div key={img.id} className="ticket-image-item">
                            <img src={img.imageUrl} alt={`가오 티켓 ${img.id}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TicketsStylePage;
