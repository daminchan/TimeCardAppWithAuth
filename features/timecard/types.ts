// export interface TimeCard {
//   id: string;
//   clockIn: Date;
//   clockOut: Date | null;
// }

export interface TimeCard {
  id: string;
  userId: string;
  date: Date;
  startTime: Date | null;
  endTime: Date | null;
}
