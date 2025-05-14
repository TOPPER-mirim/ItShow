import '../styles/StartPage.css'; // CSS 파일 임포트

function StartPage() {
    return (
        <div className="start-page">
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
                src="/images/ticket-make-button.png"  
                alt="Center"
                className="make-ticket-button-image"
            />

            
            <img
             src="/images/see-ticket-button.png"  
                alt="Center"
                className="see-ticket-button-image"
            />

        </div>
    );
}


export default StartPage;