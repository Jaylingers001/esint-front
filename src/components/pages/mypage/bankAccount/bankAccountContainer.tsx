import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import React from "react";
import {Field, Form} from "react-final-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import TextFields from "../../../util/TextField";
import useBankAccount from "../../../../hooks/useBankAccount";


const BankAccountContainer = () => {

    const {
        router,
        bank,
        onSubmit,
        bankValue,
        edit,
        branchValue,
        branchOptions,
        onChangeMe,
        banksOptions,
        isErrorOfBankName,
        errorBankName,
        errorBranchName,
        errorGmoBankAccountNumber,
        errorGmoBankAccountName,
    } = useBankAccount()

    const [isErrorOfBank, setIsErrorOfBank] = React.useState(false);
    return (
        <>
            <CommonMeta/>
            <div className="mypage-box">
                <h1 className="innerttl">振込先設定</h1>
                <div id="back-white">
                    <a href="#">
                        <i className="fas fa-angle-left" onClick={() => router.back()}/>
                    </a>
                </div>
            </div>
            <div id="maincont">
                <div id="inner-icon">
                    <img src={"/assets/image/icon-no.27.jpg"} alt="" width="50" height="200"/>
                </div>
                <p className="center-txt center-pb30">振込先を入力してください</p>
                <h2 className="subttl">口座情報</h2>
                <Form initialValues={bank} onSubmit={onSubmit} render={({values, handleSubmit}) => {
                    return (
                        <form onSubmit={handleSubmit}>
                            <ul className="detail-list">
                                <li><h3>銀行</h3>
                                    <p className={'unsetWidth'}>
                                        <Field name={'gmoBankName'}
                                               render={({input, meta}) =>
                                                   <Autocomplete
                                                       filterOptions={(options) => options}
                                                       freeSolo={true}
                                                       value={bankValue}
                                                       onInputChange={(event: any, newValue: string | null) => {
                                                           onChangeMe(newValue!, 1)
                                                       }}
                                                       onBlur={() => {
                                                           setIsErrorOfBank(isErrorOfBankName(bankValue))
                                                       }}
                                                       id="combo-box-demo"
                                                       options={banksOptions}
                                                       renderInput={(params) =>
                                                           <TextField {...params} placeholder={'銀行名が入ります'}/>}
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
                                        <Field name={'gmoBankBranchName'}
                                               render={({input, meta}) =>
                                                   <Autocomplete
                                                       filterOptions={(options) => options}
                                                       disabled={isErrorOfBank}
                                                       freeSolo={true}
                                                       value={branchValue}
                                                       onInputChange={(event: any, newValue: string | null) => {
                                                           onChangeMe(newValue!, 2)
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
                                                           disabled={edit}
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
                                                       className={"login-input135"}
                                                       disabled={edit}
                                                       type={'number'}
                                                   />
                                               }
                                        />
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
                                                       disabled={edit}
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
                            <p className="cc-attn">※口座番号が7桁未満の場合は、先頭に0をつけて7桁にしてください<br/>(例：12345の場合
                                0012345)</p>
                            <p className="cc-attn">※入力した口座名と振込先が一致しない場合、振込を受け取ることができません。振込先口座名義を必ずご確認の上、ご入力ください。
                            </p>
                            <input data-cy={'submit'} style={{
                                color: '#fff', backgroundColor: '#2cab7c', borderWidth: 0, cursor: "pointer"
                            }} type="submit" value={'変更する'}
                                   name="" id="reg-btn"/>
                        </form>
                    );
                }}/>
            </div>
            <Footer/>
        </>
    )
}


export default BankAccountContainer;