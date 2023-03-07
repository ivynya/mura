import { writable } from "svelte/store";

export interface Mura {
  meeting_name: string;
  meeting_desc: string;
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
      times: number[];
    }[];
  }[];
}

export const mura = writable<Mura>({
  meeting_name: "Study Session Meetup",
  meeting_desc: "A study session for the CALC 1D exam",
  meeting_id: "XYZI",
  meeting_host: "Ivy",
  meeting_length: 1,

  type: "one-time",
  date_from: "2023-03-06T00:00:00.000Z",
  date_to: "2023-03-12T00:00:00.000Z",
  time_from: "2023-01-01T15:00:00.000Z",
  time_to: "2023-01-02T03:00:00.000Z",
  participants: [
    {
      name: "Ivy",
      availability: [
        {
          date: "2023-03-06T00:00:00.000Z",
          times: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 23, 24, 25, 26]
        },
        {
          date: "2023-03-07T00:00:00.000Z",
          times: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        },
        {
          date: "2023-03-10T00:00:00.000Z",
          times: [17, 18, 19, 20]
        },
      ]
    },
    {
      name: "Ken",
      availability: [
        {
          date: "2023-03-08T00:00:00.000Z",
          times: [12, 13, 14, 15, 16]
        },
        {
          date: "2023-03-07T00:00:00.000Z",
          times: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
      ]
    },
    {
      name: "John",
      availability: [
        {
          date: "2023-03-06T00:00:00.000Z",
          times: [15, 16, 17, 18]
        },
        {
          date: "2023-03-07T00:00:00.000Z",
          times: [10, 15, 16, 17, 18]
        },
        {
          date: "2023-03-08T00:00:00.000Z",
          times: [15, 16, 17, 18, 19]
        },
        {
          date: "2023-03-11T00:00:00.000Z",
          times: [10, 11, 15, 16, 17, 18, 19, 20, 21, 22]
        },
      ]
    }
  ]
});