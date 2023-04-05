import React from "react";
import useFirebaseStorageImage from "../../../hooks/useFirebaseStorageImage";
import Image from "next/image"

interface FirebaseImageProps {
    path?: string;
    className: string;
    isLazy: boolean;
    alt?: string;
    width?: number;
    height?: number;
    id?: string;
    useDivImg?: boolean;
    borderRadius?: number;
}

const FirebaseImage: React.FC<FirebaseImageProps> = (props) => {
    const {imageUrl} = useFirebaseStorageImage(props.path);

    return (
        <>
            {imageUrl && props.width === undefined && props.height === undefined &&
                <img
                    className={props.className}
                    loading={props.isLazy ? 'lazy' : undefined}
                    src={imageUrl}
                    alt={props.alt}
                    key={props.path}
                />
            }
            {props.useDivImg ? <div id={props.id} className={props.className}
                                    style={{
                                        height: props.height,
                                        width: props.width,
                                        borderRadius: props.borderRadius + '%',
                                        backgroundImage: 'url(' + imageUrl + ')',
                                    }}>
            </div> : <img
                className={'lazy'}
                loading={props.isLazy ? 'lazy' : undefined}
                src={imageUrl}
                alt={props.alt}
                key={props.path}
                height={props.height}
                width={props.width}
                id={props.id}
            />}
            {!props.useDivImg && imageUrl && props.width !== undefined && props.height !== undefined &&
                <Image
                    className={props.className}
                    loading={props.isLazy ? 'lazy' : undefined}
                    src={imageUrl}
                    alt={props.alt}
                    key={props.path}
                    height={props.height}
                    width={props.width}
                />
            }
        </>
    )
        ;
}

export default FirebaseImage
