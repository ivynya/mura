<script lang="ts">
	interface Props {
		times: number[];
	}
	let { times = $bindable() }: Props = $props();

	let isDragging = false;
	let isDelete = $state(false);
	let first: number = $state(-1);
	let second: number = $state(-1);
	let pin: number = $state(-1);

	function mouseDown(hour: number, del: boolean) {
		isDragging = true;
		isDelete = del;
		first = second = pin = hour;
	}

	function mouseEnter(hour: number) {
		if (!isDragging) return;

		if (hour <= pin) {
			first = hour;
			second = pin;
		} else if (hour >= pin) {
			first = pin;
			second = hour;
		}
	}

	function mouseUp() {
		for (let j = first; j <= second; j++) {
			if (isDelete)
				times.splice(
					times.findIndex((t) => t === j),
					1
				);
			else if (!times.includes(j)) {
				times.push(j);
				times.sort((a, b) => a - b);
			}
		}

		isDragging = isDelete = false;
		first = second = pin = -1;
	}

	let from = $derived(0);
	let toHours = $derived(23);
	let to = $derived(toHours - from < 0 ? 24 + toHours - from : toHours - from);
</script>

<div class="picker">
	{#each Array(to + 1) as _, i}
		<button
			onmousedown={() =>
				mouseDown(
					i + from,
					times.some((t) => t === i + from)
				)}
			onmouseenter={() => mouseEnter(i + from)}
			onmouseup={mouseUp}
			class="heatmap-{(times.filter((t) => t === i + from).length * 5 || 0).toFixed(0)}"
			class:highlight={isDelete === times.some((t) => t === i + from) &&
				i + from >= first &&
				i + from <= second}
			class:userSelected={times.some((t) => t === i + from)}
		>
			{((i + from) % 12) + 1}<br />
			<span>
				{#if i + from < 11}AM{:else}PM{/if}
			</span>
		</button>
	{/each}
</div>

<style lang="scss">
	.picker {
		background: #011627;
		border-radius: 3px;
		box-sizing: border-box;
		min-height: 60px;
		margin: 0.125rem 0;
		padding: 0 0.25rem;

		display: flex;
		flex: 1 1;

		button.userSelected + button.userSelected::before {
			left: -80%;
			margin: auto 0;
			width: 160%;
			z-index: 1;
		}

		button {
			background: none;
			flex: 1 1;
			border: none;
			cursor: pointer;
			color: #f5fff1;

			font-family: inherit;
			font-size: 0.6rem;
			font-weight: bold;
			text-align: center;

			padding: 0 0.1rem;

			transition-duration: 0.1s;
			position: relative;

			span {
				color: #f5fff1;
				font-weight: normal;
			}

			&.heatmap-0 span {
				color: #2ec4b6;
			}
			&.heatmap-1 {
				background-color: #2ec4b644;
			}
			&.heatmap-2 {
				background-color: #2ec4b666;
			}
			&.heatmap-3 {
				background-color: #2ec4b688;
			}
			&.heatmap-4 {
				background-color: #2ec4b6aa;
			}
			&.heatmap-5 {
				background-color: #2ec4b6cc;
			}
		}

		button:hover {
			opacity: 1;
		}

		button::after,
		button::before {
			background: none;
			content: '';
			cursor: pointer;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transition-duration: 0.25s;
			z-index: 5;
		}

		button::before {
			background-color: #b5d841;
			border-radius: 0.5rem;
			top: 65%;
			margin: auto;
			height: 6px;
			width: 20%;
			opacity: 0;
		}

		button:hover::after,
		button.highlight::after {
			background: #b5d84177;
		}

		button.userSelected:hover::after,
		button.userSelected.highlight::after {
			background: #d1495baa;
		}

		button.userSelected::before {
			opacity: 1;
		}
	}
</style>
