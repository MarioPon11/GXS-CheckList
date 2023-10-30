export default function ActionButtons({ CompName, callback, isMainAction = false, isIcon = false }: { CompName: string, isMainAction?: boolean, isIcon?: boolean, callback: () => void }) {
    return (<button className={isMainAction ? "lg accent" : "lg default"} onClick={callback}>{isIcon ? <i className="bx bxs-chevron-down"></i> : CompName}</button>);
}