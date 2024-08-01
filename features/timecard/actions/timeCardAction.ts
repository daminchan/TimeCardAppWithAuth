"use server";

import {
  startWork,
  endWork,
  deleteMonthTimeCards,
} from "@/features/timecard/api/timeCardService";
import { revalidatePath } from "next/cache";
import { TimeCard } from "../types";

// export const handleStartWork = async (userId: string) => {
//   const result = await startWork(userId);
//   revalidatePath("/mypage/dashboard");
//   return result;
// };

// export const handleEndWork = async (userId: string) => {
//   const result = await endWork(userId);
//   revalidatePath("/mypage/dashboard");
//   return result;
// };

export const handleStartWork = async (
  userId: string
): Promise<{ message: string; timeCard: TimeCard }> => {
  const result = await startWork(userId);
  revalidatePath("/mypage");
  return result;
};

export const handleEndWork = async (
  userId: string
): Promise<{ message: string; timeCard: TimeCard }> => {
  const result = await endWork(userId);
  revalidatePath("/mypage");
  return result;
};

export async function handleDeleteMonthTimeCards(
  startDate: Date,
  endDate: Date,
  userId: string
) {
  try {
    const deletedCount = await deleteMonthTimeCards(startDate, endDate, userId);
    revalidatePath("/mypage/dashboard");
    return { success: true, deletedCount };
  } catch (error) {
    console.error("Failed to delete time cards:", error);
    return { success: false, error: "タイムカードの削除に失敗しました" };
  }
}
