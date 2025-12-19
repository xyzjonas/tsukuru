<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';
	import Label from './Label.svelte';

	type Props = SliceComponentProps<Content.RichTextSlice>;

	const { slice }: Props = $props();
</script>

<section>
  <div class="text">
    <PrismicRichText field={slice.primary.content} components={{ label: Label }} />
  </div>
</section>

<style>
  .text {
    width: 100%;
    max-width: var(--size-content-2);
	background-color: red;
  }
</style>
