<script lang="ts">
	import InfoHeader from "./InfoHeader.svelte";
	import InfoNav from "./InfoNav.svelte";
	import InfoLogin from "./InfoLogin.svelte";
	import InfoParticipants from "./InfoParticipants.svelte";
	import { onMount } from "svelte";
  import { mura, user } from "../lib/mura";

  let activePage: "meeting" | "participants" | "help" = "meeting";
  let meetingTime = "";
  let meetingParticipants = 0;
  let meetingIncludesUser = false;

  onMount(() => {
    user.subscribe(() => {
      const bestMeetingData = findBestMeetingTime();
      meetingTime = bestMeetingData.date;
      meetingParticipants = bestMeetingData.participants;
      meetingIncludesUser = bestMeetingData.includesUser;
    });
  });

  function findBestMeetingTime() {
    const participants = $mura.participants;
    const availability = participants.map((p) => p.availability).flat();
    const dateMap: { [date: string]: { [hour: number]: number } } = {};
    for (const a in availability) {
      const date = availability[a].date;

      for (const t in availability[a].times) {
        const hour = availability[a].times[t];
        if (dateMap[date]) {
          if (dateMap[date][hour])
            dateMap[date][hour] += 1;
          else dateMap[date][hour] = 1;
        } else {
          dateMap[date] = {};
          dateMap[date][hour] = 1;
        }
      }
    }

    console.log(dateMap)

    let max = 0;
    let maxDate = "";
    let maxHour = 0;
    for (const d in dateMap) {
      for (const h in dateMap[d]) {
        if (dateMap[d][h] > max) {
          max = dateMap[d][h];
          maxHour = parseInt(h);
          maxDate = d;
        }
      }
    }

    const bestDate = new Date(maxDate);
    bestDate.setUTCHours(maxHour + 1);

    const includesUser = ($user.availability.map((d) => d.date).includes(maxDate)
      && $user.availability.find((d) => d.date === maxDate)?.times.includes(maxHour)) || false;
    
    return {
      date: bestDate.toLocaleString(),
      participants: max,
      includesUser: includesUser
    }
  }
</script>

<div class="info-bar">
  <InfoHeader />
  <span class="spacer" />
  {#if activePage === "meeting"}
  <InfoLogin />
  {/if}
  {#if activePage === "participants"}
  <InfoParticipants />
  {/if}
  {#if activePage === "help"}
  <section class="suggested-time">
    <h3>Mura Suggested Time</h3>
    <p class="tag"><b>{meetingTime}</b></p>
    <p>
      <span>{meetingParticipants} Participants</span>
      {#if meetingIncludesUser}<span> • Includes You</span>{/if}
    </p>
  </section>
  {/if}
  <span class="spacer lg"></span>
  <InfoNav bind:activePage />
</div>

<style lang="scss">
  .info-bar {
    background: #f5fff1;
    border-top-left-radius: 1rem;
    box-sizing: border-box;
    color: #011627;
    display: flex;
    flex-direction: column;

    flex: 1 1;
    padding: 6vh 3rem;
    text-align: center;

    transition-duration: 0.5s;

    @media (min-height: 992px) {
      padding: 12vh 3rem;
    }

    :global(.tag) {
      background: #011627;
      border-radius: 0.5rem;
      color: #2EC4B6;
      display: inline-block;

      font-size: 0.75rem;
      font-weight: bold;
      
      margin: 0.75rem 0;
      margin-top: 0;
      padding: 0.25rem 0.75rem;
      text-transform: uppercase;
    }

    > :global(section) {
      border: 1px solid #011627;
      border-radius: 0.5rem;
      margin: 0 auto;
      padding: 1.5rem 2rem;
      max-width: 320px;
      width: 100%;
    }
    > :global(section h3) {
      background-color: #f5fff1;
      margin: 1rem auto;
      margin-top: -2.5rem;
      width: fit-content;
      padding: 0 1rem;
    }

    p {
      margin-bottom: 0;
    }

    .spacer {
      flex: 1 1;
    }
    .spacer.lg {
      flex: 2 1;
    }
  }
</style>