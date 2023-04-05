import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import myPage from "../../../hooks/myPage";
import {useRouter} from "next/router";

const ProfileContainer = () => {
    const router = useRouter()
    const {userData, areaList, areaName, handleUpload, getUserDetails, getAreaList} = myPage();

    useEffect(getAreaList, [])
    useEffect(getUserDetails, [areaList])

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">プロフィール編集</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={() => {
                    router.push({pathname: '/mypage'}).then()
                }}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            {userData?.map((data) => {
                return (
                    <div id="maincont">
                        <div id="profile-box">
                            <div id="icon">
                                <p><input type="file" accept="image/*" name="image" id="file" onChange={(e) => {
                                    handleUpload(e, JSON.stringify(data.id)).then()
                                }} style={{display: 'none'}}/></p>
                                <img id={'output'} style={{opacity: data.profileImageUrl ? '1' : '0'}}
                                     src={data.profileImageUrl} alt="icon" width="270"
                                     height="270"/>
                            </div>
                            <label htmlFor="file" style={{
                                cursor: 'pointer', display: "inline-block",
                                verticalAlign: 'top',
                                fontWeight: 'bold',
                                color: '#ff8710',
                                fontSize: '14px',
                                letterSpacing: ' 0.05em',
                                margin: '40px 0px 0px 10px'
                            }}>アイコンの変更</label>
                        </div>

                        <h2 className="subttl">プロフィール</h2>
                        <ul className="detail-list">
                            <li><h3>名前</h3><p id='name'>{data.name}</p></li>
                            <li><h3>メールアドレス</h3><p id='email'>{data.email}</p></li>
                            <li><h3>住所</h3><p id='address'>{areaName} &nbsp; {data.address1} &nbsp; {data.address2}</p>
                            </li>
                            <li><h3>連絡先</h3><p id='tel'>{data.tel}</p></li>
                            <li><h3>ジャンル</h3><p id='genres'>{data.genres?.data?.map((datas, index) => {
                                return (<>{index === 0 ? '' : ','} {datas.name}</>)
                            })}</p></li>
                            <li><h3>経験年数</h3><p id='experience'>{data.experienceYears}年</p></li>
                        </ul>

                        <h2 className="subttl">自己紹介</h2>
                        <p className="freearea">{data.selfIntroduction}</p>

                        <a style={{cursor: "pointer"}} id="reg-btn" onClick={() => {
                            router.push({pathname: '/mypage/profile/edit'}).then()
                        }}>編集する</a>
                    </div>
                )
            })}

            <Footer/>
        </>
    )
}

export default ProfileContainer;