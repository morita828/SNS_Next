import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

import { Header, Button } from "@/components";


export default function Page() {
    return (
        <div>
            <Header>
                <div className={styles.users}>
                    <p>〇〇さん</p>
                    <Image
                            src="/images/icon1.png"
                            width={50}
                            height={50}
                            alt="icon"
                            priority
                      />
                </div>
            </Header>
            <div className={styles.row}>
                <div className={styles.wrapper}>
                    <Image
                        src="/images/icon1.png"
                        width={50}
                        height={50}
                        alt="icon"
                        priority
                    />
                    <p>投稿内容を入力してください</p>
                </div >
                <div className={styles["side-bar"]}>
                    <div className={styles.confirm}>
                        <p>〇〇さんの</p>
                        <div>
                            <p>フォロー数</p>
                            <p>〇〇名</p>
                        </div>
                        <Button color="blue">フォローリスト</Button>
                        <div>
                            <p>フォロワー数</p>
                            <p>〇〇名</p>
                        </div>
                        <Button color="blue">フォロワーリスト</Button>
                    </div>
                    <Button color="blue">ユーザー検索</Button>
                </div>
            </div>
        </div>
    );
}
