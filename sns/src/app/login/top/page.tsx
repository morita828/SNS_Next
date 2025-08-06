import React from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/next-auth/authOptions";
import { getUserById } from "@/libs/user";
import { redirect } from "next/navigation";
import { Header, PostForm, PostList, SideBar } from "@/components";
import prisma from "@/libs/prisma";

export const dynamic = 'force-dynamic'

export default async function Page() {
    const session = await getServerSession(authOptions);
    const user = session?.user?.id ? await getUserById(session.user.id) : null;

    if (!session?.user?.id) {
        redirect("/logout/login");
    }

    const rawPosts = await prisma.posts.findMany({
        orderBy: {
            created_at: "desc",
        },
        include: {
            user: true,
        },
    });

    const mappedPosts = rawPosts.map((post) => ({
        ...post,
        updated_at: post.updated_at.toISOString(),
    }));

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
                        <PostList posts={mappedPosts} />
                    </div>
                </div>
                <SideBar />
            </div>
        </div>
    );
}
