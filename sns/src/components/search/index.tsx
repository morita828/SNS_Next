"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.scss";

type User = {
  id: string;
  username: string;
  images: string;
};

type Props = {
  mappedUsers: User[];
  loginUserId: string;
};

export const Search: React.FC<Props> = ({ mappedUsers, loginUserId }) => {
  const [users, setUsers] = useState<User[]>(mappedUsers);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchInitialUsers = async () => {
      setLoading(true);
      try {
        // ログイン中ユーザーIDをクエリで渡す
        const res = await fetch(
          `/api/users?excludeId=${encodeURIComponent(loginUserId)}`
        );
        if (!res.ok) return;

        const data: User[] = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("ユーザー取得に失敗しました", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialUsers();
  }, [loginUserId]);

  const handleSearch = async (keyword: string) => {
    setLoading(true);

    try {
      const query = new URLSearchParams();
      query.append("excludeId", loginUserId);
      if (keyword.trim() !== "") {
        query.append("keyword", keyword);
      }
      const res = await fetch(`/api/users?${query.toString()}`);
      if (!res.ok) {
        console.error("検索に失敗しました");
        return;
      }

      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("検索中にエラーが発生しました", err);
    } finally {
      setLoading(false);
    }
  };

  // input が変化したときに search state を更新
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // ボタン押下（または Enter 押下など）で検索をトリガー
  const handleClickSearch = () => {
    handleSearch(search);
  };

  return (
    <div className={styles.contents}>
      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <input
            type="text"
            className={styles.searchBox}
            placeholder="ユーザー名"
            value={search}
            onChange={handleChange}
          />
          <button onClick={handleClickSearch}>
            <Image
              src="/images/search.png"
              width={50}
              height={50}
              alt="icon"
              style={{ width: "50px", height: "50px", borderRadius: "5px" }}
              priority
            />
          </button>
        </div>
      </div>
      <div className={styles.results}>
        {users.map((user) => (
          <div key={user.id} className={styles["post-item"]}>
            <Image
              src={
                user.images.startsWith("/")
                  ? user.images
                  : `/images/${user.images}`
              }
              width={50}
              height={50}
              alt="icon"
              priority
            />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
