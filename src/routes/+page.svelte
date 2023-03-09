<script lang="ts">
  import { mura, user } from "../lib/mura";

	$: $mura.participants[$mura.participants.findIndex(u => u.name === $user.name)] = $user;

	let mID = "";
	function join(e: Event) {
		e.preventDefault();
		window.location.href = `/${mID}`;
	}
</script>

<section>
	<h2>MURA SCHEDULER</h2>
	<p>MURA is a free meeting scheduling tool that provides suggested meeting times.</p>
	<p>MURA is open source on GitHub. If you like it, consider giving the repository a star or donating through GitHub Sponsors. Just $1/month gets you access to additional Ivy Direct software!</p>
	<p>Get started by creating a new Mura in the top right, or:</p>
	<br>
	<form on:submit={join}>
		<h3>Join a Meeting</h3>
		<label for="meeting_ID">Meeting ID</label>
		<input type="text" id="meeting_id" placeholder="XYZI" bind:value={mID}>
		<br>
	</form>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1;
		margin: 0 auto;
		max-width: 300px;

		form {
			border: 1px solid #f5fff1;
			border-radius: 0.5rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			row-gap: 0.5rem;
			width: 100%;
		}

		input {
			background-color: transparent;
			border: 2px solid #f5fff1;
			border-radius: 0.5rem;
			color: #f5fff1;
			font-family: inherit;
			padding: 0.5rem;
		}
	}
</style>
