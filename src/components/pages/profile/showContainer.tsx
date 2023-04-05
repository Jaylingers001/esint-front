import React, {useEffect} from "react";
import CommonMeta from "../../CommonMeta";
import Footer from "../parts/Footer";
import {useRouter} from "next/router";
import useProfile from "../../../hooks/useProfile";
import FirebaseImage from "../parts/FirebaseImage";

const ProfileShowContainer = () => {
    const router = useRouter();
    let urlProps = router.asPath.split('/');
    let id = Number(urlProps[3]);
    const {getUserDetailsById, getAreaList, backToPrevPage, areaList, userData, areaName,} = useProfile();

    useEffect(getAreaList, []);
    useEffect(() => getUserDetailsById(id), [areaList, id]);

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">プロフィール</h1>

                <div id="back-white"><a style={{cursor: "pointer"}} onClick={() => {
                    backToPrevPage()
                }}><i
                    className="fas fa-angle-left"/></a></div>
            </div>

            {userData?.map((data, index) => {
                return (
                    <div id="maincont">
                        <div id="profile-box">
                            <div id="icon">
                                <FirebaseImage src={data.profilePublicImageUrl} alt={'icon'}
                                               width={270} height={270}/>
                            </div>
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
                        <p className="freearea" style={{whiteSpace: 'pre'}}>{data.selfIntroduction}</p>
                    </div>
                )
            })}

            <Footer/>
        </>
    )
}

export default ProfileShowContainer;