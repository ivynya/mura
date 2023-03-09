<script lang="ts">
	import type { Mura } from "../../lib/mura";

  let cMura: Mura = {
    meeting_name: "",
    meeting_desc: "",
    meeting_id: "",
    meeting_host: "",
    meeting_length: 1,

    type: "one-time",
    date_from: "",
    date_to: "",
    time_from: "",
    time_to: "",
    participants: [],
  };
</script>

<form>
  <img src="/plant.png" alt="Plant Icon">
  <h2>Create New Mura</h2>
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
    <input required type="date" id="date_from" bind:value={cMura.date_from}>
  </label>
  <label for="date_to">
    Last Schedulable Date (Date To)
    <input required type="date" id="date_to" bind:value={cMura.date_to}>
  </label>
  <label for="time_from">
    First Schedulable Time (Time From)
    <input required type="time" id="time_from" bind:value={cMura.time_from}>
  </label>
  <label for="time_to">
    Last Schedulable Time (Time To)
    <input required type="time" id="time_to" bind:value={cMura.time_to}>
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
      padding: 0.15rem 1rem;
    }

    input:focus {
      border: 1px solid #2EC4B6;
      outline: none;
    }

    button {
      background-color: #2EC4B6;
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
  }
</style>