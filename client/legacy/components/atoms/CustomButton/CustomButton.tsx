import React from "react";
import "./CustomButton.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomButton = ({ leftIcon, rightIcon, children, ...props }: any) => {
    return (
        <button
            className={`custom-button ${props.containerClassName}`}
            {...props}>
            <div className={`button-content ${props.className}`}>
                {leftIcon}
                {children}
                {rightIcon}
            </div>
        </button>
    );
};

export default CustomButton;
