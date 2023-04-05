import {SetStateAction, useEffect, useState} from "react";
import {getDownloadURL, ref} from "firebase/storage";
import {firebaseStorage} from "../config/firebaseInitializer";

const useFirebaseStorageImage = (path?: string) => {
    const [imageUrl, setImageUrl] = useState("");
    const [exists, setExists] = useState(true);

    useEffect(() => {
        if (path) {
            const fn = async () => {
                try {
                    getDownloadURL(ref(firebaseStorage, path))
                        .then((url: SetStateAction<string>) => {
                                setImageUrl(url)
                            }
                        )
                        .catch((e: any) => console.warn(e))
                    ;

                } catch (e) {
                    setExists(false);
                    console.warn(e);
                }
            }
            fn().then();
        }
    }, [path]);
    return {
        exists,
        imageUrl,
    }
}

export default useFirebaseStorageImage;

