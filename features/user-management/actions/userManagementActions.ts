"use server";

import { revalidatePath } from "next/cache";
import { deleteUser, updateUserRole } from "../api/userManagementService";

export async function handleUpdateUserRole(userId: string, role: string) {
  await updateUserRole(userId, role);
  revalidatePath("/admin/users");
}

export async function handleDeleteUser(userId: string) {
  await deleteUser(userId);
  revalidatePath("/admin/users");
}
