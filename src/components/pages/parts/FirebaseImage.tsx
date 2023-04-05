import React from "react";

interface FirebaseImageProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    id?: string;
}

const FirebaseImage: React.FC<FirebaseImageProps> = (props) => {

    return (
        <>
            {props.src !== '' && props.src !== null ? <img src={props.src} alt={props.alt} width={props.width}
                                     height={props.height} id={props.id}/> : null}
        </>
    );
}

export default FirebaseImage
