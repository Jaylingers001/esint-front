import React, {Dispatch, SetStateAction} from "react";
import CommonMeta from "../../../CommonMeta";
import Footer from "../../parts/Footer";
import moment from 'moment'
import {Field, Form, useForm} from "react-final-form";
import useThreads from "../../../../hooks/useThreads";
import {DUMMY_MESSAGE} from '../../../../const/constants'

export interface ShowThreadProps {

}

export interface messageProps {
    body: string,
    projectId: number
}

const ShowContainer: React.FC<ShowThreadProps> = (props) => {

    const {
        projectName, back, reload, messages, typeMessage, proceedConfirm, clear, setClear, cardRef
    } = useThreads();

    return (
        <>
            <CommonMeta/>
            <h1 className="innerttl border-gray" id="ttl" data-cy={'title'}>{projectName}
                <a onClick={back} data-cy={'back'}>
                    <i className="fas fa-angle-left"/>
                </a>
                <a onClick={reload} id="reload" data-cy={'reload'}>
                    <i className="fas fa-redo"/>
                </a>
            </h1>
            <div id="maincont">
                <div id="contents" style={{paddingBottom: '130px'}} data-cy={'contents'}>
                    {messages?.map((data, index) => {
                        if (data.body === DUMMY_MESSAGE)
                            return
                        if (data.isSenderOfUser) {
                            return (
                                <div className="threadsingle-box-me" data-cy={'message-' + index}>
                                    <div className="time">{moment(data.createdAt).format('YYYY/MM/DD H:mm')}</div>
                                    <div className="balloon" style={{whiteSpace: "pre-wrap"}}>{data.body}</div>
                                </div>
                            )
                        } else {
                            return (
                                <div className={"threadsingle-box"} data-cy={'message-' + index}>
                                    <div className="img">
                                        <img src={data.senderProfilePublicImageUrl} alt="icon" width="270"
                                             height="270"/>
                                    </div>
                                    <div className="cont">
                                        <div className="time block"><h2>{data.senderName}</h2>
                                            <p>{moment(data.createdAt).format('YYYY/MM/DD H:mm')}</p>
                                        </div>
                                        <div className="balloon">{data.body}</div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
                <div ref={cardRef}/>
                <Form initialValues={typeMessage} onSubmit={proceedConfirm} render={({values, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div id="int-button">
                            <MessageForm body={values.body} projectId={values.projectId} clear={clear}
                                         setClear={setClear}/>
                        </div>
                    </form>
                )}
                />
            </div>
            <Footer/>
        </>
    )
}

interface MessageBodyProps {
    body?: string,
    projectId?: number,
    clear?: boolean,
    setClear: Dispatch<SetStateAction<boolean>>;
}

const MessageForm: React.FC<MessageBodyProps> = (props) => {
    const form = useForm();

    if (props.clear) {
        form.change('body', '');
        props.setClear(false)
    }

    return (
        <>
            <Field name="body"
                   render={
                       ({input, meta}) => (
                           <div id="textarea">
                               <textarea
                                   data-cy={'body'}
                                   className="login-textarea"
                                   placeholder="メッセージを入力"
                                   cols={5}
                                   rows={5}
                                   required={true}
                                   {...input}
                                   value={props.body}
                                   maxLength={255}
                               />
                           </div>
                       )
                   }>
            </Field>
            <Field name={"projectId"} type={'hidden'} render={({input}) => (
                <input {...input} value={props?.projectId}/>
            )}>
            </Field>
            <input type="submit" value="送信" data-cy={'submit'}/>
        </>
    )
}


export default ShowContainer;