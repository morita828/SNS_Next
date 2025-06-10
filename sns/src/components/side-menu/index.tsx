"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import { signOut } from "next-auth/react";

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!document.getElementById("sideMenu")?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [isOpen]);

    const handleLogout = async () => {
    setIsLoggingOut(true); // ログアウト処理中であることを示す
    try {
        await signOut({ callbackUrl: "/logout/login" }); // ← セッション削除 + リダイレクト
    } catch (error) {
        console.error("ログアウトに失敗しました", error);
    } finally {
        setIsLoggingOut(false); // 失敗しても必ずフラグを戻す
    }
};

    return (
        <div className={styles.container} id="sideMenu">
            <button onClick={toggleMenu} className={styles.arrowButton} type="button">
                <Image
                    src={isOpen ? "/images/arrow-up.png" : "/images/arrow-down.png"}
                    width={20}
                    height={20}
                    alt="icon"
                />
            </button>

            <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
                <ul>
                    <li><Link href="/login/top">HOME</Link></li>
                    <li><Link href="/login/profile">プロフィール編集</Link></li>
                    <li><button onClick={handleLogout} className={styles.logoutButton} type="button" disabled={isLoggingOut}>ログアウト</button></li>
                </ul>
            </nav>
        </div>
    );
};
