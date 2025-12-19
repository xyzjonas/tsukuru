<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, type SliceComponentProps } from '@prismicio/svelte';

	type Props = SliceComponentProps<Content.ContactFormSlice>;

	const { slice }: Props = $props();
</script>

<section
  data-slice-type="{slice.slice_type}"
  data-slice-variation="{slice.variation}"
>
  <PrismicRichText field={slice.primary.heading} />
  <PrismicRichText field={slice.primary.description} />
  <form method="GET" action="/">
    <div class="group">
      <label for="email">Email *</label>
      <input required type="email" id="email" name="email" />
    </div>
    <div class="group">
      <label for="message">Specifikace požadavku *</label>
      <textarea name="message" id="message" minlength="1" maxlength="1000"></textarea>
    </div>
    <div class="group">
      <button>Odeslat</button>
    </div>
  </form>
</section>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    width: var(--size-content-2);
    background: var(--surface-3);
    padding: var(--size-9) var(--size-8) var(--size-8);
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);
  }

  label {
    display: block;
    margin-bottom: var(--size-2);
  }

  label,
  button {
    font-weight: var(--font-weight-6);
  }

  input,
  textarea {
    display: block;
    width: 100%;
    resize: none;
  }

  textarea {
	min-height: 5rem;
  }

  button {
    border-radius: var(--radius-2);
    padding: var(--size-2) var(--size-5);
    margin-left: auto;
    margin-right: auto;
    display: block;
    background: var(--brand);
    box-shadow: var(--shadow-1);
    transition: box-shadow color 1s var(--ease-spring-2), color 1s;
  }

  button:hover {
    box-shadow: var(--shadow-2);
  }
</style>
