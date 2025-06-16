import prisma from "../src/libs/prisma";

async function main() {
  await prisma.users.create({
    data: {
      username: "test_user",
      mail: "test@example.com",
      password: "hashed_password",
      bio: "",
      images: "icon1.png",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
