import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import React from "react";
import {Field, Form} from "react-final-form";
import TextFields from "../../../util/TextField";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useBalanceBankAccount from "../../../../hooks/useBalanceBankAccount";


const BankAccountContainer = () => {

    const [isErrorOfBank, setIsErrorOfBank] = React.useState(false);
    const jsModal = React.useRef(null);

    const {
        router,
        bank,
        onSubmit,
        banksOptions,
        bankValue,
        branchOptions,
        branchValue,
        onChangeMe,
        isErrorOfBankName,
        errorBankName,
        errorBranchName,
        errorGmoBankAccountNumber,
        errorGmoBankAccountName,
    } = useBalanceBankAccount(jsModal);

    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">お振込先情報登録</h1>

                <div id="back-white">
                    <a href="#">
                        <i className="fas fa-angle-left" onClick={() => router.back()}/>
                    </a>
                </div>
            </div>
            <Form initialValues={bank} onSubmit={onSubmit} render={({values, handleSubmit}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div id="maincont">
                            <div id="inner-icon"><img src={"/assets/image/icon-no.25.jpg"} alt="" width="50"
                                                      height="200"/></div>
                            <p className="center-txt center-pb30">お振込先情報を確認してください</p>
                            <h2 className="subttl">口座情報</h2>
                            <ul className="detail-list">
                                <li><h3>銀行</h3>
                                    <p className={'unsetWidth'}>
                                        <Field name={'gmoBankName'} render={({input, meta}) =>
                                            <Autocomplete
                                                filterOptions={(options) => options}
                                                freeSolo={true}
                                                value={bankValue}
                                                onInputChange={(event: any, newInputValue: string | null) => {
                                                    onChangeMe(newInputValue!, 1)
                                                }}
                                                onBlur={() => {
                                                    setIsErrorOfBank(isErrorOfBankName(bankValue))
                                                }}
                                                id="combo-box-demo"
                                                options={banksOptions}
                                                renderInput={(params) =>
                                                    <TextField {...params} placeholder={'銀行名が入ります'}/>
                                                }
                                            />
                                        }
                                        />
                                    </p>
                                    {errorBankName &&
                                        <p style={{
                                            textAlign: 'left',
                                            color: 'red',
                                            fontSize: '14px',
                                            width: '300px'
                                        }}>
                                            {errorBankName}
                                        </p>
                                    }
                                </li>
                                <li>
                                    <h3>支店名</h3>
                                    <p className={'unsetWidth'}>
                                        <Field name={'gmoBankBranchName'} render={({input, meta}) =>
                                            <Autocomplete
                                                filterOptions={(options) => options}
                                                disabled={isErrorOfBank}
                                                freeSolo={true}
                                                value={branchValue}
                                                onInputChange={(event: any, newInputValue: string | null) => {
                                                    onChangeMe(newInputValue!, 2);
                                                }}
                                                id="combo-box-demo"
                                                options={branchOptions}
                                                renderInput={(params) =>
                                                    <TextField {...params} placeholder={'支店名が入ります'}/>}
                                            />
                                        }
                                        />
                                    </p>
                                    {(errorBranchName) &&
                                        <p style={{
                                            textAlign: 'left',
                                            color: 'red',
                                            fontSize: '14px',
                                            width: '300px'
                                        }}>
                                            {errorBranchName}
                                        </p>
                                    }
                                </li>
                                <li><h3>口座種別</h3>
                                    <p>
                                        <Field name="gmoBankAccountType"
                                               render={
                                                   ({input, meta}) =>
                                                       <select
                                                           className={"login-input135"}
                                                           {...input} required={true}
                                                           data-cy={'contactType'}>
                                                           <option value="1">普通預金</option>
                                                           <option value="2">当座預金</option>
                                                           <option value="4">貯蓄預金</option>
                                                       </select>
                                               }>
                                        </Field>
                                    </p>
                                </li>
                                <li>
                                    <h3>口座番号</h3>
                                    <p>
                                        <Field name={'gmoBankAccountNumber'}
                                               render={({input, meta}) =>
                                                   <TextFields
                                                       min={-999999}
                                                       dataCy={'gmoBankAccountNumber'}
                                                       input={input}
                                                       meta={meta}
                                                       placeholder={'口座番号が入ります'}
                                                       type={'number'}
                                                       className={"login-input135"}
                                                   />
                                               }/>
                                    </p>
                                    {(errorGmoBankAccountNumber) &&
                                        <p style={{
                                            textAlign: 'left',
                                            color: 'red',
                                            fontSize: '14px',
                                            width: '235px'
                                        }}>
                                            {errorGmoBankAccountNumber}
                                        </p>
                                    }
                                </li>
                                <li>
                                    <h3>口座名義(カタカナ)</h3>
                                    <p>
                                        <Field name={'gmoBankAccountName'}
                                               render={({input, meta}) =>
                                                   <TextFields
                                                       dataCy={'accountHolder'}
                                                       input={input}
                                                       meta={meta}
                                                       placeholder={'口座名義'}
                                                       maxLength={999}
                                                       className={"login-input135"}
                                                   />
                                               }/>
                                    </p>
                                    {(errorGmoBankAccountName) &&
                                        <p style={{
                                            textAlign: 'left',
                                            color: 'red',
                                            fontSize: '14px',
                                            width: '235px'
                                        }}>
                                            {errorGmoBankAccountName}
                                        </p>
                                    }
                                </li>
                            </ul>
                            <a href="" className="js-modal-open" id="reg-btn">登録する</a>
                        </div>
                        <div className="modal js-modal">
                            <div className="modal__bg js-modal-close"/>
                            <div className="modal__content">
                                <div id="popup">
                                    <div id="cont">
                                        <p id="t1">お振込先情報登録</p>
                                        <p id="t2">この内容で登録いたします。<br/>よろしければ登録ボタンを押してください。</p>
                                        <a id="p-back" ref={jsModal} className="js-modal-close" href="">戻る</a>
                                        <input data-cy={'submit'} style={{
                                            backgroundColor: 'white', borderWidth: 0, cursor: "pointer"
                                        }} type="submit" value={'登録する'} name="" id="p-send"/>
                                    </div>
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


export default BankAccountContainer;