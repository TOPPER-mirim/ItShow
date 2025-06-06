function SinglePaletter({ imageUrl, onClick, isSelected }) {
    return (
        <div
            className={`single-paletter ${isSelected ? "selected" : ""}`}
            onClick={onClick}
        >
            <img src={imageUrl} alt="선택지" />
        </div>
    );
}

export default SinglePaletter;