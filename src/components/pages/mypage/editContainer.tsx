import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import myPage from "../../../hooks/myPage";
import {Form} from "react-final-form";
import {INPUT_TEXT_MAX_LENGTH} from "../../../const/constants";

const EditContainer = () => {
    const {
        handleBack,
        getUserDetails,
        getAreaList,
        getGenres,
        setAddressValues,
        loadAddress,
        genresList,
        areaList,
        onSubmit,
        handleSubmit,
        register,
        password,
        passwordVerification,
        errors
    } = myPage();

    useEffect(() => {
        getUserDetails(true)
    }, [])

    useEffect(getAreaList, [])
    useEffect(getGenres, [])

    return (

        <>
            <Form onSubmit={onSubmit} render={({}) => {
                return (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CommonMeta/>
                        <input style={{display: 'none'}} name={'address1Auto'} id={'address1Auto'}/>
                        <input style={{display: 'none'}} name={'address2Auto'} id={'address2Auto'}/>
                        <div className="mypage-box">
                            <h1 className="innerttl">プロフィール編集</h1>

                            <div id="back-white"><a href="#" id={'back'} onClick={handleBack}><i
                                className="fas fa-angle-left"/></a>
                            </div>
                        </div>

                        <div id="login-box" className="nmr-top">
                            <p className="input-txt">メールアドレス</p>
                            <input type="text" className="login-input" placeholder="test@test.com"
                                   {...register("email", {
                                       required: {value: true, message: "Field is required"},
                                       maxLength: INPUT_TEXT_MAX_LENGTH,
                                       pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: "invalid email address"
                                       }
                                   })} />
                            {errors.email && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>メールアドレスは必須です。</p>}
                            <p className="input-txt">電話番号</p>
                            <input type="text" className="login-input" placeholder="08012341234"
                                   {...register("tel", {
                                       required: true,
                                       maxLength: INPUT_TEXT_MAX_LENGTH
                                   })}/>
                            {errors.tel && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>電話番号は必須です。</p>}
                            <p className="input-txt">名前</p>
                            <input type="text" className="login-input" placeholder="山田太郎"
                                   {...register("name", {
                                       required: true,
                                       maxLength: INPUT_TEXT_MAX_LENGTH
                                   })}/>
                            {errors.name && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>名前は必須です。</p>}
                            <p className="input-txt">郵便番号</p>
                            <div id="post-input">
                                <input type="number" id={'postalCode1'} className="login-input75"
                                       onKeyUp={loadAddress}
                                       {...register("postalCode1", {
                                           required: true,
                                           minLength: 3,
                                           maxLength: 3
                                       })}/> <span className="mid">ー</span>
                                <input type="number" id={'postalCode2'} className="login-input75"
                                       onKeyUp={loadAddress}
                                       {...register("postalCode2", {
                                           required: true,
                                           minLength: 4,
                                           maxLength: 4
                                       })}
                                       style={{marginLeft: '3px'}}/> &nbsp;
                                <input id="input-search" className="input-search"
                                       type="button"
                                       value="住所を検索"
                                       onClick={setAddressValues}
                                />
                                {errors.postalCode1 && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>郵便番号は必須です。</p>}

                                {!errors.postalCode1 && errors.postalCode2 && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>郵便番号は必須です。</p>}
                            </div>

                            <p className="input-txt">都道府県</p>
                            <div id="post-input"><select {...register("areaId", {required: true})}>
                                <option value="">都道府県</option>
                                {areaList?.map((data, index) => {
                                    return (
                                        <option value={data.id} key={index}>{data.name}</option>)
                                })}
                            </select></div>
                            {errors.areaId && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>都道府県は必須です。</p>}
                            <p className="input-txt">市区町村</p>
                            <input type="text" id={'address1'}
                                   className="login-input" {...register("address1", {required: true})}/>
                            {errors.address1 && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>市区町村は必須です。</p>}
                            <p className="input-txt">番地</p>
                            <input type="text" id={'address2'}
                                   className="login-input" {...register("address2", {required: true})}/>
                            {errors.address2 && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>番地は必須です。</p>}
                            <p className="input-txt">ジャンル</p>
                            <div id="genre-input">
                                {genresList?.map((data, index) => {
                                    return (
                                        <label>
                                            <input id={'cb' + data.id} type="checkbox" value={data.id}
                                                   {...register("genreIds", {
                                                           required: {value: true, message: ''}
                                                       }
                                                   )}/>{data.name}</label>)
                                })}
                            </div>
                            {errors.genreIds && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>ジャンルは必須です</p>}
                            <p className="input-txt">経験年数</p>
                            <div id="post-input"><input type="number" className="login-input75" placeholder="5"
                                                        {...register("experienceYears", {required: true, min:1})}/> 年
                            </div>
                            {errors.experienceYears && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>経験年数は必須です。</p>}
                            <p className="input-txt">自己紹介</p>
                            <textarea className="login-textarea" cols={50} rows={5}
                                      placeholder="自由記入欄です。"
                                      {...register("selfIntroduction", {required: true})}/>
                            {errors.selfIntroduction && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>自己紹介は必須です。</p>}
                            <p className="input-txt">パスワード</p>
                            <input type="password" className="login-input" placeholder="再度パスワードをご入力ください"
                                   {...register("password", password.current || passwordVerification.current ? {
                                       required: false,
                                       validate: value =>
                                           value === passwordVerification.current || "The passwords do not match"
                                   } : {})}/>
                            {errors.passwordVerification && !password.current && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>パスワードは必須です。</p>}

                            <p className="input-txt">パスワード確認用</p>
                            <input type="password" className="login-input" placeholder="再度パスワードをご入力ください"
                                   {...register("passwordVerification", password.current || passwordVerification.current ? {
                                       required: false,
                                       validate: value =>
                                           value === password.current || "The passwords do not match"
                                   } : {})}/>

                            {errors.passwordVerification && password.current && <p style={{
                                textAlign: 'left',
                                color: 'red',
                                fontSize: '14px'
                            }}>パスワードが一致しません。</p>}

                            <a href="" className="login-btns login-nmr" id="login-btn1">
                                <input type="submit" title='home' className="login-btns login-nmr" id="login-btn1"
                                       value='登録する'
                                       style={{
                                           marginTop: '0',
                                           width: '100%',
                                           height: '3.7em',
                                           borderRadius: '2em',
                                           cursor: "pointer"
                                       }}/>
                            </a>

                        </div>
                    </form>
                );
            }}/>
        </>
    )
}

export default EditContainer;