// 감성
const FrameA = ({ color = "black", className }) => (
    <svg width="371" height="214" viewBox="0 0 371 214" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <line x1="0.25" y1="0.5" x2="0.25" y2="213.5" stroke={color} strokeWidth="0.5" />
        <line x1="119.25" y1="106" x2="119.25" y2="156" stroke={color} strokeWidth="0.5" />
        <line x1="235.25" y1="168" x2="235.25" y2="214" stroke={color} strokeWidth="0.5" />
        <line x1="310.25" y1="168" x2="310.25" y2="214" stroke={color} strokeWidth="0.5" />
        <line x1="364" y1="193.25" x2="318" y2="193.25" stroke={color} strokeWidth="0.5" />
        <line x1="229" y1="193.25" x2="183" y2="193.25" stroke={color} strokeWidth="0.5" />
        <line x1="371" y1="162.25" x2="15" y2="162.25" stroke={color} strokeWidth="0.5" />
        <line x1="371" y1="29.25" x2="15" y2="29.25" stroke={color} strokeWidth="0.5" />
        <line x1="371" y1="34.25" x2="15" y2="34.25" stroke={color} strokeWidth="0.5" />
        <line x1="371" y1="91.25" x2="15" y2="91.25" stroke={color} strokeWidth="0.5" />
        <line x1="371" y1="96.25" x2="15" y2="96.25" stroke={color} strokeWidth="0.5" />
        <line x1="138" y1="0.25" x2="15" y2="0.25" stroke={color} strokeWidth="0.5" />
        <line x1="368" y1="0.25" x2="245" y2="0.25" stroke={color} strokeWidth="0.5" />
    </svg>
);

// 가오
const FrameB = ({ color = "black", className }) => (
    <svg width="369" height="214" viewBox="0 0 369 214" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <line x1="0.25" y1="0" x2="0.25" y2="213" stroke={color} strokeWidth="0.5" />
        <line x1="29.25" y1="0" x2="29.25" y2="213" stroke={color} strokeWidth="0.5" />
        <line x1="260.25" y1="0" x2="260.25" y2="213" stroke={color} strokeWidth="0.5" />
        <line x1="348.25" y1="0" x2="348.25" y2="213" stroke={color} strokeWidth="0.5" />
        <line x1="368.25" y1="0" x2="368.25" y2="213" stroke={color} strokeWidth="0.5" />
        <line x1="255" y1="70.25" x2="35" y2="70.25" stroke={color} strokeWidth="0.5" />
        <line x1="255" y1="73.25" x2="35" y2="73.25" stroke={color} strokeWidth="0.5" />
        <line x1="255" y1="152.25" x2="35" y2="152.25" stroke={color} strokeWidth="0.5" />
        <line x1="348" y1="0.25" x2="0" y2="0.25" stroke={color} strokeWidth="0.5" />
        <line x1="348" y1="133.25" x2="260" y2="133.25" stroke={color} strokeWidth="0.5" />
        <line x1="349" y1="213.25" x2="1" y2="213.25" stroke={color} strokeWidth="0.5" />
    </svg>
);


// 개그
const FrameC = ({ color = "black", className }) => (
    <svg width="50" height="197" viewBox="0 0 50 197" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <line x1="50" y1="56.7937" x2="0" y2="56.7937" stroke={color} strokeWidth="0.543478" />
        <line x1="50" y1="138.315" x2="0" y2="138.315" stroke={color} strokeWidth="0.543478" />
        <line x1="22.5544" y1="196.739" x2="22.5544" y2="146.739" stroke={color} strokeWidth="0.543478" />
        <line x1="22.5544" y1="50" x2="22.5544" y2="0" stroke={color} strokeWidth="0.543478" />
    </svg>
);

function Layout({ layoutColor, filter, className }) {
    switch (filter) {
        case '감성': return <FrameA color={layoutColor} className={className} />
        case '가오': return <FrameB color={layoutColor} className={className} />
        case '개그': return <FrameC color={layoutColor} className={className} />
        default: return null;
    }
}

export default Layout;