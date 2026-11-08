import { prisma } from "../../src/database";

export async function resetDatabase() {
    const deleteAllUsers = prisma.user.deleteMany();
    const deleteAllPosts = prisma.post.deleteMany();
    const deleteAllComments = prisma.comment.deleteMany();
    const deleteAllMembers = prisma.member.deleteMany();
    const deleteAllVote = prisma.vote.deleteMany();

    try {
      await prisma.$transaction([
        deleteAllComments,
        deleteAllVote,
        deleteAllPosts,
        deleteAllMembers,
        deleteAllUsers,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }