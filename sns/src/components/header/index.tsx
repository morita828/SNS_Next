import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";


type HeaderProps = {
    children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header className={styles.header}>
            <Link href="/login/top">
                <Image
                    className={styles.img}
                    src="/images/atlas.png"
                    width={300}
                    height={110}
                    alt="Atlas"
                    priority
                />
            </Link>
            <div className={styles.nav}>{children}</div>
        </header>
    );
};
