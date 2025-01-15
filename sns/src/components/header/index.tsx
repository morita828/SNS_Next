import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";


type HeaderProps = {
    children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className={styles.header}>
            <Image
                className={styles.img}
                src="/images/atlas.png"
                width={300}
                height={110}
                alt="Atlas"
                priority
            />
            <div className={styles.nav}>{children}</div>
        </header>
    );
};
