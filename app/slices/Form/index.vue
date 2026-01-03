<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.FormSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ])
);
</script>

<template>
  <section>
    <form action="#" method="post" enctype="multipart/form-data" class="w-page">
      <div class="grid-2">
        <span>
          <label for="name">Jméno *</label>
          <input type="text" id="name" name="name" required />
        </span>
        <span>
          <label for="phone">Telefon</label>
          <input type="tel" id="phone" name="phone" placeholder="789 456 123" />
        </span>
        <span>
          <label for="email">E-mail *</label>
          <input type="email" id="email" name="email" required />
        </span>
        <span>
          <label for="subject">Předmět *</label>
          <input type="subject" id="email" name="email" required />
        </span>
      </div>

      <div class="grid-1">
        <span>
          <label for="notes">Co nejvíce specifikujte Váš požadavek *</label>
          <textarea
            id="notes"
            name="notes"
            rows="6"
            placeholder="K čemu bude díl sloužit, rozměry, pevnost vs. cena..."
          ></textarea>
        </span>
      </div>

      <div class="grid-1">
        <label for="file-upload">Model nebo výkres (Max 25 MB)</label>
        <input
          id="file-upload"
          type="file"
          name="files[]"
          multiple
          accept=".stl,.step,.stp,.obj,.3mf,.pdf,.jpg,.png,.zip"
        />
      </div>

      <div class="grid-2">
        <span>
          <label for="color">Barva</label>
          <select id="color" name="color">
            <option value="black">Černá</option>
            <option value="white">Bílá</option>
            <option value="other">Jiná (napsat do zprávy)</option>
          </select>
        </span>

        <span>
          <label for="material">Materiál</label>
          <select id="material" name="material">
            <option value="Nechám-si-poradit">Nechám si poradit</option>
            <option value="PLA">PLA</option>
            <option value="PETG">PETG</option>
            <option value="ASA">ASA</option>
            <option value="Resin">Resin/SLA</option>
          </select>
        </span>

        ...
      </div>

      <button type="submit">Odeslat</button>
    </form>
  </section>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid var(--gray-10);
  box-shadow: var(--shadow-5);
  border-radius: 8px;
}
button {
  color: white;
  background-color: var(--brand-color);
  padding-block: 1rem;
}

label {
  margin-right: 8px;
}

span {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

span > input {
  flex: 1;
}

span > textarea {
  flex: 1;
}

span > label {
}

.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

@media screen and (max-width: 599px) {
  .grid-3,
  .grid-2 {
    grid-template-columns: 1fr;
  }
}

fieldset {
  border-color: var(--gray-8);
}

/* Style the file input button (webkit browsers) */
input[type="file"]::file-selector-button {
  background-color: var(--dark-bg-color);
  color: white;
}

input[type="file"]::file-selector-button:hover {
  background-color: var(--dark-bg-color);
}

/* Firefox */
input[type="file"]::file-selector-button {
  background-color: var(--dark-bg-color);
  color: white;
}

/* Force color scheme on the input itself */
input[type="file"] {
  color-scheme: dark;
}
</style>
