import { IconNames } from "./icon";

export interface Session {
  id: string;
  title: string;
  duration: number;
  repeat: number;
  completed: boolean;
  remaining: number[];
  createdDate: string;
}

export interface SessionInput {
  title: string;
  duration: number;
  repeat: number;
}

export interface ToastProps {
  message: string;
  icon?: IconNames;
  iconColor?: string;
  visible: boolean;
}
