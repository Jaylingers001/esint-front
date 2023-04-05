import React, {useEffect, useState} from "react";
import {Field, useField} from "react-final-form";
import TextFields from "../../util/TextField";
import {usePostCode} from "../../../hooks/usePostCode";
import InputChangeUtil from "../../util/InputChangeUtil";
import SignUpDao from "../../../dao/SignUpDao";
import {ApiAreaTree, ApiGenre} from "../../../openapi";
import {NEGATIVE_NUMBER_ONE} from "../../../const/constants";

const PostalCodeContainer: React.FC = () => {
    const {getAddressValues, loadAddress} = usePostCode();
    const [areaList, setAreaList] = useState<ApiAreaTree[]>();
    const [genresList, setGenresList] = useState<ApiGenre[]>();

    const address1Field = useField('address1');
    const areaId = useField('areaId');
    const genresField = useField('genreIds');

    const [selected, setSelected] = useState<Array<number>>([]);
    const onChange = (event: any) => {
        console.log('value', event.target.value)
        if (event.target.checked) {
            if (!selected?.includes(event.target.value)) {
                setSelected([...selected!!, event.target.value])
            }
        } else {
            setSelected(selected?.filter((d: number) => d !== event.target.value))
        }
    }

    const setAddressValues = () => {
        let area = areaList?.find(item => item.name === InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address1))
        areaId.input.onChange(area?.id)
        address1Field.input.onChange(InputChangeUtil().changeKanaAndHalfWidth(getAddressValues().address2));
    }

    const setGenresValues = () => {
        genresField.input.onChange(selected);
    }

    const getAreaList = () => {
        const fn = async () => {
            const data = await SignUpDao().getArea()
            setAreaList(data)
        }
        fn().then()
    }

    const getGenreList = () => {
        const fn = async () => {
            const data = await SignUpDao().getGenres()
            setGenresList(data)
        }
        fn().then()
    }

    useEffect(getAreaList, [])
    useEffect(getGenreList, [areaList])
    useEffect(setGenresValues, [selected])


    return (
        <>
            <p className="input-txt">郵便番号</p>
            <div id="post-input">
                <Field name={'postalCode1'}
                       render={({input, meta}) =>
                           <TextFields
                               dataCy={'postalCode1'}
                               input={input}
                               meta={meta}
                               placeholder={''}
                               required={true}
                               maxLength={3}
                               minLength={3}
                               className={"login-input75"}
                               onKeyUp={loadAddress}
                           />
                       }
                />-
                <Field name={'postalCode2'}
                       render={({input, meta}) =>
                           <TextFields
                               dataCy={'postalCode2'}
                               input={input}
                               meta={meta}
                               placeholder={''}
                               required={true}
                               maxLength={4}
                               minLength={4}
                               className={"login-input75"}
                               onKeyUp={loadAddress}
                           />
                       }
                />
                <input id="input-search" className="input-search"
                       type="button"
                       value="住所を検索"
                       onClick={setAddressValues}
                />
                <input style={{display: 'none'}} name={'address1Auto'}
                       id={'address1Auto'}/>
                <input style={{display: 'none'}} name={'address2Auto'}
                       id={'address2Auto'}/>
            </div>

            <p className="input-txt">都道府県</p>
            <div id="post-input">
                <Field name="areaId"
                       render={({input, meta}) =>
                           <select data-cy={'areaId'} {...input} required={true}>
                               <option value="">都道府県</option>
                               {areaList?.map((data, index) => {
                                   {
                                       return (
                                           input.value === data.id || getAddressValues().address1 === data.name
                                               ?
                                               <option selected value={data.id}
                                                       key={index}>{data.name}</option>
                                               :
                                               <option value={data.id} key={index}>{data.name}</option>
                                       )
                                   }
                               })}
                           </select>
                       }>
                </Field>
            </div>

            <p className="input-txt">市区町村</p>
            <Field name={'address1'}
                   render={({input, meta}) =>
                       <TextFields
                           dataCy={'address1'}
                           input={input}
                           meta={meta}
                           placeholder={''}
                           required={true}
                           maxLength={20}
                           className={"login-input"}
                       />
                   }
            />

            <p className="input-txt">番地</p>
            <Field name={'address2'}
                   render={({input, meta}) =>
                       <TextFields
                           dataCy={'address2'}
                           input={input}
                           meta={meta}
                           placeholder={''}
                           required={true}
                           maxLength={20}
                           className={"login-input"}
                       />
                   }
            />

            <p className="input-txt">ジャンル</p>
            <div id="genre-input">
                {genresList?.sort((a, b) => {
                    if (a.position > b.position) {
                        return 1;
                    } else if (a.position < b.position) {
                        return NEGATIVE_NUMBER_ONE;
                    } else {
                        return a.id!! > b.id!! ? 1 : NEGATIVE_NUMBER_ONE;
                    }
                }).map((data) => {
                    return (
                        <label key={data.id}>
                            <Field name={"genreIds"}
                                   render={({input, meta}) =>
                                       <input id={'cb' + data.id}
                                              onClick={onChange}
                                              value={data.id}
                                              type={"checkbox"}
                                       />
                                   }
                            />
                            {data.name}
                        </label>
                    )
                })}
            </div>

        </>
    );
}

export default PostalCodeContainer