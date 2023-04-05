import {useEffect, useState} from "react";
import {ApiContact} from "../openapi";
import ContactDao from "../dao/ContactDao";
import {useRouter} from "next/router";
import {useRecoilState} from "recoil";
import {contactState} from '../recoilStates/contactRecoil';

const useContact = () => {
    const router = useRouter();
    const [contact, setContact] = useRecoilState(contactState)

    const stopJump = () => {
        (async () => {
            if (router.isReady && contact.contactType === '') {
                router.push({
                    pathname: '/contact'
                }).then()
            }
        })();
    }

    useEffect(stopJump, [router.isReady]);

    const sendMessage = async () => {
        const data: ApiContact = {
            body: contact.body,
            contactType: contact.contactType,
            email: contact.email,
            name: contact.name,
            tel: contact.tel,
        }

        const success = await ContactDao().sendMessage(data);

        if (success) {
            router.push({
                pathname: '/contact/complete'
            }).then()
        }
    }

    const proceedConfirm = async (values: ApiContact) => {
        setContact(values)
        router.push({
            pathname: '/contact/confirm'
        }).then()
    }

    const clear = () => {
        setContact({
            body: "",
            contactType: "",
            email: "",
            name: "",
            tel: ""
        })
        router.reload();
    }

    const afterComplete = () => {
        router.push({
            pathname: '/contact'
        }).then()

        setContact({
            body: "",
            contactType: "",
            email: "",
            name: "",
            tel: ""
        })
    }

    return {
        router,
        sendMessage,
        proceedConfirm,
        clear,
        contact,
        afterComplete
    }
}

export default useContact;



