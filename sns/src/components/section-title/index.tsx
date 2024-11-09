import React from "react";
import styles from "./index.module.scss";

type SectionTitleProps = {
    children: React.ReactNode;
};

export const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => {
    return <h2 className={styles["h2-title"]}>{children}</h2>;
};
