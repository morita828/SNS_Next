import prisma from "../src/libs/prisma"; // Prisma クライアントのパスを適宜変更

async function main() {
  const newUser = await prisma.users.create({
    data: {
      username: "test_user",
      mail: "test@example.com",
      password: "hashed_password", // 実際は bcrypt でハッシュ化する
      bio: "",
      images: "icon1.png",
    },
  });
  console.log("ユーザー作成完了:", newUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
