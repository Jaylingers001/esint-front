import React from "react";

export const loadScript = async (url: string) => {
    return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = url;
        script.addEventListener("load", function () {
            resolve();
        });
        script.addEventListener("error", function (e) {
            reject();
        });
        document.body.appendChild(script);
    });
};


interface PlusMinusLabelNumberProps {
    value?: number;
}

export const PlusMinusLabelNumber: React.FC<PlusMinusLabelNumberProps> = (props) => {
    return (
        <>
            {props.value !== undefined && props.value > 0 &&
            <span className={"c-plus"}>+</span>
            }
            {props.value !== undefined && props.value.toLocaleString()}
        </>
    );
}

export const loadSlick = async () => {
    await loadScript("/assets/slick/slick.min.js");
    await loadScript("/assets/js/custom.js");
}
