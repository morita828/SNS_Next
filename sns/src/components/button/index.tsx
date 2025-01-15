"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: "red" | "blue";
    className?: string;
};


export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, color = "red", className, ...props }, ref) => {
        const buttonStyle = {
            backgroundColor: color === "red" ? "#ed3b50" : "#0067c6",
            borderColor: color === "red" ? "#ed3b50" : "#0067c6",
        };

        const combinedClassName = [styles.button, className].filter(Boolean).join(" ");

        return (
            <button
                className={combinedClassName}
                style={buttonStyle}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = "Button";
