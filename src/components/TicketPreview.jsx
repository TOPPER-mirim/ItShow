import React, {
    useState, useRef, useImperativeHandle, forwardRef, useEffect
} from "react";
import "../styles/TicketPreview.css";

import Frame1 from "../components/Frame1";
import Frame2 from "../components/Frame2";
import Frame3 from "../components/Frame3";

import * as htmlToImage from 'html-to-image';

const TicketPreview = forwardRef(({
    logoImgUrl,
    fillColor,
    frameIndex,
    patternUrl,
    textColor = "#000000", // 기본 텍스트 색상
    fontFamily = "Pretendard", // 기본 글꼴
    stickers = [],
    onStickerUpdate
}, ref) => {
    const [selectedStickerId, setSelectedStickerId] = useState(null);
    const [draggedStickerId, setDraggedStickerId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizingStickerId, setResizingStickerId] = useState(null);
    const [patternDataUrl, setPatternDataUrl] = useState(null);

    const frameRef = useRef(null);

    const getFrameComponent = (index) => {
        const commonProps = { fillColor, patternUrl: patternDataUrl || patternUrl };
        switch (index) {
            case 1: return <Frame1 {...commonProps} />;
            case 2: return <Frame2 {...commonProps} />;
            case 3: return <Frame3 {...commonProps} />;
            default: return <Frame1 {...commonProps} />;
        }
    };

    useEffect(() => {
        const convertToDataURL = async () => {
            if (!patternUrl) return setPatternDataUrl(null);
            try {
                const res = await fetch(patternUrl, {
                    mode: "cors",
                    headers: { 'Accept': 'image/*' }
                });
                const blob = await res.blob();
                const reader = new FileReader();
                reader.onloadend = () => setPatternDataUrl(reader.result);
                reader.onerror = () => setPatternDataUrl(null);
                reader.readAsDataURL(blob);
            } catch {
                setPatternDataUrl(null);
            }
        };
        convertToDataURL();
    }, [patternUrl]);

    useImperativeHandle(ref, () => ({
        captureTicket: async () => {
            try {
                if (!frameRef.current) return null;

                const contentContainer = frameRef.current.querySelector('.content-container');
                const originalPosition = contentContainer?.style.position || '';

                if (contentContainer) {
                    contentContainer.style.position = 'relative';
                }

                await new Promise(r => setTimeout(r, 300));
                const images = frameRef.current.querySelectorAll('img');
                await Promise.all(Array.from(images).map(img =>
                    img.complete ? Promise.resolve() : new Promise(resolve => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    })
                ));

                const rect = frameRef.current.getBoundingClientRect();
                const dataUrl = await htmlToImage.toPng(frameRef.current, {
                    cacheBust: true,
                    useCORS: true,
                    allowTaint: true,
                    width: Math.max(rect.width, frameRef.current.scrollWidth),
                    height: Math.max(rect.height, frameRef.current.scrollHeight),
                    pixelRatio: 2
                });

                if (contentContainer) contentContainer.style.position = originalPosition || 'fixed';

                return dataUrl;
            } catch (err) {
                console.error('티켓 캡처 오류:', err);
                return null;
            }
        },

        // 기존 captureAndNavigate 메서드 유지 (호환성을 위해)
        captureAndNavigate: async (userName = "현서") => {
            try {
                const dataUrl = await this.captureTicket();
                if (dataUrl) {
                    sessionStorage.setItem('capturedTicket', dataUrl);
                    sessionStorage.setItem('userName', userName);
                    window.location.href = '/result';
                }
            } catch (err) {
                alert('티켓 캡처에 실패했습니다.');
            }
        }
    }));

    const handleStickerClick = (e, id) => {
        e.stopPropagation();
        setSelectedStickerId(id);
    };

    const handleMouseDown = (e, sticker) => {
        e.stopPropagation();
        const rect = e.target.getBoundingClientRect();
        setDraggedStickerId(sticker.id);
        setDragOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleTouchStart = (e, sticker) => {
        const touch = e.touches[0];
        const rect = e.target.getBoundingClientRect();
        setDraggedStickerId(sticker.id);
        setDragOffset({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    };

    const moveSticker = (clientX, clientY) => {
        const frameRect = frameRef.current.getBoundingClientRect();
        const x = clientX - frameRect.left - dragOffset.x;
        const y = clientY - frameRect.top - dragOffset.y;
        const boundedX = Math.max(0, Math.min(x, frameRect.width - 40));
        const boundedY = Math.max(0, Math.min(y, frameRect.height - 40));
        onStickerUpdate(prev =>
            prev.map(sticker =>
                sticker.id === draggedStickerId
                    ? { ...sticker, x: boundedX, y: boundedY }
                    : sticker
            )
        );
    };

    const handleMouseMove = (e) => {
        if (draggedStickerId) moveSticker(e.clientX, e.clientY);
        if (resizingStickerId) handleResize(e.clientX);
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        if (draggedStickerId) moveSticker(touch.clientX, touch.clientY);
        if (resizingStickerId) handleResize(touch.clientX);
    };

    const handleMouseUp = () => {
        setDraggedStickerId(null);
        setResizingStickerId(null);
    };

    const handleTouchEnd = () => {
        setDraggedStickerId(null);
        setResizingStickerId(null);
    };

    const handleStickerDoubleClick = (e, id) => {
        e.stopPropagation();
        onStickerUpdate(prev => prev.filter(sticker => sticker.id !== id));
    };

    const startResizing = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        setResizingStickerId({ id, startX: e.clientX });
    };

    const handleResize = (currentX) => {
        if (!resizingStickerId) return;
        const deltaX = currentX - resizingStickerId.startX;
        const id = resizingStickerId.id;
        onStickerUpdate(prev =>
            prev.map(sticker =>
                sticker.id === id
                    ? {
                        ...sticker,
                        scale: Math.max(0.3, Math.min((sticker.scale || 1) + deltaX / 100, 2))
                    }
                    : sticker
            )
        );
        setResizingStickerId({ ...resizingStickerId, startX: currentX });
    };

    const frameComponent = getFrameComponent(frameIndex);

    // 텍스트 스타일 객체 생성
    const textStyle = {
        color: textColor,
        fontFamily: fontFamily,
    };

    return (
        <div
            className="ticket-preview-container"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="preview-title-container">
                <p className="preview-text">나만의 럭키티켓을 만들어 봐요!</p>
                <img src={logoImgUrl} alt="이모지 아이콘" className="emoji-icon" />
            </div>

            <div className="ticket-frame" onClick={() => setSelectedStickerId(null)} ref={frameRef}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
                    {frameComponent}
                </div>

                <div className="content-container">
                    <div className="content-left">
                        <img src="../images/Ticketlogo.png" alt="LuckTicket" className="logo" />
                        <div className="ai-text" style={textStyle}>
                            지금 이 순간, 너에게 닿고 싶은 마음이 온 우주를 울려.
                        </div>
                        <div className="user-text" style={textStyle}>
                            선우야, 나 진짜 많이 보고 싶어.
                        </div>
                        <div className="name" style={textStyle}>
                            나지은
                        </div>
                    </div>
                    <div className="content-right">
                        <div className="month-day-container">
                            <div className="month" style={textStyle}>FRIDAY</div>
                            <div className="day" style={textStyle}>JUNE</div>
                        </div>
                        <div className="days" style={textStyle}>6</div>
                        <div className="year-hour-container">
                            <div className="year" style={textStyle}>2025</div>
                            <div className="hour" style={textStyle}>20:47 PM</div>
                        </div>
                    </div>
                </div>

                {stickers.map((sticker) => {
                    const isSelected = selectedStickerId === sticker.id;
                    return (
                        <div
                            key={sticker.id}
                            className="ticket-sticker"
                            onMouseDown={(e) => handleMouseDown(e, sticker)}
                            onTouchStart={(e) => handleTouchStart(e, sticker)}
                            onClick={(e) => handleStickerClick(e, sticker.id)}
                            onDoubleClick={(e) => handleStickerDoubleClick(e, sticker.id)}
                            style={{
                                position: "absolute",
                                left: `${sticker.x}px`,
                                top: `${sticker.y}px`,
                                transform: `scale(${sticker.scale || 1})`,
                                transformOrigin: "center center",
                                width: "40px",
                                height: "40px",
                                userSelect: "none",
                                touchAction: "none",
                                zIndex: 1000,
                                border: isSelected ? "1px dashed #1da1f2" : "none"
                            }}
                        >
                            <img
                                src={sticker.url}
                                alt="스티커"
                                style={{ width: "100%", height: "100%", pointerEvents: "none" }}
                                draggable={false}
                            />
                            {isSelected && (
                                <div
                                    className="resize-handle bottom-right"
                                    onMouseDown={(e) => startResizing(e, sticker.id)}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});

export default TicketPreview;