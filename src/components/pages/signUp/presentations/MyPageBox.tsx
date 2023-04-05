import React from "react";
import {useRecoilState} from "recoil";
import {signUpPage} from "../../../../recoilStates/projectSearchRecoil";
import {NEGATIVE_NUMBER_ONE} from "../../../../const/constants";

export interface MyPageBoxProps {

}

const MyPageBox: React.FC<MyPageBoxProps> = (props) => {
    const [signUpPages, setSignUpPage] = useRecoilState(signUpPage)
    const back = () =>{
        if(window.location.pathname === '/signup/tel') {
            setSignUpPage(true)
        }
        // @ts-ignore
        window.history.back(NEGATIVE_NUMBER_ONE);return false;
    }
    return (
            <div className="mypage-box">
                <h1 className="innerttl">電話番号の入力</h1>

                <div id="back-white"><a href="#" onClick={back}><i
                    className="fas fa-angle-left"/></a></div>
            </div>
    )
}
export default MyPageBox
