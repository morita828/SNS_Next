"use client";

import React, { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./index.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ children, ...props }, ref) => {
        return (
            <button className={styles.button} ref={ref} {...props}>
                {children}
            </button>
        );
    },
);

Button.displayName = "Button";
