"use client";

import React, { useState } from "react";
import Image from "next/image";

type Props = {
  onModalOpen: () => void;
};

export const EditButton: React.FC<Props> = ({ onModalOpen }) => {
  return (
    <>
      <button onClick={onModalOpen}>
        <Image alt="編集ボタン" src="/images/edit.png" width={24} height={24} />
      </button>
    </>
  );
};
