import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import useProjects from "../../../hooks/useProjects";
import {Form} from "react-final-form";
import {useRecoilState} from "recoil";
import {projectToSearchState, reSearch} from "../../../recoilStates/projectSearchRecoil";
import useLocalStorageLogin from "../../../hooks/useLocalStorageLogin";
import {INPUT_TEXT_MAX_LENGTH} from "../../../const/constants";

const SearchContainer = () => {
    const {
        areaList,
        handleSubmit,
        register,
        reset,
        onSubmit,
        getAreaList,
        hideTutorialModal
    } = useProjects();
    const [projectToSearchStates] = useRecoilState(projectToSearchState)
    const [reSearchs] = useRecoilState(reSearch)

    useEffect(() => {
        if (reSearchs) {
            if (projectToSearchStates) {
                const inputSearch = useLocalStorageLogin().getLocalStorageInputDataProjectSearch();
                if (inputSearch) {
                    const inputData = JSON.parse(inputSearch)
                    // @ts-ignore
                    inputData.workDateFrom = inputData.workDateFrom.replace('Z', '');
                    // @ts-ignore
                    inputData.workDateTo = inputData.workDateTo.replace('Z', '');
                    // @ts-ignore
                    inputData.restraintDateFrom = inputData.restraintDateFrom.replace('Z', '');
                    // @ts-ignore
                    inputData.restraintDateTo = inputData.restraintDateTo.replace('Z', '');
                    // @ts-ignore
                    reset(inputData)
                }
            }
        }
    }, [reSearchs, projectToSearchStates, areaList])

    useEffect(getAreaList, [])

    return (
        <>
            <body>
            <CommonMeta/>
            <h1 className="innerttl" id="ttl">検索条件</h1>
            <Form onSubmit={onSubmit} render={({}) => {
                return (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="maincont">

                            <div id="contents">
                                <input type="text" style={{display: "none"}} className="login-input100 lh-clm"
                                       value={'null'}
                                       {...register("status", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: false
                                       })} />
                                <input type="text" style={{display: "none"}} className="login-input100 lh-clm"
                                       value={'null'}
                                       {...register("ordererId", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: false
                                       })} />
                                <input type="text" style={{display: "none"}} className="login-input100 lh-clm"
                                       value={'null'}
                                       {...register("stockTo", {
                                           maxLength: INPUT_TEXT_MAX_LENGTH, required: false
                                       })} />
                                <table width="100%" className="detail">
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon1.jpg"/>キーワード
                                        </h3></th>
                                        <td>
                                            <input className="search01 dsearch" type="text" {...register("keyword", {
                                                maxLength: 20, required: false
                                            })} placeholder="キーワードで探す"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon3.jpg" alt="icon"/>募集人数
                                        </h3></th>
                                        <td>
                                            <input className="login-input200" type="text" {...register("stockFrom", {
                                                maxLength: 20, required: false
                                            })} />
                                            <span className="mid">&nbsp;人</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon4.jpg" alt="icon" width="17.77"
                                                 height="19"/>
                                            現場の日</h3></th>
                                        <td>
                                            <input type="datetime-local" className="login-input100 lh-clm"
                                                   {...register("workDateFrom", {
                                                       maxLength: 20, required: false
                                                   })} />
                                            <span className="mid">&nbsp;〜&nbsp;</span>
                                            <input type="datetime-local" className="login-input100 lh-clm"
                                                   {...register("workDateTo", {
                                                       maxLength: 20, required: false
                                                   })} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon5.jpg" alt="icon" width="17.77"
                                                 height="19"/>拘束時間
                                        </h3></th>
                                        <td>
                                            <input type="datetime-local" className="login-input100 lh-clm"
                                                   {...register("restraintDateFrom", {
                                                       maxLength: 20, required: false
                                                   })} />
                                            <span className="mid">&nbsp;〜&nbsp;</span>
                                            <input type="datetime-local" className="login-input100 lh-clm"
                                                   {...register("restraintDateTo", {
                                                       maxLength: 20, required: false
                                                   })} /></td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon6.jpg" alt="icon" width="17.77"
                                                 height="19"/>エリア
                                        </h3></th>
                                        <td>
                                            <select {...register("areaId", {required: false})}>
                                                <option value="">都道府県</option>
                                                {areaList?.map((data, index) => {
                                                    return (
                                                        <option value={data.id} key={index}> {data.name}</option>)
                                                })}
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon7.jpg" alt="icon" width="17.77"
                                                 height="19"/>金額
                                        </h3></th>
                                        <td>
                                            <input type="text" className="login-input86"
                                                   {...register("priceFrom", {
                                                       maxLength: 20, required: false, min: 0
                                                   })} /><span className="mid">&nbsp;円〜&nbsp;</span>
                                            <input type="text" className="login-input86"
                                                   {...register("priceTo", {
                                                       maxLength: 20, required: false, min: 0
                                                   })} /> 円
                                        </td>
                                    </tr>
                                    <tr>
                                        <th><h3>
                                            <img src="/assets/image/search-icon2.jpg" alt="icon" width="17.77"
                                                 height="19"/>ジャンル
                                        </h3></th>
                                        <td id="check">
                                            <label><input type="checkbox" value="1" {...register("genreIds", {
                                                    required: {value: false, message: ''}
                                                }
                                            )}/>音響</label>
                                            <label><input type="checkbox" value="2" {...register("genreIds", {
                                                    required: {value: false, message: ''}
                                                }
                                            )}/>照明</label>
                                            <label><input type="checkbox" value="3" {...register("genreIds", {
                                                    required: {value: false, message: ''}
                                                }
                                            )}/>舞台</label>
                                            <label><input type="checkbox" value="4" {...register("genreIds", {
                                                    required: {value: false, message: ''}
                                                }
                                            )}/>映像</label>
                                            <label><input type="checkbox" value="5" {...register("genreIds", {
                                                    required: {value: false, message: ''}
                                                }
                                            )}/>イベントスタッフ</label>
                                        </td>
                                    </tr>
                                </table>

                                <div id="in11-button" className="searchside">
                            <span><input style={{cursor: "pointer"}} type="button" value="クリア" onClick={() => {
                                reset({
                                    keyword: '',
                                    stockFrom: '',
                                    workDateFrom: '',
                                    workDateTo: '',
                                    restraintDateFrom: '',
                                    restraintDateTo: '',
                                    areaId: '',
                                    priceFrom: '',
                                    priceTo: '',
                                    genreIds: false,
                                })
                            }}/></span><span>
                        <a>
                            <input type="submit" style={{cursor: "pointer"}}
                                   value='この条件で検索する'
                            /></a></span>
                                </div>

                            </div>
                        </div>
                    </form>
                );
            }}/>
            <div id=""/>
            <Footer/>
            </body>

            {
                useLocalStorageLogin().getLocalStorageLoginUser() && !useLocalStorageLogin().getLocalStorageDisplayTutorialForSearchPage() &&
                <a data-target="modal1" className="modal_open"/>
            }

            <div id="modal1" className="modal_box">
                <div id="some-img"><img src="/assets/image/img2.jpg" alt="働きたい方" width="1250" height="770"/></div>
                <div className="first-ttl">働きたい方</div>
                <p id="wlcm-txt1" className="wlcm-text">かんたん操作チュートリアル</p>
                <p className="first-txt">Just me Orders上に掲載されている募集中のお仕事から自分のスキル、希望にあったお仕事を探して応募できます。<br/>アプリ上で受発注、支払いまでが完結するようになっています。<br/>また仮払い方式によって請求書発行等の事務作業負担を削減する事が出来ます。<br/>また請求書の発行漏れや金額の貰い忘れ等のトラブルの可能性を軽減する事が可能です。
                </p>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal2" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal2" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img1.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.01</p>
                <p className="fst-title">仕事を探す</p>
                <p className="first-txt">Just me Orders上に掲載されている募集中のお仕事から自分のスキル、希望にあったお仕事を探して応募できます。<br/>アプリ上で受発注、支払いまでが完結するようになっています。<br/>また仮払い方式によって請求書発行等の事務作業負担を削減する事が出来ます。<br/>また請求書の発行漏れや金額の貰い忘れ等のトラブルの可能性を軽減する事が可能です。
                </p>

                <div className="link_area">
                    <ul>
                        <li className="modal_link"><a data-target="modal3" className="modal_switch"><span>次へ</span></a>
                        </li>
                    </ul>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal3" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img2.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.02</p>
                <p className="fst-title">応募する</p>
                <p className="first-txt">興味のある仕事が見つかったら、希望の契約条件、受注金額を設定しメッセージを添えて応募します。<br/>プロフィール欄は全て発注者様に確認頂けるようになるので、プロフィール内容を充実させて自己アピールをしましょう。
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
                <p className="first-txt">業務内容や報酬は、あらかじめ明示されていることもあれば提案や見積もりを希望されることもあります。<br/>発注者・受注者のお互いが納得した条件で契約できるようアプリ内のメッセージ上で相談しましょう。
                </p>

                <div className="link_area">
                    <p className="modal_link"><a data-target="modal5" className="modal_switch"><span>次へ</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>

            <div id="modal5" className="modal_box">
                <div className="fst-img"><img src="/assets/image/fo-img4.jpg" alt="" width="700" height="700"/></div>
                <p className="fst-step">STEP.04</p>
                <p className="fst-title">契約</p>
                <p className="first-txt">お互いが条件や受発注金額に同意すると、契約締結です。<br/>発注者から契約確認のフォームが届くので契約金額を確認して承諾しましょう。<br/>契約完了後に仮払いが行われ依頼完了後に支払いが行われます。<br/><br/>仕事の詳細を受発注様双方でやり取りを行って頂き、仕事を行いましょう
                </p>

                <div className="link_area">
                    <p className="modal_link" onClick={() => {
                        hideTutorialModal()
                    }}><a className="modal_close " data-target="modal5"
                    ><span>はじめよう！</span></a></p>
                </div>

                <p><a className="modal_close"><i className="zmdi zmdi-close"/></a></p>
            </div>
        </>
    )
}

export default SearchContainer;