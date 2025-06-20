import React, { useState, useRef } from "react";
import "../styles/reset.css";
import "../styles/MakeTicketPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import TicketPreview from "../components/TicketPreview";
import MakePaletter from "../components/MakePalette";
import SinglePaletter from "../components/SinglePaletter";
import CustomPopup from "../components/CustomPopup";

const MakeTicketPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { nickname, content, filter } = location.state || {};

    // TicketPreview ref 추가
    const ticketPreviewRef = useRef(null);

    const filterMap = {
        감성: "/images/필터-감성.svg",
        가오: "/images/필터-가오.svg",
        개그: "/images/필터-개그.svg"
    };
    const logoUrl = filterMap[filter];

    const patternMap = {
        감성: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/감성-패턴${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/가오-패턴${i}.png`),
        개그: [1, 2, 3].map(i => `/images/Pattern/PatternPaletter/개그-패턴${i}.png`),
    };

    const stickerMap = {
        감성: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/감성-스티커${i}.png`),
        가오: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/가오-스티커${i}.png`),
        개그: [1, 2, 3].map(i => `/images/Sticker/StickerPaletter/개그-스티커${i}.png`),
    };

    const backgroundColorMap = {
        감성: "#BDDDF7",
        가오: "#D9D9D9",
        개그: "#FFE88E",
    };

    const patternStyleMap = {
        "감성-패턴1": {
            image: "/images/Pattern/감성-패턴1.png",
            textColor: "#C10100",
            fontFamily: "Cafe24ClassicType-Regular",
            ticketLogoImg: "/images/LogoImg/감성-logo1(갈색).png",
            layoutColor: "#C10100"
        },
        "감성-패턴2": {
            image: "/images/Pattern/감성-패턴2.png",
            textColor: "#05361A",
            fontFamily: "YClover-Bold",
            ticketLogoImg: "/images/LogoImg/감성-logo2(그린).png",
            layoutColor: "#05361A"
        },
        "감성-패턴3": {
            image: "/images/Pattern/감성-패턴3.png",
            textColor: "#73A8D3",
            fontFamily: "ghanachoco",
            ticketLogoImg: "/images/LogoImg/감성-logo3(골드).png",
            layoutColor: "#73A8D3"
        },
        "가오-패턴1": {
            image: "/images/Pattern/가오-패턴1.png",
            textColor: "#FFFFFF",
            fontFamily: "LOTTERIADDAG",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
            layoutColor: "#FFFFFF"
        },
        "가오-패턴2": {
            image: "/images/Pattern/가오-패턴2.png",
            textColor: "#FFFFFF",
            fontFamily: "SeoulHangangM",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
            layoutColor: "#FFFFFF"
        },
        "가오-패턴3": {
            image: "/images/Pattern/가오-패턴3.png",
            textColor: "#FFFFFF",
            fontFamily: "SeoulHangangM",
            ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png",
            layoutColor: "#FFFFFF"
        },
        "개그-패턴1": {
            image: "/images/Pattern/개그-패턴1.png",
            textColor: "#000000",
            fontFamily: "GothicA1-Light",
            ticketLogoImg: "/images/LogoImg/개그-logo1(노랑).png",
            layoutColor: "#000000"
        },
        "개그-패턴2": {
            image: "/images/Pattern/개그-패턴2.png",
            textColor: "#FFFFFF",
            fontFamily: "YoonChildfundkoreaManSeh",
            ticketLogoImg: "/images/LogoImg/개그-logo1(노랑).png",
            layoutColor: "#FFFFFF"
        },
        "개그-패턴3": {
            image: "/images/Pattern/개그-패턴3.png",
            textColor: "#E14F36",
            fontFamily: "GothicA1-Light",
            ticketLogoImg: "/images/LogoImg/개그-logo2(오렌지).png",
            layoutColor: "#E14F36"
        },
    };

    const [selectedFrame, setSelectedFrame] = useState(1);
    const [fillColor, setFillColor] = useState(backgroundColorMap[filter]);
    const [patternUrl, setPatternUrl] = useState(null);
    const [textColor, setTextColor] = useState("#324400");
    const [fontFamily, setFontFamily] = useState("Pretendard-Regular");
    const [selectedStickers, setSelectedStickers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [saveToBook, setSaveToBook] = useState(false);
    const [ticketLogoImg, setTicketLogoImg] = useState("/images/Ticketlogo.png");
    const [layoutColor, setLayoutColor] = useState("#324400");

    // 이미지 압축 함수 추가
    const compressImage = (dataUrl, quality = 0.7, maxWidth = 800) => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // 최대 크기 제한
                let { width, height } = img;
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                // 이미지 그리기
                ctx.drawImage(img, 0, 0, width, height);

                // 압축된 이미지 반환 (JPEG로 변환하여 용량 감소)
                const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedDataUrl);
            };

            img.src = dataUrl;
        });
    };

    // 데이터 크기 확인 함수
    const getDataSize = (base64String) => {
        // base64 문자열의 실제 바이트 크기 계산
        const base64Length = base64String.length;
        const sizeInBytes = (base64Length * 3) / 4;
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return { bytes: sizeInBytes, mb: sizeInMB };
    };

    const handleFrameClick = (frameNumber) => setSelectedFrame(frameNumber);

    const handleStickerClick = (url) => {
        setSelectedStickers(prev => [
            ...prev,
            {
                id: Date.now(), url, x: 50, y: 50, scale: 1,
                rotation: 0
            }
        ]);
    };

    const handlePatternClick = (thumbUrl, idx) => {
        const patternKey = `${filter}-패턴${idx + 1}`;
        const patternStyle = patternStyleMap[patternKey];

        if (patternStyle) {
            setPatternUrl(patternStyle.image);
            setTextColor(patternStyle.textColor);
            setFontFamily(patternStyle.fontFamily);
            setTicketLogoImg(patternStyle.ticketLogoImg);
            setLayoutColor(patternStyle.layoutColor);
            setFillColor("transparent");
        }
    };

    const handleColorClick = (color, ticketLogoImg, layoutColor, textColor) => {
        setFillColor(color);
        setPatternUrl(null);
        setFontFamily(null);
        setTicketLogoImg(ticketLogoImg);
        setLayoutColor(layoutColor);
        setTextColor(textColor);
    };

    const handleSubmit = async () => {
        try {
            // 원본 이미지 캡처
            const originalDataUrl = await ticketPreviewRef.current?.captureTicket();
            if (!originalDataUrl) {
                alert("티켓 캡처에 실패했습니다.");
                return;
            }

            // 원본 크기 체크
            const originalBase64 = originalDataUrl.replace(/^data:image\/[a-z]+;base64,/, "");
            const originalSize = getDataSize(originalBase64);

            console.log(`원본 이미지 크기: ${originalSize.mb.toFixed(2)}MB`);

            // 무조건 압축 시작 (더 안전하게)
            console.log("이미지 압축을 시작합니다.");

            // 첫 번째 압축: 품질 0.5, 최대폭 600px
            let finalDataUrl = await compressImage(originalDataUrl, 0.5, 600);
            let compressedBase64 = finalDataUrl.replace(/^data:image\/[a-z]+;base64,/, "");
            let compressedSize = getDataSize(compressedBase64);

            console.log(`1차 압축: ${compressedSize.mb.toFixed(2)}MB (품질: 0.5, 최대폭: 600px)`);

            // 여전히 1MB 이상이면 더 압축
            if (compressedSize.mb > 1) {
                console.log("추가 압축을 진행합니다.");
                finalDataUrl = await compressImage(originalDataUrl, 0.3, 400);
                compressedBase64 = finalDataUrl.replace(/^data:image\/[a-z]+;base64,/, "");
                compressedSize = getDataSize(compressedBase64);
                console.log(`2차 압축: ${compressedSize.mb.toFixed(2)}MB (품질: 0.3, 최대폭: 400px)`);
            }

            // 최종 base64 데이터 추출
            const base64Data = compressedBase64;
            const finalSize = getDataSize(base64Data);
            console.log(`최종 전송 크기: ${finalSize.mb.toFixed(2)}MB`);

            // 여전히 너무 크면 경고
            if (finalSize.mb > 1.5) {
                console.warn("이미지가 여전히 큽니다. 업로드가 실패할 수 있습니다.");
            }

            const id = sessionStorage.getItem("userId");

            // 서버로 전송
            const response = await fetch("https://lucky-ticket.mirim-it-show.site/upload", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: id,
                    image: base64Data
                }),
            });

            if (!response.ok) {
                // 413 에러 발생시 초압축 시도
                if (response.status === 413) {
                    console.log("413 에러 발생. 초압축을 시도합니다.");

                    // 최강 압축 (품질 0.2, 최대폭 300px)
                    const ultraCompressed = await compressImage(originalDataUrl, 0.2, 300);
                    const ultraBase64 = ultraCompressed.replace(/^data:image\/[a-z]+;base64,/, "");
                    const ultraSize = getDataSize(ultraBase64);

                    console.log(`초압축 크기: ${ultraSize.mb.toFixed(2)}MB`);

                    // 재시도
                    const retryResponse = await fetch("https://lucky-ticket.mirim-it-show.site/upload", {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            userId: id,
                            image: ultraBase64
                        }),
                    });

                    if (!retryResponse.ok) {
                        throw new Error(`HTTP error! status: ${retryResponse.status}`);
                    }

                    const result = await retryResponse.json();
                    console.log("초압축 업로드 성공:", result);

                    navigate('/result', {
                        state: {
                            nickname: nickname,
                            content,
                            filter,
                            ticketData: result,
                            saveToBook,
                            ticketImage: ultraCompressed
                        }
                    });
                    return;
                }

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("업로드 성공:", result);

            navigate('/result', {
                state: {
                    nickname: nickname,
                    content,
                    filter,
                    ticketData: result,
                    saveToBook,
                    ticketImage: finalDataUrl
                }
            });

        } catch (error) {
            console.error("백엔드 업로드 중 오류:", error);

            if (error.message.includes('413')) {
                alert("이미지 크기가 너무 큽니다. 잠시 후 다시 시도해주세요.");
            } else {
                alert("티켓 업로드에 실패했습니다.");
            }
        }
    };

    const getBackgroundOpacity = () => {
        if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
            return '80';
        }
        return '';
    };

    return (
        <div
            className="makeTicket-container"
            style={{
                width: "100vw",
                background: `linear-gradient(to bottom, ${backgroundColorMap[filter]}${getBackgroundOpacity()}, transparent)`
            }}
        >
            {showPopup && (
                <CustomPopup message="정말 티켓을 발행하시겠습니까?">
                    <p className="popup-content-text">발행 이후로 변경하실 수 없어요!</p>
                    <div className="button-container">
                        <Button size="mini" variant="green" onClick={handleSubmit}>
                            티켓 발행하기
                        </Button>
                        <Button size="mini" variant="empty" onClick={() => setShowPopup(false)}>
                            좀 더 생각해보기
                        </Button>
                    </div>
                </CustomPopup>
            )}
            <div className="ticket-preview-wrapper">
                <TicketPreview
                    ref={ticketPreviewRef}
                    logoImgUrl={logoUrl}
                    fillColor={fillColor}
                    frameIndex={selectedFrame}
                    patternUrl={patternUrl}
                    textColor={textColor}
                    fontFamily={fontFamily}
                    stickers={selectedStickers}
                    onStickerUpdate={setSelectedStickers}
                    filter={filter}
                    ticketLogoImg={ticketLogoImg}
                    layoutColor={layoutColor}
                />
            </div>

            <div className="paletter-container">
                <MakePaletter title="프레임">
                    {[1, 2, 3].map(i => (
                        <SinglePaletter
                            key={i}
                            imageUrl={`/images/프레임${i}.png`}
                            onClick={() => handleFrameClick(i)}
                            isSelected={selectedFrame === i}
                        />
                    ))}
                </MakePaletter>

                <MakePaletter title="단색 배경" className="color-palette">
                    <div className="singleColorPaletter">
                        {[
                            { color: backgroundColorMap[filter], img: "none.svg", ticketLogoImg: "/images/Ticketlogo.png", layoutColor: "#324400", textColor: "#324400" },
                            { color: "#FFC1C1", img: "pink.png", ticketLogoImg: "/images/LogoImg/감성-logo1(갈색).png", layoutColor: "#B47037", textColor: "#B47037" },
                            { color: "#FEC730", img: "yellow.png", ticketLogoImg: "/images/LogoImg/감성-logo1(갈색).png", layoutColor: "#B47037", textColor: "#B47037" },
                            { color: "#9CD69D", img: "green.png", ticketLogoImg: "/images/LogoImg/감성-logo2(그린).png", layoutColor: "#324400", textColor: "#324400" },
                            { color: "#DFECF2", img: "babyblue.png", ticketLogoImg: "/images/LogoImg/감성-logo1(갈색).png", layoutColor: "#B47037", textColor: "#B47037" },
                            { color: "#225268", img: "blue.png", ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png", layoutColor: "#FFFCF7", textColor: "#FFFCF7" },
                            { color: "#000000", img: "black.png", ticketLogoImg: "/images/LogoImg/가오-logo1(화이트).png", layoutColor: "#FFFCF7", textColor: "#FFFCF7" }
                        ].map(({ color, img, ticketLogoImg, layoutColor, textColor }) => (
                            <SinglePaletter
                                key={color}
                                imageUrl={`/images/${img}`}
                                onClick={() => handleColorClick(color, ticketLogoImg, layoutColor, textColor)}
                                isSelected={fillColor === color && patternUrl === null}
                            />
                        ))}
                    </div>
                </MakePaletter>

                <MakePaletter title="패턴 배경">
                    <SinglePaletter
                        imageUrl="/images/none.svg"
                        onClick={() => {
                            setPatternUrl(null);
                            setTextColor("#324400");
                            setFillColor(backgroundColorMap[filter]);
                            setFontFamily("Pretendard-Regular");
                            setLayoutColor("#324400");
                        }}
                        isSelected={patternUrl === null}
                    />
                    {(patternMap[filter] || []).map((thumbUrl, idx) => {
                        const patternKey = `${filter}-패턴${idx + 1}`;
                        const patternStyle = patternStyleMap[patternKey];
                        const isSelected = patternUrl === patternStyle?.image;

                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handlePatternClick(thumbUrl, idx)}
                                isSelected={isSelected}
                            />
                        );
                    })}
                </MakePaletter>

                <MakePaletter title="스티커">
                    <SinglePaletter
                        imageUrl="/images/none.svg"
                        onClick={() => setSelectedStickers([])}
                        isSelected={selectedStickers.length === 0}
                    />
                    {(stickerMap[filter] || []).map((thumbUrl, idx) => {
                        const appliedUrl = thumbUrl.replace("/StickerPaletter/", "/");
                        const isSelected = selectedStickers.some(s => s.url === appliedUrl);
                        return (
                            <SinglePaletter
                                key={idx}
                                imageUrl={thumbUrl}
                                onClick={() => handleStickerClick(appliedUrl)}
                                isSelected={isSelected}
                            />
                        );
                    })}
                </MakePaletter>

                <div className="ticketConfirmBox">
                    <label className="customCheckbox">
                        <input
                            type="checkbox"
                            name="ticketBookOk"
                            checked={saveToBook}
                            onChange={(e) => setSaveToBook(e.target.checked)}
                        />
                        <span className="checkmark"></span>
                        <p>티켓북에 저장하시겠습니까?</p>
                    </label>

                    <Button size="big" onClick={() => setShowPopup(true)}>
                        럭키 티켓 출력하기
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MakeTicketPage;