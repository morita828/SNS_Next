import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";

type LogoutProps = {
  children: React.ReactNode;
}

export const Logout: React.FC<LogoutProps> = ({children}) => {
  return (
    <div className={styles.global}>
      <div className={styles.logo}>
        <Image className={styles.img}
        src="/images/atlas.png"
        width={300}
        height={110}
        alt="Atlas"
        priority
      />
      <p>Social Network Service</p>
      </div>
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
    );
};
