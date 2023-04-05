import React, {useEffect} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import useOrdererProjects from "../../../../hooks/useOrdererProjects";
import HeaderContainer from "../../parts/Header";
import {Form} from "react-final-form";
import {INPUT_TEXT_MAX_LENGTH, Z_INDEX_MAX_LENGTH} from "../../../../const/constants";
import Header from "../../parts/Header";
import useLocalStorageLogin from "../../../../hooks/useLocalStorageLogin";

const CreateContainer = () => {
    const {
        handleArea,
        handleGenres,
        handleReset,
        handleCheckUserGmoId,
        handleGotoCreditCardPage,
        setAddressValues,
        loadAddress,
        deleteFile,
        downloadFile,
        handleUpload,
        hideTutorialModal,
        genresList,
        handleSubmit,
        register,
        onSubmit,
        areaList,
        showCreditCardDialog,
        errors,
        address1,
        areaId,
        recruitingStartDate,
        recruitingEndDate,
        workEndDate,
        workStartDate,
        restraintEndDate,
        restraintStartDate,
        maxPrice,
        minPrice,
        upLoadFileNumber,
        showDownload,
    } = useOrdererProjects();

    useEffect(handleGenres, [])
    useEffect(handleArea, [])
    useEffect(handleCheckUserGmoId, [showCreditCardDialog])

    return (
        <>
            <CommonMeta/>
            <HeaderContainer/>
            <Header showNotificationBell={true} headerSelectionTab={'/'} showHeaderSelection={false}
                    showRightButton={true}
                    showCenterImg={true}/>
            <h1 className="innerttl border-gray" id="ttl">案件応募<a href="#"><i className="fas fa-angle-left"/></a></h1>
            <Form onSubmit={onSubmit} render={({}) => {
                return (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input style={{display: 'none'}} name={'address1Auto'} id={'address1Auto'}/>
                        <input style={{display: 'none'}} name={'address2Auto'} id={'address2Auto'}/>
                        <div id="maincont">
                            <div id="contents" className="main-side">
                                <p id="login-attn">※すべて必須項目になります。</p>
                                <p className="input-txt">プロジェクト名</p>
                                <div className="post-input">
                                    <input type="text" className="login-input"
                                           {...register("projectName", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                           })}/>
                                </div>
                                {errors.projectName && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>プロジェクト名は必須です。</p>}
                                <p className="input-txt">募集期間</p>
                                <div className="post-input">
                                    <input type="datetime-local" className="login-input135 lh-clm"
                                           {...register("recruitingStartDate", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                           })}/> <span className="mid">〜 </span>
                                    <input
                                        type="datetime-local" className="login-input135 lh-clm"
                                        {...register("recruitingEndDate", {
                                            maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                        })}
                                        style={{marginLeft: '4px'}}/></div>
                                {errors.recruitingStartDate && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>募集期間は必須です。</p>}

                                {!errors.recruitingStartDate && errors.recruitingEndDate ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>現場の日は必須です。</p> : recruitingStartDate.current && recruitingEndDate.current && (recruitingStartDate.current >= recruitingEndDate.current) ?
                                    <p style={{
                                        textAlign: 'left',
                                        color: 'red',
                                        fontSize: '14px'
                                    }}>正しい日付を入力してください。</p> : null}
                                <p className="input-txt">ジャンル</p>
                                <div id="genre-input">
                                    {genresList?.map((data) => {
                                        return (
                                            <label key={data.id}>
                                                <input id={'cb' + data.id} type="checkbox" value={data.id}
                                                       {...register("genres", {
                                                               required: {value: true, message: ''}
                                                           }
                                                       )}/>{data.name}</label>)
                                    })}
                                </div>
                                {errors.genres && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>ジャンルは必須です。</p>}

                                <p className="input-txt">最小経験年数年</p>
                                <div className="post-input">
                                    <input type="number" className="login-input100"
                                           {...register("minimumExperienceYears", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 0,
                                           })}/> <span
                                    className="mid">年</span></div>

                                {errors.minimumExperienceYears ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>最小経験年数年は必須です。</p> : ''}

                                <p className="input-txt">募集人数</p>
                                <div className="post-input">
                                    <input type="number" className="login-input100"
                                           {...register("stock", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 1
                                           })}/> <span
                                    className="mid">人</span></div>
                                {errors.stock ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>募集人数は必須です。</p> : ''}
                                <p className="input-txt">現場の日</p>
                                <div className="post-input">
                                    <input type="datetime-local" className="login-input135 lh-clm"
                                           {...register("workStartDate", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                           })}/> <span className="mid">〜</span>
                                    <input
                                        type="datetime-local"
                                        className="login-input135 lh-clm" {...register("workEndDate", {
                                        maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                    })}
                                        style={{marginLeft: '4px'}}/></div>
                                {errors.workStartDate && errors.workEndDate && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>現場の日は必須です。</p>}
                                {!errors.workStartDate && errors.workEndDate ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>現場の日は必須です。</p> : workStartDate.current && workEndDate.current && (workStartDate.current >= workEndDate.current) ?
                                    <p style={{
                                        textAlign: 'left',
                                        color: 'red',
                                        fontSize: '14px'
                                    }}>正しい日付を入力してください。</p> : null}

                                <p className="input-txt">拘束時間</p>
                                <div className="post-input">
                                    <input type="datetime-local" className="login-input135 lh-clm"
                                           {...register("restraintStartDate", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                           })}/> <span className="mid">〜</span>
                                    <input
                                        type="datetime-local" className="login-input135 lh-clm"
                                        {...register("restraintEndDate", {
                                            maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                        })}
                                        style={{marginLeft: '4px'}}/></div>
                                {errors.restraintStartDate && errors.restraintEndDate && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>拘束時間は必須です。</p>}

                                {!errors.restraintStartDate && errors.restraintEndDate ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>現場の日は必須です。</p> : restraintStartDate.current && restraintEndDate.current && (restraintStartDate.current >= restraintEndDate.current) ?
                                    <p style={{
                                        textAlign: 'left',
                                        color: 'red',
                                        fontSize: '14px'
                                    }}>正しい日付を入力してください。</p> : null}
                                <p className="input-txt">郵便番号</p>
                                <div id="post-input">
                                    <input type="number" id={'postalCode1'} className="login-input75"
                                           onKeyUp={loadAddress}
                                           {...register("postalCode1", {
                                               required: true,
                                               minLength: 3, maxLength: 3
                                           })}/> <span className="mid">ー</span>
                                    <input type="number" id={'postalCode2'} className="login-input75"
                                           onKeyUp={loadAddress}
                                           {...register("postalCode2", {
                                               required: true,
                                               minLength: 4, maxLength: 4
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
                                <div id="post-input">
                                    <select {...register("areaId", {required: true})}>
                                        <option value="">都道府県</option>
                                        {areaList?.map((data, index) => {
                                            return (
                                                <option value={data.id} key={index}>{data.name}</option>)
                                        })}
                                    </select>
                                </div>
                                {areaId.current !== 1 && errors.areaId && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>都道府県は必須です。</p>}
                                <p className="input-txt">市区町村</p>
                                <input type="text" className="login-input"
                                       {...register("address1", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                       })}/>
                                {!address1.current && errors.address1 && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>市区町村は必須です。</p>}
                                <p className="input-txt">番地</p>
                                <input type="text" className="login-input"
                                       {...register("address2", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: true
                                       })}/>
                                {errors.address2 && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>番地は必須です。</p>}
                                <p className="input-txt">金額</p>
                                <div className="post-input">
                                    <input type="number" className="login-input100"
                                           {...register("minPrice", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 1,
                                               validate: (value) => value > 0,
                                           })}/> <span
                                    className="mid">円〜</span>
                                    <input type="number" className="login-input100"
                                           {...register("maxPrice", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 1,
                                               validate: (value) => value > 0,
                                           })}/></div>

                                {errors.minPrice && errors.maxPrice && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>金額は必須です。</p>}
                                {!errors.minPrice && errors.maxPrice ? <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>金額は必須です。</p> : minPrice.current > -0 && maxPrice.current && (Number(minPrice.current) > Number(maxPrice.current)) ?
                                    <p style={{
                                        textAlign: 'left',
                                        color: 'red',
                                        fontSize: '14px'
                                    }}>正しい金額を入力してください。</p> : null}

                                <p className="input-txt">案件詳細</p>
                                <textarea className="login-textarea" cols={50} rows={5}
                                          {...register("description", {
                                              required: true
                                          })}/>
                                {errors.description && <p style={{
                                    textAlign: 'left',
                                    color: 'red',
                                    fontSize: '14px'
                                }}>案件詳細は必須です。</p>}

                                <p className="input-txt">添付ファイル</p>
                                {upLoadFileNumber.map((data) => {
                                    return (
                                        <>
                                            {showDownload && data.noData === 'true' ?
                                                <div className="fileicon"
                                                     style={{paddingLeft: '0px', marginBottom: '15px'}}>
                                                    <a target="_blank" style={{cursor: "pointer"}} onClick={() => {
                                                        downloadFile(true, data.htmlFile, data.name, data.id)
                                                    }}><img src="/assets/image/fileicon.png" width="40" height="100"/>
                                                        <p>{data.name}<span>{data.fileSize}bytes - Download</span></p>
                                                    </a>
                                                </div> : <div className="file">
                                                    <input className={'file' + data.id} type="file"
                                                           onChange={(e) => {
                                                               handleUpload(e, '', data.id).then(r => console.log(r))
                                                           }}
                                                    /></div>}
                                        </>
                                    )
                                })}
                                <input type="text" className="login-input100"
                                       style={{display: 'none'}}
                                       {...register("projectFiles", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: false
                                       })}/>

                                <div id="in11-button">
                                <span><input type="button" value="クリア" style={{cursor: "pointer"}}
                                             onClick={() => {
                                                 handleReset()
                                             }}/></span><span><input
                                    type="submit" value="仕事を発注する" style={{cursor: "pointer"}}/></span>
                                </div>
                            </div>
                        </div>
                    </form>
                );
            }}/>
            <Footer/>

            <div id="popup" className="creditbox"
                 style={{zIndex: Z_INDEX_MAX_LENGTH, display: showCreditCardDialog ? 'flex' : 'none'}}>
                <div id="cont">
                    <div id="crediticon"><img src="/assets/image/icon-no.11.jpg" width="50" height="200"/></div>
                    <p id="t1">お仕事を発注する際は<br/>クレジット登録が必要となります。</p>
                    <div id="credit-send"><span><input style={{cursor: "pointer"}} type="submit" value="クレジット登録はこちら"
                                                       onClick={() => {
                                                           handleGotoCreditCardPage()
                                                       }}/></span></div>
                </div>
            </div>

            {
                useLocalStorageLogin().getLocalStorageLoginUser() && !useLocalStorageLogin().getLocalStorageDisplayTutorialForCreatePage() &&
                <a data-target="modal1" className="modal_open"/>
            }
            <div id="modal1" className="modal_box">
                <div id="some-img"><img src="/assets/image/img1.jpg" alt="仕事を依頼したい方" width="1250" height="770"/></div>
                <div className="first-ttl">仕事を依頼したい方</div>
                <p id="wlcm-txt1" className="wlcm-text">かんたん操作チュートリアル</p>
                <p className="first-txt">Just me Orders上にお仕事の募集を掲載し、依頼相手を探すことができます。<br/>お仕事内容を細かく設定掲載する事が出来、仕事を依頼したい方の条件を条件に合わせて発注が可能です。<br/>アプリ上で受発注、支払いと一連の流れが完結します。<br/>請求書の確認や金額等の事務やり取りを無くす事が出来、作業負担を軽減できます。
                </p>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal2" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal2" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img1.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.01</p>
                <p className="fst-title">仕事を掲載する</p>
                <p className="first-txt">依頼したい仕事内容を記載し、仕事を掲載します。仕事掲載は無料です。<br/>依頼掲載時に細かい条件を指定する事が出来ます</p>

                <div className="link_area">
                    <ul>
                        <li className="modal_link"><a data-target="modal3" className="modal_switch"><span>次へ</span></a>
                        </li>
                    </ul>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal3" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img5.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.02</p>
                <p className="fst-title">応募を待つ</p>
                <p className="first-txt">依頼した仕事に、応募が来るのを待ちます。<br/>仕事内容への質問や相談、条件交渉等が発生する場合があります。<br/>アプリ内のメッセージ機能で質問への返答や情報のやり取りが可能です。
                </p>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal4" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal4" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img3.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.03</p>
                <p className="fst-title">契約条件を相談する</p>
                <p className="first-txt">応募者の中から依頼したい人が絞られてくれば、依頼する業務の内容・報酬についてお互いが納得する条件となるよう、応募者と相談をしましょう。</p>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal5" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal5" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img4.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.04</p>
                <p className="fst-title">契約・仮払い</p>
                <p className="first-txt">受注者との話し合いが終わり、契約に問題が無ければ受注者管理ページから【成約】ボタンを押すだけで、カンタンに契約を進めることができます。<br/>契約後は、自動的に「仮払い」が行われることで業務開始が可能になります。
                </p>

                <div className="link_area">
                    <p className="modal_link" onClick={() => {
                        hideTutorialModal()
                    }}><a className="modal_close" data-target="modal5"><span>はじめよう！</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"></i></a></p>
            </div>
        </>
    )
}

export default CreateContainer;