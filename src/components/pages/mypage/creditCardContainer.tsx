import CommonMeta from "../../CommonMeta";
import React, {useEffect} from "react";
import useCreditCard from "../../../hooks/useCreditCard";
import Footer from "../parts/Footer";
import {Form} from "react-final-form";
import {useRecoilState} from "recoil";
import {isPreviousPageIsCreatingProject} from "../../../recoilStates/projectSearchRecoil";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";


const CreditCardContainer = () => {
    const {
        router,
        getUserCreditCardDetails,
        getLoggedInUser,
        user,
        handleSubmit,
        currentYear,
        register,
        onSubmit,
        errorMessage,
        errors,
        credit
    } = useCreditCard();
    const [isPreviousPageIsCreatingProjects] = useRecoilState(isPreviousPageIsCreatingProject)

    useEffect(() => {
        if(isPreviousPageIsCreatingProjects) {
            useLocalStorageLogin().setLocalStorageCreatingProject(isPreviousPageIsCreatingProjects);
        }
    },[])
    useEffect(getLoggedInUser, []);
    useEffect(getUserCreditCardDetails, [user]);

    return (
        <>
            <CommonMeta tokenJsUrl={credit?.tokenJsUrl}/>
            <div className="mypage-box">
                <h1 className="innerttl">クレジットカード情報</h1>
                <div id="back-white"><a style={{cursor: "pointer"}} onClick={() => {
                    router.push({pathname: '/mypage'})
                }}><i
                    className="fas fa-angle-left"/></a></div>
            </div>
            <div id="maincont">
                <main role="main" id="main">
                    <div id="inner-icon"><img src="/assets/image/icon-no.26.jpg" alt="" width="50"
                                              height="200"/></div>
                    <p className="center-txt">支払い情報を入力してください</p>
                    <div id="card"><img src="/assets/image/card.jpg" alt="card" width="250" height="100"/>
                    </div>

                    <div className="cc-side"/>
                    <Form onSubmit={onSubmit} render={({}) => {
                        return (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <p className="cc-txt">カード番号</p>
                                <input type="text" id="cardNumber" className="cc-input" placeholder="4242424242424242"
                                       {...register("cardNumber", {
                                           required: true,
                                           minLength: 14,
                                           maxLength: 16,
                                           pattern: {
                                               value: /^[0-9]+$/,
                                               message: '正しいカード番号を入力してください。',
                                           },
                                       })}/>
                                {errors.cardNumber && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>正しいカード番号を入力してください。</p>}
                                <br/>
                                <p className="cc-txt">カード名義</p>
                                <input type="text" id="holderName" className="cc-input" placeholder="カード名義"
                                       {...register("holderName", {
                                           required: true,
                                       })}/>
                                {errors.holderName && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>カード名義は必須です。</p>}

                                <div className="cc-main">
                                    <div className="cc-box">
                                        <p className="cc-txt">有効期限</p>
                                        <input type="number" id="expiration1" className="cc-input2" placeholder="年"
                                               {...register("expiration1", {
                                                   required: true,
                                                   minLength: 2,
                                                   maxLength: 2,
                                                   valueAsNumber: true,
                                                   validate: (value) => value > 0 && value >= currentYear,
                                               })}/><input type="number" id="expiration2" className="cc-input2"
                                                           placeholder="月"
                                                           {...register("expiration2", {
                                                               required: true,
                                                               maxLength: 2,
                                                               valueAsNumber: true,
                                                               validate: (value) => value > 0 && value <= 12,
                                                           })}/>
                                    </div>

                                    <div className="cc-box">
                                        <p className="cc-txt">セキュリティコード</p>
                                        <input type="number" id="securityCode" className="cc-input3" placeholder="123"
                                               {...register("securityCode", {
                                                   required: true,
                                                   valueAsNumber: true,
                                                   validate: (value) => value.toString().length > 0 && value.toString().length === 3,
                                               })}/>
                                    </div>
                                </div>
                                <br/>
                                {errors.securityCode && <p style={{
                                    marginTop: '10px',
                                    textAlign: 'center',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>正しいセキュリティコードを入力してください。</p>}
                                {(errors.expiration1 || errors.expiration2 || errorMessage) && <p style={{
                                    marginTop: '10px',
                                    textAlign: 'center',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>正しい有効期限を入力してください。</p>}
                                <a href="" className="login-btns login-nmr" id="login-btn1">
                                    <input type="submit" className="login-btns login-nmr" id="login-btn1"
                                           value={user?.data.gmoCardNo?.length != null ? '編集する' : "登録する"}
                                           style={{
                                               marginTop: '0',
                                               width: '100%',
                                               height: '3.7em',
                                               borderRadius: '2em',
                                               cursor: "pointer"
                                           }}/>
                                </a>
                            </form>
                        );
                    }}/>
                </main>
            </div>
            <Footer/>
        </>
    )
}
export default CreditCardContainer;