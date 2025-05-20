import { useNavigate } from "react-router-dom";
import "../styles/reset.css";
import "../styles/ViewTicketPage.css";
import FilterSelect from "../components/FilterSelect";

function ViewTicketsPage() {
    const navigate = useNavigate();

    const handleFilterClick = (filterType) => {
        console.log(`선택한 필터: ${filterType}`);
        // 필요 시 추가 기능
    };

    const handleBackClick = () => {
        navigate("/"); // 홈으로 이동
    };

    // title을 JSX로 만들어서 넘겨줌
    const titleWithBack = (
        <>
            <span className="back-arrow" onClick={handleBackClick}>&lt;</span>{" "}
            보고 싶은 티켓북을 선택해주세요!
        </>
    );

    return (
        <div className="container">
            <img
                src="/images/filter-page-back-icon.svg"
                alt="Left Wing"
                className="side-image left"
            />
            <div className="center-box">
                <FilterSelect
                    title={titleWithBack}
                    subtitle="설명을 읽고 어떤 필터를 사용할지 고민해 보세요!"
                    onFilterClick={handleFilterClick}
                />
            </div>
            <img
                src="/images/filter-page-back-icon.svg"
                alt="Right Wing"
                className="side-image right"
            />
        </div>
    );
}

export default ViewTicketsPage;
