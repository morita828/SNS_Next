import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { redirect } from "next/navigation";
import { Header, Button, Post, PostForm } from "@/components";
import prisma from "@/libs/prisma";


export default async function Page() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/logout/login");
    }

    const posts = await prisma.posts.findMany({
        orderBy: {
            created_at: "desc",
        },
        include: {
            user: true,
        },
    });

    return (
        <div>
            <Header />
            <div className={styles.row}>
                <div className={styles.contents}>
                    <div className={styles["wrapper"]}>
                        <div className={styles["inner"]}>
                            <Image
                                src="/images/icon1.png"
                                width={50}
                                height={50}
                                alt="icon"
                                style={{ width: "50px", height: "50px" }}
                                priority
                            />
                            <PostForm />
                        </div>
                    </div>
                    <div>
                        {posts.map((post) => (
                            <Post
                                key={post.id}
                                userIcon={`/images/${post.user.images}`}
                                userName={post.user.username}
                                content={post.post}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles["side-bar"]}>
                    <div className={styles.confirm}>
                        <p>〇〇さんの</p>
                        <div className={styles.section}>
                            <p>フォロー数</p>
                            <p>〇〇人</p>
                        </div>
                        <Button color="blue">
                            <Link href="/login/follow-list">フォローリスト</Link>
                        </Button>
                        <div className={styles.section}>
                            <p>フォロワー数</p>
                            <p>〇〇人</p>
                        </div>
                        <Button color="blue">
                            <Link href="/login/follower-list">フォロワーリスト</Link>
                        </Button>
                    </div>
                    <div className={styles["search-button"]}>
                        <Button color="blue">
                            <Link href="/login/search">ユーザー検索</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
