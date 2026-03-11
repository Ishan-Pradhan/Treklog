export type TimeUnit = "Days" | "Hours";
export type Difficulty = "Easy" | "Moderate" | "Hard";

export type TrekTypes = {
  id?: number;
  trek_destination: string;
  region: string;
  date: Date;
  distance: number;
  time_taken: number;
  time_unit: TimeUnit;
  difficulty: Difficulty;
};
