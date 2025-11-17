"use client";

import { useState } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { Header, SideBar } from "@/components";

export default function Page() {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className={styles.row}>
        <div className={styles.contents}>
          <div className={styles.wrapper}>
            <div className={styles.inner}>
              <input
                type="text"
                className={styles.searchBox}
                placeholder="ユーザー名"
                value={search}
                onChange={handleSearchChange}
              />
              <Image
                src="/images/search.png"
                width={50}
                height={50}
                alt="icon"
                style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                priority
              />
              <h2>検索ワード：</h2>
            </div>
          </div>
          <div className={styles["post-item"]}>
            <Image
              src="/images/icon1.png"
              width={50}
              height={50}
              alt="icon"
              style={{ width: "50px", height: "50px" }}
              priority
            />
            <p>ユーザー名</p>
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
