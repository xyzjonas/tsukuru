<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.HeroTextSlice>;

	const { slice }: Props = $props();
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<PrismicRichText field={slice.primary.title} />
	<PrismicRichText field={slice.primary.subtitle} />
	<PrismicRichText field={slice.primary.description} />
	<div class="row">
		{#each slice.primary.labels as label}
			<p class="label">{label.text}</p>
		{/each}
	</div>
</section>

<style lang="css">
	section {
		align-items: center;
		justify-items: left;
		text-align: center;
	}

	:global(h1) {
		text-transform: uppercase;
		margin-bottom: 0rem;
	}

	:global(h2) {
		font-size: x-large;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 2rem;
	}

	.label {
		font-size: medium;
		color: var(--gray-5);
	}

	.label::before {
		content: ' ';
		display: inline-block;
		width: 10px;
		aspect-ratio: 1;
		border-radius: 100%;
		margin-right: 8px;
		background-color: var(--gray-5);
	}
</style>
