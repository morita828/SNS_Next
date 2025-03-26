"use client";
import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

export const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    // メニューの開閉を切り替える
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // メニュー項目をクリックしたときにメニューを閉じる
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

    return (
        <div className={styles.container}>
            <button onClick={toggleMenu} className={styles.arrowButton}>
                <Image
                    src={isOpen ? "/images/arrow-up.png" : "/images/arrow-down.png"}
                    width={20}
                    height={20}
                    alt="icon"
                />
            </button>

            {/* メニュー表示 */}
            <nav className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
                <ul>
                    <li><a href="/login/top">HOME</a></li>
                    <li><a href="/login/profile">プロフィール編集</a></li>
                    <li><a href="/logout/login">ログアウト</a></li>
                </ul>
            </nav>
        </div>
    );
};
