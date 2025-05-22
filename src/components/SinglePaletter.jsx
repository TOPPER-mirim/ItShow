function SinglePaletter({ imageUrl, onClick }) {
    return (
        <div className="single-paletter" onClick={onClick}>
            <img src={imageUrl} alt="선택지" />
        </div>
    );
}

export default SinglePaletter;