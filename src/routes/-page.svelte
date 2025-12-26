<!-- src/routes/+page.svelte -->
<script>
  import { SliceZone } from '@prismicio/svelte';
  import { components } from '$lib/slices';
  
  export let data;
</script>

<SliceZone slices={data.document.data.slices} {components} />