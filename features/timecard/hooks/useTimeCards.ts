"use client";
import { useState, useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { TimeCard } from "../types";
import { getUserTimeCards } from "../api/timeCardService";

export const useTimeCards = (initialTimeCards: TimeCard[], userId: string) => {
  const [timeCards, setTimeCards] = useState<TimeCard[]>(initialTimeCards);
  const toast = useToast();

  // この関数は、最新のタイムカードデータを取得し、コンポーネントの状態を更新します。
  const updateTimeCards = useCallback(async () => {
    // タイムカードデータの更新処理を非同期で実行
    try {
      // APIを呼び出して最新のタイムカードデータを取得
      const updatedTimeCards = await getUserTimeCards(userId);

      // 取得した最新データでコンポーネントの状態を更新
      setTimeCards(updatedTimeCards);
    } catch (error) {
      // エラーが発生した場合の処理
      // エラー内容をコンソールに出力
      console.error("タイムカードの更新に失敗しました:", error);

      // ユーザーに対してエラーメッセージをトースト通知で表示
      toast({
        title: "エラー",
        description: "タイムカードの更新に失敗しました。",
        status: "error",
        duration: 5000, // 5秒間表示
        isClosable: true, // ユーザーが閉じることが可能
      });
    }
  }, [userId, toast]); // userId または toast が変更された場合にのみ関数を再生成

  return { timeCards, updateTimeCards };
};
