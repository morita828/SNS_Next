import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";

import { Header, Button, PostForm } from "@/components";


export default function Page() {
    return (
        <div>
            <Header>
                <div className={styles.users}>
                    <p>〇〇さん</p>
                    <Image
                        src="/images/icon1.png"
                        width={55}
                        height={55}
                        alt="icon"
                        priority
                    />
                </div>
            </Header>
            <div className={styles.row}>
                <div className={styles.contents}>
                    <div className={styles["post-wrapper"]}>
                        <div className={styles["post-inner"]}>
                            <Image
                                src="/images/icon1.png"
                                width={50}
                                height={50}
                                alt="icon"
                                style={{ width: "50px", height: "50px" }}
                                priority
                            />
                            <PostForm />
                            <Image
                                src="/images/post.png"
                                width={50}
                                height={50}
                                alt="post-icon"
                                style={{ width: "50px", height: "50px", borderRadius: "10%" }}
                                priority
                            />
                        </div>
                    </div>
                    <div className={styles["post-item"]}>
                        <p>投稿内容表示エリア</p>
                    </div>
                </div>
                <div className={styles["side-bar"]}>
                    <div className={styles.confirm}>
                        <p>〇〇さんの</p>
                        <div className={styles.section}>
                            <p>フォロー数</p>
                            <p>〇〇人</p>
                        </div>
                        <Button color="blue">フォローリスト</Button>
                        <div className={styles.section}>
                            <p>フォロワー数</p>
                            <p>〇〇人</p>
                        </div>
                        <Button color="blue">フォロワーリスト</Button>
                    </div>
                    <div className={styles["search-button"]}>
                        <Button color="blue">ユーザー検索</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
