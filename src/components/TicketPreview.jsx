import React, {
	useState, useRef, useImperativeHandle, forwardRef, useEffect
} from "react";
import "../styles/TicketPreview.css";

import Frame1 from "../components/Frame1";
import Frame2 from "../components/Frame2";
import Frame3 from "../components/Frame3";

import GamLayout from "../components/GamLayout";
import GaoLayout from "../components/GaoLayout";
import FunnyLayout from "../components/FunnyLayout";


import * as htmlToImage from 'html-to-image';

const TicketPreview = forwardRef(({
	logoImgUrl,
	fillColor,
	frameIndex,
	patternUrl,
	textColor = "#000000",
	fontFamily = "Pretendard",
	stickers = [],
	onStickerUpdate,
	filter,
	ticketLogoImg,
	layoutColor
}, ref) => {
	// State 선언
	const [selectedStickerId, setSelectedStickerId] = useState(null);
	const [draggedStickerId, setDraggedStickerId] = useState(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [resizingStickerId, setResizingStickerId] = useState(null);
	const [patternDataUrl, setPatternDataUrl] = useState(null);
	const [aiText, setAiText] = useState("ai생성글 입니다.");
	const [userInfo, setUserInfo] = useState(null);

	const frameRef = useRef(null);

	// 프레임 컴포넌트 선택
	const getFrameComponent = (index) => {
		const commonProps = { fillColor, patternUrl: patternDataUrl || patternUrl };
		switch (index) {
			case 1: return <Frame1 {...commonProps} />;
			case 2: return <Frame2 {...commonProps} />;
			case 3: return <Frame3 {...commonProps} />;
			default: return <Frame1 {...commonProps} />;
		}
	};

	const filterLayoutMap = {
		감성: "../images/LayOutImg/감성-레이아웃.svg",
		가오: "../images/LayOutImg/가오-레이아웃.svg",
		개그: "../images/LayOutImg/개그-레이아웃.svg"
	}

	const id = sessionStorage.getItem("userId");

	// 패턴 URL을 Data URL로 변환
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

	// AI 텍스트 가져오기
	useEffect(() => {
		const fetchAiText = async () => {
			try {
				const response = await fetch(`http://54.180.152.171:3000/getRewriting/${id}`);
				if (!response.ok) throw new Error("서버 응답 오류");

				const data = await response.json();
				if (data && data.reContent) {
					setAiText(data.reContent);
				}
			} catch (error) {
				console.error("AI 문장 불러오기 실패:", error);
			}
		};

		fetchAiText();
	}, []);

	// 사용자 정보 가져오기
	useEffect(() => {
		console.log("sessionStorage에서 가져온 userId:", id);
		if (!id) return;

		fetch(`http://54.180.152.171:3000/user/${id}`)
			.then((res) => res.json())
			.then((data) => setUserInfo(data))
			.catch((err) => console.error("유저 정보 불러오기 실패:", err));
	}, []);

	// API에서 받아온 createdAt 데이터를 이용한 날짜/시간 정보 생성
	const getDateTimeFromAPI = (createdAt) => {
		if (!createdAt) return {
			dayOfWeek: 'LOADING',
			month: 'LOADING',
			day: '0',
			year: '0000',
			time: '00:00 AM'
		};

		const date = new Date(createdAt);
		const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
		const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

		return {
			dayOfWeek: days[date.getDay()],
			month: months[date.getMonth()],
			day: date.getDate(),
			year: date.getFullYear(),
			time: date.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit',
				hour12: true
			})
		};
	};

	const dateTime = getDateTimeFromAPI(userInfo?.createdAt);

	// ref 메서드 정의
	useImperativeHandle(ref, () => ({
		captureTicket: async () => {
			try {
				if (!frameRef.current) return null;

				const contentContainer = frameRef.current.querySelector('.content-container');
				let originalStyle = {};

				if (contentContainer) {
					originalStyle = {
						position: contentContainer.style.position,
						top: contentContainer.style.top,
						left: contentContainer.style.left,
						width: contentContainer.style.width,
						height: contentContainer.style.height
					};

					const frameRect = frameRef.current.getBoundingClientRect();
					contentContainer.style.position = "absolute";
					contentContainer.style.top = "0px";
					contentContainer.style.left = "0px";
					contentContainer.style.width = `${frameRect.width}px`;
					contentContainer.style.height = `${frameRect.height}px`;
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

				if (contentContainer) {
					Object.assign(contentContainer.style, originalStyle);
				}

				return dataUrl;
			} catch (err) {
				console.error('티켓 캡처 오류:', err);
				return null;
			}
		},

		captureAndNavigate: async (userName = "사용자") => {
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

	// 스티커 이벤트 핸들러
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

	// 스타일 객체
	const textStyle = {
		color: textColor,
		fontFamily: fontFamily,
	};

	const frameComponent = getFrameComponent(frameIndex);

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
				<div className="ticket-frame-inner">
					{frameComponent}

					{filter === "감성" && (
						<GamLayout
							filter={filter}
							textStyle={textStyle}
							filterLayout={filterLayoutMap["감성"]}
							aiText={aiText}
							userInfo={userInfo}
							dateTime={dateTime}
							ticketLogoImg={ticketLogoImg}
							layoutColor={layoutColor}
						/>
					)}
					{filter === "가오" && (
						<GaoLayout
							filter={filter}
							textStyle={textStyle}
							filterLayout={filterLayoutMap["가오"]}
							aiText={aiText}
							userInfo={userInfo}
							dateTime={dateTime}
							ticketLogoImg={ticketLogoImg}
							layoutColor={layoutColor}
						/>
					)}
					{filter === "개그" && (
						<FunnyLayout
							filter={filter}
							textStyle={textStyle}
							filterLayout={filterLayoutMap["개그"]}
							aiText={aiText}
							userInfo={userInfo}
							dateTime={dateTime}
							ticketLogoImg={ticketLogoImg}
							layoutColor={layoutColor}
						/>
					)}

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
								// width: "40px",
								// height: "40px",
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