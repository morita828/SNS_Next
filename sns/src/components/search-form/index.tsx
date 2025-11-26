"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent } from "react";
import styles from "./index.module.scss";
import Image from "next/image";

type User = {
  id: number;
  username: string;
  images: string;
};

type Props = {
  loginUserId: string;
};

export const SearchForm: React.FC<Props> = ({}) => {};
