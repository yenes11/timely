import AsyncStorage from "@react-native-async-storage/async-storage";
import { Session } from "./types";

export async function getSessions(): Promise<Session[]> {
  const sessions = await AsyncStorage.getItem("sessions");
  return sessions ? JSON.parse(sessions) : [];
}

export async function addSession(session: Session) {
  const sessions = await getSessions();
  AsyncStorage.setItem("sessions", JSON.stringify([...sessions, session]));
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
}
