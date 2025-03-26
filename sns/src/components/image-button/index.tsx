"use client";

import Image from "next/image";
import styles from "./index.module.scss";

type ImageButtonProps = {
  onClick?: () => void;
  imageSrc: string;
  altText: string;
};

export const ImageButton: React.FC<ImageButtonProps> = ({
  onClick,
  imageSrc,
  altText,
}) => (
  <button className={styles.imageButton} onClick={onClick}>
    <Image src={imageSrc} alt={altText} width={50} height={50} />
  </button>
);
