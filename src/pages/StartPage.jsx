import { useNavigate } from 'react-router-dom';
import '../styles/StartPage.css'; // CSS 파일 임포트

function StartPage() {
    const navigate = useNavigate();

    const handleMakeTicketClick = () => {
        navigate('/input');
    };
    return (
        <div className="start-page">

            <img
                src="/images/start-background-2.png"  
                alt="Center"
                className="background-image"
            />
            <img
                src="/images/start-background-2-ipad.png"
                alt="iPad Background"
                className="ipad-background-image"
                />

            <img
                src="/images/logo.png"  
                alt="Center"
                className="center-image"
            />

            <img
                src="/images/line.png"  
                alt="Center"
                className="line-image"
            />

            <img
                src="/images/line-ipad.png"  
                alt="Center"
                className="line-ipad-image"
            />

            <img
                src="/images/ticket-make-button.png"  
                alt="Make Ticket"
                className="make-ticket-button-image"
                onClick={handleMakeTicketClick}
                style={{ cursor: 'pointer' }}
            />

            <img
                src="/images/ticket-make-button-ipad.png"  
                alt="Make Ticket iPad"
                className="make-ticket-button-image-ipad"
                onClick={handleMakeTicketClick}
                style={{ cursor: 'pointer' }}
            />
            
            <img
             src="/images/see-ticket-button.png"  
                alt="Center"
                className="see-ticket-button-image"
            />

            <img
                src="/images/see-ticket-button-ipad.png"  
                alt="Center"
                className="make-ticket-button-image-ipad"
            />


        </div>
    );
}


export default StartPage;