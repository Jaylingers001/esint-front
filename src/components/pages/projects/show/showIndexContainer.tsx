import React from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from '../../parts/Footer';
import moment from "moment";
import useFavorite from '../../../../hooks/useFavorite'
import useProjected from '../../../../hooks/useProjected'
import {LINK_TO_URL} from "../../../../const/constants";
import useEmptyPages from "../../../../hooks/useEmptyPages";

export interface showProps {

}

const ProjectShowContainer: React.FC<showProps> = (props) => {
    const {
        projects,
        hashtags,
        formatDate,
        area,
        comment,
        visibility,
        linkTo,
        isProjectApplication,
        router
    } = useProjected();
    const {addToFavorites, favorite} = useFavorite();
    const {backToPrevPage} = useEmptyPages();

    return (
        <>
            <CommonMeta/>
            <div id="dheader">
                <div id="back-green"><a onClick={backToPrevPage} href={'#'}><i className="fas fa-angle-left"/></a></div>
            </div>

            <div id="maincont">
                <div className="detail-box">
                    <p className="time"
                       id={"time"}>募集期間:{moment(projects?.recruitingStartDate).format('M/DD')}〜{moment(projects?.recruitingEndDate).format('M/DD')}</p>
                    <p className="title" id={'title'}>{projects?.name}</p>
                    <a data-cy={'profilebtn'} href={`/profile/show/${projects?.ordererId}`} className="profilebtn"
                       id={'profilebtn'}>プロフィールを見る<i
                        className="fas fa-chevron-circle-right"/></a>
                    <table className="dtable" width="100%" cellSpacing="0">
                        <tbody>
                        <tr>
                            <th><img src={"/assets/image/search-icon2.jpg"} alt={'ジャンル'} width={'17.77'} height={'16'}/>ジャンル
                            </th>
                            <td>
                                {projects?.genres?.map((data, index, length) => {
                                    if (length.length - 1 > index) {
                                        return data.name + ', '
                                    } else {
                                        return data.name
                                    }
                                })}
                            </td>
                        </tr>
                        <tr>
                            <th><img src={"/assets/image/search-icon3.jpg"} alt={'募集人数'}/>募集人数</th>
                            <td>{projects?.stock}人</td>
                        </tr>
                        <tr>
                            <th><img src={"/assets/image/search-icon4.jpg"} alt={'現場の日'}/>現場の日</th>
                            <td>{moment(projects?.workStartDate).format('M')}月{moment(projects?.workStartDate).format('D')}日</td>
                        </tr>
                        <tr>
                            <th><img src={"/assets/image/search-icon5.jpg"} alt={'拘束時間'}/>拘束時間</th>
                            <td>
                                {moment(projects?.restraintStartDate).format('M')}月{moment(projects?.restraintStartDate).format('D')}日 &nbsp;
                                {Number(moment(projects?.restraintStartDate).format('HH')) + ':' + moment(projects?.restraintStartDate).format('mm')}
                                &nbsp;〜&nbsp;
                                {moment(projects?.restraintEndDate).format('M')}月{moment(projects?.restraintEndDate).format('D')}日 &nbsp;
                                {Number(moment(projects?.restraintEndDate).format('HH')) + ':' + moment(projects?.restraintEndDate).format('mm')}
                            </td>
                        </tr>
                        <tr>
                            <th><img src={"/assets/image/search-icon6.jpg"} alt={'場所'}/>場所</th>
                            <td>{area?.name} {projects?.address1} {projects?.address2}</td>
                        </tr>
                        <tr>
                            <th><img src={"/assets/image/search-icon7.jpg"} alt={'金額'}/>金額</th>
                            <td>{(projects?.minPrice)?.toLocaleString()}円〜{(projects?.maxPrice?.toLocaleString())}円</td>
                        </tr>
                        </tbody>
                    </table>
                    <ul className="category">
                        {hashtags.map((item, count) => {
                            return <li key={count}><i className="fas fa-tag"/>{item}</li>
                        })}
                    </ul>
                </div>

                <h2 className="subttl">コメント</h2>
                <p key={projects?.id} className="txtarea bottom100">{comment}</p>
                <div id="in8-button">
                        <span id="b1">
                            <input type="submit" value="会 話" onClick={() => linkTo(LINK_TO_URL.THREADS)}/>
                        </span>
                    {visibility &&
                    <span id="b2" data-cy={'linkToProjApplication'}>
                            <input type="submit" value={isProjectApplication ? '案件管理' : '応 募'}
                                   onClick={() => linkTo(LINK_TO_URL.APPLICATIONS)}/>
                        </span>
                    }
                    <span id="b3" data-cy={'heartToggle'} className={favorite?.activeHeart ? 'button one' : 'button'}
                          onClick={addToFavorites}>
                        <i className="fas fa-heart"/>
                    </span>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ProjectShowContainer;