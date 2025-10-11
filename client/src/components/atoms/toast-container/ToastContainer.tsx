"use client";
import React from "react";
import { Flip, ToastContainer } from "react-toastify";

const ToastContainerComponent = () => {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            style={{ padding: 0 }}
            pauseOnHover
            theme="colored"
            transition={Flip}
        />
    );
};

export default ToastContainerComponent;
