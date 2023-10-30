export default function ActionButtons({ CompName, callback, isMainAction = false, isIcon = false }: { CompName: string, isMainAction?: boolean, isIcon?: boolean, callback: () => void }) {
    return (<button className={isMainAction ? "action" : "reset-btn"} onClick={callback}>{isIcon ? <i className="bx bxs-chevron-down"></i> : CompName}</button>);
}