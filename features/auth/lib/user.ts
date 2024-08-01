import { prisma } from "@/globals/db";

// export const getUserByEmail = async (email: string) => {
//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     return user;
//   } catch (error) {
//     return null;
//   }
// };

export const getUserByEmail = async (email: string) => {
  try {
    console.log(`Attempting to find user with email: ${email}`);
    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
    } else {
      console.log(`No user found with email: ${email}`);
    }

    return user;
  } catch (error) {
    console.error(`Error in getUserByEmail: ${error}`);
    return null;
  }
};
