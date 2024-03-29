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

  participants: Participant[];
}

export interface Participant {
  name: string;
  availability: {
    date: string;
    times: number[];
  }[];
};

export const user = writable<Participant>({
  name: "",
  availability: []
});

export const mura = writable<Mura>({
  meeting_name: "Study Session Meetup",
  meeting_desc: "A study session for the CALC 1D exam",
  meeting_id: "XYZI",
  meeting_host: "Ivy",
  meeting_length: 1,

  type: "one-time",
  date_from: "2023-03-06T00:00:00.000Z",
  date_to: "2023-03-16T00:00:00.000Z",
  time_from: "2023-01-01T10:00:00.000Z",
  time_to: "2023-01-02T01:00:00.000Z",
  participants: [
    {
      name: "Ivy",
      availability: [
        {
          date: "2023-03-06T00:00:00.000Z",
          times: [11, 12, 13, 14, 15, 16, 17, 18, 19, 21]
        },
        {
          date: "2023-03-07T00:00:00.000Z",
          times: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
        },
        {
          date: "2023-03-08T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-09T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-10T00:00:00.000Z",
          times: [17, 18, 19, 20]
        },
        {
          date: "2023-03-11T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-12T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-13T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-14T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-15T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-16T00:00:00.000Z",
          times: []
        },
      ]
    },
    {
      name: "Ken",
      availability: [
        {
          date: "2023-03-06T00:00:00.000Z",
          times: [12, 13, 14, 15, 16]
        },
        {
          date: "2023-03-07T00:00:00.000Z",
          times: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        },
        {
          date: "2023-03-08T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-09T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-10T00:00:00.000Z",
          times: [17]
        },
        {
          date: "2023-03-11T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-12T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-13T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-14T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-15T00:00:00.000Z",
          times: []
        },
        {
          date: "2023-03-16T00:00:00.000Z",
          times: []
        },
      ]
    },
  ]
});