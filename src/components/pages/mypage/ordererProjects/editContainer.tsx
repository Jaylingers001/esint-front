import React, {useEffect} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import useOrdererProjects from "../../../../hooks/useOrdererProjects";
import HeaderContainer from "../../parts/Header";
import {Form} from "react-final-form";
import {INPUT_TEXT_MAX_LENGTH} from "../../../../const/constants";

const EditContainer = () => {
    const {
        handleSubmit,
        register,
        onSubmitEdit,
        areaList,
        genresList,
        errors,
        areaId,
        address1,
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
        handleShowEdit,
        handleArea,
        handleGenres,
        handleReset,
        setAddressValues,
        loadAddress,
        handleUpload,
        downloadFile,
        deleteFile,
        kbToMb,
    } = useOrdererProjects();

    useEffect(handleGenres, [])
    useEffect(handleArea, [])
    useEffect(handleShowEdit, [])

    return (
        <>
            <CommonMeta/>
            <HeaderContainer/>
            <h1 className="innerttl border-gray" id="ttl">お仕事発注フォーム</h1>
            <Form onSubmit={onSubmitEdit} render={({}) => {
                return (
                    <form onSubmit={handleSubmit(onSubmitEdit)}>
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
                                           })}/> <span className="mid">〜</span>
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
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 0
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
                                           })}/> <span
                                    className="mid">円〜</span>
                                    <input type="number" className="login-input100"
                                           {...register("maxPrice", {
                                               maxLength: INPUT_TEXT_MAX_LENGTH, required: true, min: 1,
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
                                }}>金額は必須です。</p> : minPrice.current && maxPrice.current && (Number(minPrice.current) > Number(maxPrice.current)) ?
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
                                                    <div style={{
                                                        position: 'absolute',
                                                        right: '4%',
                                                        textAlign: 'right',
                                                        marginTop: '0.6em'
                                                    }}>
                                                        <p style={{
                                                            height: '2em',
                                                            width: '6em', cursor: "pointer"
                                                        }}
                                                           onClick={() => {
                                                               deleteFile(data.id, data.name).then(r => console.log(r))
                                                           }}><p> 削除 </p></p>
                                                    </div>
                                                    <a target="_blank" style={{cursor: "pointer"}} onClick={() => {
                                                        downloadFile(true, data.htmlFile, data.name, data.id)
                                                    }}>
                                                        <img src="/assets/image/fileicon.png" width="40" height="100"/>
                                                        <p>{data.name}<span>{kbToMb(data.fileSize)}</span></p>
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
        </>
    )
}

export default EditContainer;