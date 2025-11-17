"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components";

type LinkButtonProps = {
  href: string;
  color?: "red" | "blue";
  children: React.ReactNode;
};

export const LinkButton = ({
  href,
  color = "red",
  children,
}: LinkButtonProps) => {
  const router = useRouter();

  return (
    <Button color={color} onClick={() => router.push(href)}>
      {children}
    </Button>
  );
};
