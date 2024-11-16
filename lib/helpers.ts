import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session, SessionInput } from "./types";
import * as Crypto from "expo-crypto";
import moment from "moment";
import quotes from "@/assets/quotes.json";

export async function getSessions(): Promise<Session[]> {
  const sessions = await AsyncStorage.getItem("sessions");
  return sessions ? JSON.parse(sessions) : [];
}

export async function addSession(values: SessionInput) {
  const id = Crypto.randomUUID();
  const createdDate = moment().toISOString();
  const sessions = await getSessions();
  const session = {
    ...values,
    id,
    createdDate,
    completed: false,
    remaining: Array.from({ length: values.repeat }, () => values.duration),
  };
  AsyncStorage.setItem("sessions", JSON.stringify([...sessions, session]));
  return session;
}

export async function editSession(session: Session) {
  const sessions = await getSessions();
  const updatedSessions = sessions.map((s) =>
    s.id === session.id ? session : s
  );
  AsyncStorage.setItem("sessions", JSON.stringify(updatedSessions));
}

export async function deleteSession(id: string) {
  const sessions = await getSessions();
  const updatedSessions = sessions.filter((s) => s.id !== id);
  AsyncStorage.setItem("sessions", JSON.stringify(updatedSessions));
  return true;
}

export function getQuoteForToday(): { text: string; author: string } {
  const today = moment();
  const dayOfYear = today.dayOfYear();

  const index = (dayOfYear - 1) % quotes.length; // Adjust for zero-based index
  return quotes[index];
}
