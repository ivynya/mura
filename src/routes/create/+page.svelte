<script lang="ts">
	import { onMount } from "svelte";
	import { createMura, validateMuraID } from "../../lib/api";
	import type { Mura } from "../../lib/mura";

  let cMura: Mura = {
    meeting_name: "",
    meeting_desc: "",
    meeting_id: "",
    meeting_host: "",
    meeting_length: 1,

    type: "one-time",
    date_from: new Date().toISOString(),
    date_to: new Date().toISOString(),
    time_from: new Date().toISOString(),
    time_to: new Date().toISOString(),
    participants: [],
  };

  let inputTimeFrom: number = 8;
  let inputTimeTo: number = 13;
  let tzOffset: number = parseInt((new Date().getTimezoneOffset() / 60).toFixed(0));

  $: cMura.time_from = (() => {
    const days = Math.floor((inputTimeFrom + tzOffset) / 24);
    const hrs = (inputTimeFrom + tzOffset) % 24;
    const date = new Date("2021-01-01T00:00:00.000Z");
    date.setUTCDate(1 + days);
    date.setUTCHours(hrs);
    return date.toISOString();
  })();

  $: cMura.time_to = (() => {
    const days = Math.floor((inputTimeFrom + tzOffset) / 24);
    const hrs = (inputTimeTo + tzOffset) % 24;
    const date = new Date("2021-01-01T00:00:00.000Z");
    date.setUTCDate(1 + days);
    date.setUTCHours(hrs);
    return date.toISOString();
  })();

  async function generateMeetingCode() {
    do {
      let code = "";
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length);
        code += alphabet.charAt(randomIndex);
      }
      if (!(await validateMuraID(code))) continue;
      else cMura.meeting_id = code;
    } while (cMura.meeting_id === "");
  }

  onMount(async () => {
    await generateMeetingCode();

    const startDate = new Date();
    startDate.setUTCHours(0);
    startDate.setUTCMinutes(0);
    startDate.setUTCSeconds(0);
    startDate.setUTCMilliseconds(0);

    cMura.date_from = startDate.toISOString();
    cMura.date_to = startDate.toISOString();
  });

  async function submit(e: Event) {
    e.preventDefault();
    await createMura(cMura);
		window.location.href = `/${cMura.meeting_id}`;
  }
</script>

<form on:submit={submit}>
  <img src="/plant.png" alt="Plant Icon">
  <h2>Create New Mura</h2>
  <label for="meeting_id">
    Meeting ID
    <input required readonly type="text" id="meeting_id" bind:value={cMura.meeting_id}>
    <button type="button" class="regen" on:click={generateMeetingCode}>Regenerate Meeting ID</button>
  </label>
  <label for="meeting_name">
    Meeting Name
    <input required type="text" id="meeting_name" bind:value={cMura.meeting_name}>
  </label>
  <label for="meeting_desc">
    Meeting Description
    <input required type="text" id="meeting_desc" bind:value={cMura.meeting_desc}>
  </label>
  <label for="meeting_host">
    Meeting Host
    <input required type="text" id="meeting_host" bind:value={cMura.meeting_host}>
  </label>
  <label for="meeting_length">
    Meeting Length (Hours)
    <input required type="number" id="meeting_length" bind:value={cMura.meeting_length}>
  </label>
  <label for="type">
    Meeting Type
    <select required id="type" bind:value={cMura.type}>
      <option value="one-time">One-Time</option>
      <option value="recurring">Recurring</option>
    </select>
  </label>
  <label for="date_from">
    First Schedulable Date (Date From)
    <input required type="string" id="date_from" bind:value={cMura.date_from}>
  </label>
  <label for="date_to">
    Last Schedulable Date (Date To)
    <input required type="string" id="date_to" bind:value={cMura.date_to}>
  </label>
  <label for="time_from">
    First Schedulable Time (Time From)
    <input required type="range" id="time_from" min="1" max={inputTimeTo - 1} bind:value={inputTimeFrom}>
    <span>{inputTimeFrom}:00</span>
  </label>
  <label for="time_to">
    Last Schedulable Time (Time To)
    <input required type="range" id="time_to" min={inputTimeFrom + 1} max="23" bind:value={inputTimeTo}>
    <span>{inputTimeTo}:00</span>
  </label>
  <label for="tz_offset">
    Timezone Offset (From GMT)
    <input required type="range" id="tz_offset" min="0" max="23" bind:value={tzOffset}>
    <span>{tzOffset}:00</span>
  </label>
  <button type="submit">Create Mura</button>
  <br>
</form>

<style lang="scss">
  form {
    background-color: #f5fff1;
    border-radius: 1rem;
    box-sizing: border-box;
    color: #011627;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    max-width: 500px;
    margin: 1rem auto;
    margin-bottom: auto;
    padding: 1rem 2rem;
    padding-top: 1.5rem;
    width: 100%;

    img {
      height: 100px;
      width: 100px;
    }

    h2 {
      margin: 0;
    }

    label {
      display: flex;
      flex-direction: column;
      font-size: 0.75rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    input, select {
      appearance: none;
      background-color: transparent;
      border: 1px solid #011627;
      border-radius: 0.25rem;
      box-sizing: border-box;
      font-family: inherit;
      font-size: 0.8rem;
      margin-top: 0.15rem;
      padding: 0.15rem 0.5rem;
    }

    input:focus {
      border: 1px solid #2EC4B6;
      outline: none;
    }

    input[readonly] {
      color: #01162755;
      cursor: not-allowed;
    }

    button {
      background-color: #011627;
      border: none;
      border-radius: 0.25rem;
      color: #f5fff1;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.8rem;
      font-weight: bold;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      text-transform: uppercase;
    }

    .regen {
      font-size: 0.5rem;
      margin-top: 0.25rem;
      padding: 0.05rem 0.5rem;
      width: fit-content;
    }
  }
</style>