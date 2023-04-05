import React from "react";
import Router, {BaseRouter} from "next/dist/shared/lib/router/router";

interface TransferDialogProps {
    router: BaseRouter & Pick<Router, "push"|"replace"|"back"|"prefetch"|"beforePopState"|"events"|"isFallback"|"isReady"|"isPreview">
}

const TransferDialog : React.FC<TransferDialogProps> = (props: TransferDialogProps) => {
    return (
        <div className={"modal js-modal"}>
            <div className={"modal__bg js-modal-close"}></div>
            <div className={"modal__content"}>
                <div id="popup">
                    <div id="cont">
                        <p id="t1">お振込を申請する</p>
                        <p id="t2">お振込を申請します。<br/>よろしければ申請するボタンを押してください。</p>
                        <a id="p-back" className={"js-modal-close"} style={{cursor: "pointer"}}>戻る</a>
                        <a id="p-send" style={{cursor: "pointer"}} onClick={() => {
                            props.router.push({pathname: '/mypage/balance/bankAccount'})
                        }}>申請する</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TransferDialog;