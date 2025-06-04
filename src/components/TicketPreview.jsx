import React, { useState, useRef, useImperativeHandle, forwardRef } from "react";
import "../styles/TicketPreview.css";

import Frame1 from "../components/Frame1";
import Frame2 from "../components/Frame2";
import Frame3 from "../components/Frame3";

import * as htmlToImage from 'html-to-image';

const TicketPreview = forwardRef(({ logoImgUrl, fillColor, frameIndex, patternUrl, stickers = [], onStickerUpdate }, ref) => {
    const [isClicked, setIsClicked] = useState(false);
    const [draggedStickerId, setDraggedStickerId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const frameRef = useRef(null);

    const getFrameComponent = (index) => {
        const commonProps = { fillColor, patternUrl };
        switch (index) {
            case 1: return <Frame1 {...commonProps} />;
            case 2: return <Frame2 {...commonProps} />;
            case 3: return <Frame3 {...commonProps} />;
            default: return <Frame1 {...commonProps} />;
        }
    };

    // 캡처 함수 외부에 노출
    useImperativeHandle(ref, () => ({
        captureTicket: async () => {
            if (!frameRef.current) return null;

            try {
                const dataUrl = await htmlToImage.toPng(frameRef.current, {
                    cacheBust: true,
                    backgroundColor: null
                });
                return dataUrl;
            } catch (err) {
                console.error("티켓 저장 실패:", err);
                return null;
            }
        }
    }));

    const handleToggleColor = (e) => {
        if (!e.target.closest('.ticket-sticker') && draggedStickerId === null) {
            setIsClicked((prev) => !prev);
        }
    };

    const handleMouseDown = (e, sticker) => {
        e.stopPropagation();
        const stickerRect = e.target.getBoundingClientRect();
        const offsetX = e.clientX - stickerRect.left;
        const offsetY = e.clientY - stickerRect.top;
        setDraggedStickerId(sticker.id);
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleMouseMove = (e) => {
        if (draggedStickerId === null) return;

        const frameRect = frameRef.current.getBoundingClientRect();
        const x = e.clientX - frameRect.left - dragOffset.x;
        const y = e.clientY - frameRef.current.getBoundingClientRect().top - dragOffset.y;

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

    const handleMouseUp = () => {
        setDraggedStickerId(null);
    };

    const handleStickerDoubleClick = (e, stickerId) => {
        e.stopPropagation();
        onStickerUpdate(prev => prev.filter(sticker => sticker.id !== stickerId));
    };

    const handleWheel = (e, sticker) => {
        e.stopPropagation();
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        const newScale = Math.max(0.3, Math.min((sticker.scale || 1) + delta, 2));

        onStickerUpdate(prev =>
            prev.map(s =>
                s.id === sticker.id
                    ? { ...s, scale: newScale }
                    : s
            )
        );
    };

    const frameComponent = getFrameComponent(frameIndex);

    return (
        <div
            className="ticket-preview-container"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="preview-title-container">
                <p className="preview-text">나만의 럭키티켓을 만들어 봐요!</p>
                <img src={logoImgUrl} alt="이모지 아이콘" className="emoji-icon" />
            </div>

            <div
                className="ticket-frame"
                onClick={handleToggleColor}
                ref={frameRef}
                style={{
                    position: "relative",
                    overflow: "hidden",
                    minHeight: "300px",
                    minWidth: "200px",
                    backgroundColor: draggedStickerId ? "rgba(0, 123, 255, 0.1)" : "transparent"
                }}
            >
                <div style={{ position: "relative", zIndex: 1 }}>{frameComponent}</div>

                {stickers.map((sticker) => (
                    <div
                        key={sticker.id}
                        className="ticket-sticker"
                        onMouseDown={(e) => handleMouseDown(e, sticker)}
                        onDoubleClick={(e) => handleStickerDoubleClick(e, sticker.id)}
                        onWheel={(e) => handleWheel(e, sticker)}
                        style={{
                            position: "absolute",
                            left: `${sticker.x}px`,
                            top: `${sticker.y}px`,
                            cursor: "grab",
                            zIndex: 1000,
                            transform: `scale(${sticker.scale || 1})`,
                            transformOrigin: "center center",
                            userSelect: "none"
                        }}
                    >
                        <img
                            src={sticker.url}
                            alt="스티커"
                            style={{
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none",
                                userSelect: "none",
                                display: "block"
                            }}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

export default TicketPreview;
