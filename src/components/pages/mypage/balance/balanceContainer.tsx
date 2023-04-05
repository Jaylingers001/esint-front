import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import React, {useEffect} from "react";
import useBalance from "../../../../hooks/useBalance";
import moment from "moment";
import {Form} from "react-final-form";
import TransferDialog from "./transferDialog";


const BalanceContainer = () => {
    const {
        onFirstLoad,
        filterList,
        depositList,
        withdrawList,
        router,
        totalBalance,
        users,
        dateSelect,
        onSubmit,
        handleSubmit,
        register,
        changeStatus,
        bankTransferAppList,
        handleStatusLabel,
        loggedInUser
    } = useBalance();

    useEffect(onFirstLoad, []);
    useEffect(() => filterList('firstLoad', 'deposit'), [loggedInUser]);

    return (
        <>
            <Form onSubmit={onSubmit} render={({}) => {
                return (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CommonMeta/>
                        <div className="mypage-box">
                            <h1 className="innerttl">残高照会</h1>
                            <div id="back-white"><a style={{cursor: "pointer"}} onClick={() => {
                                router.push({pathname: '/mypage'})
                            }}><i
                                className="fas fa-angle-left"/></a></div>
                        </div>
                        <div id="maincont">
                            <div className="block price-m">
                                <p><span>残高合計</span>{(totalBalance).toLocaleString('en-US')}円</p>
                                <div className="btn left"
                                     style={totalBalance > 0 ? {display: "block"} : {display: "none"}}><a href=""
                                                                                                          className="js-modal-open">お振込申請</a>
                                </div>
                            </div>
                            <input type={'text'} {...register("status", {})} style={{display: "none"}}/>
                            <h2 className="subttl">お振込申請履歴</h2>
                            <div className="tab_box">
                                <div className="panel_area">
                                    <div className="">
                                        <div className="block">
                                            <ul className="price-data left">
                                                <li>お振込申請月</li>
                                                <li>
                                                    <select {...register("bankWithDrawDate", {})} id="pet-select">
                                                        {
                                                            dateSelect?.map((item) =>
                                                                <option
                                                                    value={item}>{item.replace('-', '/')}</option>
                                                            )
                                                        }
                                                    </select>
                                                </li>
                                            </ul>
                                            <div className="month-btn left">
                                                <input type="submit" value="月選択" onClick={() => changeStatus('bank')}/>
                                            </div>
                                        </div>
                                        <ul className="price-detail">
                                            {
                                                bankTransferAppList?.map((bankTransfer) =>
                                                    <li>
                                                        <p className="t1">{moment(bankTransfer.createdAt).format('YYYY-MM-DD')}</p>
                                                        <p className={`t2 ${bankTransfer.status !== 3 ? 't2a' : 't2b'}`}>{handleStatusLabel(bankTransfer.status)}</p>
                                                        <p className="t3">{bankTransfer.gmoBankName !== '' ? bankTransfer.gmoBankName :
                                                            <br/>}</p>
                                                        <p className="t4">{(bankTransfer.gmoAmount).toLocaleString('en-US')}円</p>
                                                    </li>
                                                )
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div>&nbsp;</div>

                                <h2 className="subttl">お取引履歴</h2>
                                <div className="tab_box">
                                    <div className="btn_area">
                                        <p className="tab_btn active">入金履歴</p>
                                        <p className="tab_btn">出金履歴</p>
                                    </div>
                                    <div className="panel_area">
                                        <div className="tab_panel active">
                                            <div className="block">
                                                <ul className="price-data left">
                                                    <li>お取引月</li>
                                                    <li>
                                                        <select {...register("depositDate", {})} id="pet-select">
                                                            {
                                                                dateSelect?.map((item) =>
                                                                    <option
                                                                        value={item}>{item.replace('-', '/')}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </li>
                                                </ul>
                                                <div className="month-btn left">
                                                    <input type="submit" value="月選択"
                                                           onClick={() => changeStatus('deposit')}/>
                                                </div>
                                            </div>
                                            <ul className="price-detail">
                                                {
                                                    depositList?.filter((item) => item.status === 3 && item.contractorId === loggedInUser?.id).map((payment) =>
                                                        <li><p
                                                            className="t1">{moment(payment.createdAt).format('YYYY-MM-DD')}</p>
                                                            <p className="t2 t2a">報酬</p><p
                                                                className="t3">{users?.find((item) => item.id === payment.ordererId)!!.name}</p>
                                                            <p
                                                                className="t4">{(payment.contractorPay).toLocaleString('en-US')}円</p>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="pddl-btn">
                                                <input type="submit" value="ダウンロード"
                                                       onClick={() => changeStatus('print')}/>
                                            </div>
                                        </div>
                                        <div className="tab_panel">
                                            <div className="block">
                                                <ul className="price-data left">
                                                    <li>お取引月</li>
                                                    <li>
                                                        <select {...register("withdrawDate", {})} id="pet-select">
                                                            {
                                                                dateSelect?.map((item) =>
                                                                    <option
                                                                        value={item}>{item.replace('-', '/')}</option>
                                                                )
                                                            }
                                                        </select>
                                                    </li>
                                                </ul>
                                                <div className="month-btn left">
                                                    <input type="submit" value="月選択"
                                                           onClick={() => changeStatus('withdraw')}/>
                                                </div>
                                            </div>
                                            <ul className="price-detail">
                                                {
                                                    withdrawList?.filter((item) => item.status === 3 && item.ordererId === loggedInUser?.id).map((payment) =>
                                                        <li><p
                                                            className="t1">{moment(payment.createdAt).format('YYYY-MM-DD')}</p>
                                                            <p className="t2 t2b">発注</p><p
                                                                className="t3">{users?.find((item) => item.id === payment.contractorId)!!.name}</p>
                                                            <p
                                                                className="t4">{(payment.price).toLocaleString('en-US')}円</p>
                                                        </li>
                                                    )
                                                }
                                            </ul>
                                            <div className="pddl-btn">
                                                <input type="submit" value="ダウンロード"
                                                       onClick={() => changeStatus('print')}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Footer/>
                        <TransferDialog router={router}/>
                    </form>
                );
            }}/>
        </>
    )
}

export default BalanceContainer;