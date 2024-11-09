import React from "react";
import styles from "./index.module.scss";

type FormItemProps = {
    children: React.ReactNode;
    label: string;
};

export const FormItem: React.FC<FormItemProps> = ({ children, label }) => {
    return (
        <div className={styles.section}>
            <label className={styles["section-name"]}>{label}</label>
            {children}
        </div>
    );
};
