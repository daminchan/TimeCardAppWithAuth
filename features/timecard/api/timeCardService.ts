"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/globals/db";
import { TimeCard } from "../types";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1秒

async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastError;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      return await fn();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed. Retrying...`);
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }
  throw lastError;
}

export const startWork = async (
  userId: string
): Promise<{ message: string; timeCard: TimeCard }> => {
  try {
    const newTimeCard = await prisma.timeCard.create({
      data: {
        userId: userId,
        date: new Date(),
        startTime: new Date(),
      },
    });

    return {
      message: "出勤処理が成功しました。",
      timeCard: {
        id: newTimeCard.id,
        userId: newTimeCard.userId,
        date: newTimeCard.date,
        startTime: newTimeCard.startTime,
        endTime: newTimeCard.endTime,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`出勤処理に失敗しました。${error.message}`);
    }
    throw new Error("出勤処理に失敗しました。");
  }
};

export const endWork = async (
  userId: string
): Promise<{ message: string; timeCard: TimeCard }> => {
  try {
    const timeCard = await prisma.timeCard.findFirst({
      where: {
        userId: userId,
        endTime: null,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (timeCard) {
      const updatedTimeCard = await prisma.timeCard.update({
        where: {
          id: timeCard.id,
        },
        data: {
          endTime: new Date(),
        },
      });

      return {
        message: "退勤処理が成功しました。",
        timeCard: {
          id: updatedTimeCard.id,
          userId: updatedTimeCard.userId,
          date: updatedTimeCard.date,
          startTime: updatedTimeCard.startTime,
          endTime: updatedTimeCard.endTime,
        },
      };
    } else {
      throw new Error("出勤情報が見つかりません。");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`退勤処理に失敗しました。${error.message}`);
    }
    throw new Error("退勤処理に失敗しました。");
  }
};

export const getTimeCards = async (userId: string) => {
  return withRetry(async () => {
    const timeCards = await prisma.timeCard.findMany({
      where: { userId: userId },
      orderBy: { date: "desc" },
    });
    return timeCards;
  });
};

export const getTimeCard = async (userId: string): Promise<TimeCard | null> => {
  try {
    const timeCard = await prisma.timeCard.findFirst({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    if (timeCard) {
      return {
        id: timeCard.id,
        userId: timeCard.userId,
        date: timeCard.date,
        startTime: timeCard.startTime,
        endTime: timeCard.endTime,
      };
    }

    return null;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`タイムカードの取得に失敗しました。${error.message}`);
    }
    throw new Error("タイムカードの取得に失敗しました。");
  }
};

// export async function getUserTimeCards(userId: string): Promise<TimeCard[]> {
//   try {
//     const data = await prisma.timeCard.findMany({
//       where: { userId: userId },
//       orderBy: { date: "desc" },
//     });

//     return data
//       .filter((card) => card.startTime !== null)
//       .map((card) => ({
//         id: card.id,
//         clockIn: card.startTime as Date,
//         clockOut: card.endTime,
//       }));
//   } catch (error) {
//     console.error("タイムカードデータの取得に失敗しました:", error);
//     return [];
//   }
// }

export async function getUserTimeCards(userId: string): Promise<TimeCard[]> {
  try {
    const data = await prisma.timeCard.findMany({
      where: { userId: userId },
      orderBy: { date: "desc" },
    });

    return data
      .filter((card) => card.startTime !== null)
      .map((card) => ({
        id: card.id,
        userId: card.userId,
        date: card.date,
        startTime: card.startTime,
        endTime: card.endTime,
      }));
  } catch (error) {
    console.error("タイムカードデータの取得に失敗しました:", error);
    return [];
  }
}

export async function deleteTimeCard(id: string): Promise<void> {
  try {
    await prisma.timeCard.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error("タイムカードの削除に失敗しました:", error);
    throw error;
  }
}

export async function deleteMonthTimeCards(
  startDate: Date,
  endDate: Date,
  userId: string
): Promise<number> {
  try {
    const result = await prisma.timeCard.deleteMany({
      where: {
        userId: userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return result.count;
  } catch (error) {
    console.error("月単位でのタイムカード削除に失敗しました:", error);
    throw error;
  }
}
