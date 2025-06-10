import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { SideMenu } from "@/components";

export const Header = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user?.id ? await getUserById(session.user.id) : null;

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
            <div className={styles.nav}>
                <div className={styles.users}>
                    <p>{user?.username}さん</p>
                    <SideMenu />
                    <Image
                        src="/images/icon1.png"
                        width={55}
                        height={55}
                        alt="icon"
                        priority
                    />
                </div>
            </div>
        </header>
    );
};
