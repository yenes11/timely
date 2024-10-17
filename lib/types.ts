export interface Session {
  id: string;
  title: string;
  steps: string[];
  tags: string[];
  priority: "low" | "medium" | "high";
  completed: boolean;
  remaining: number[];
  date: string;
}
