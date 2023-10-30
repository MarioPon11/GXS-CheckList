export default function ActionButtons({ CompName, callback, classNm, isIcon = false }: { CompName: string, classNm: string, isIcon?: boolean, callback: () => void }) {
    return (<button className={classNm} onClick={callback}>{isIcon ? <i className="bx bxs-chevron-down"></i> : CompName}</button>);
}