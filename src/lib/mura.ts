import { writable } from "svelte/store";

interface Mura {
  meeting_name: string;
  meeting_id: string;
  meeting_host: string;
  meeting_length: number;

  type: "one-time" | "recurring";
  date_from: string;
  date_to: string;

  time_from: string;
  time_to: string;

  participants: {
    name: string;
    availability: {
      date: string;
      time_from: string;
      time_to: string;
    }[];
  }[];
}

export const mura = writable<Mura>({
  meeting_name: "Meeting",
  meeting_id: "XYZI",
  meeting_host: "Ivy",
  meeting_length: 1,

  type: "one-time",
  date_from: "2023-03-06T00:00:00.000Z",
  date_to: "2023-03-12T00:00:00.000Z",
  time_from: "",
  time_to: "",
  participants: []
});