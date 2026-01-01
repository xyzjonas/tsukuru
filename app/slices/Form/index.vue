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
      <fieldset class="grid-3">
        <legend>Kontaktní údaje</legend>
        <span>
          <label for="name">Vaše jméno *</label>
          <input type="text" id="name" name="name" required />
        </span>
        <span>
          <label for="phone">Telefon</label>
          <input type="tel" id="phone" name="phone" placeholder="789 456 123" />
        </span>
        <span>
          <label for="email">Email *</label>
          <input type="email" id="email" name="email" required />
        </span>
      </fieldset>

      <fieldset class="grid-1">
        <legend>Poptávka</legend>

        <label for="service">Poptávám službu *</label>
        <select id="service" name="service" required>
          <option value="">Vyberte si službu</option>
          <option value="Běžný-3D-tisk">Běžný 3D tisk</option>
          <option value="Výroba-náhradního-dílu">Výroba náhradního dílu</option>
          <option value="3D-modelování-a-skenování">
            3D modelování / skenování
          </option>
        </select>

        <label for="file-upload">Model nebo výkres (Max 25 MB)</label>
        <input
          id="file-upload"
          type="file"
          name="files[]"
          multiple
          accept=".stl,.step,.stp,.obj,.3mf,.pdf,.jpg,.png,.zip"
        />

        <label for="notes">Poznámky</label>
        <textarea
          id="notes"
          name="notes"
          rows="6"
          placeholder="K čemu bude díl sloužit, rozměry, pevnost vs. cena..."
        ></textarea>
      </fieldset>

      <fieldset>
        <legend>Technické specifikace</legend>

        <label for="quantity">Počet kusů</label>
        <input type="number" id="quantity" name="quantity" value="1" min="1" />

        <label for="material">Materiál</label>
        <select id="material" name="material">
          <option value="Nechám-si-poradit">Nechám si poradit</option>
          <option value="PLA">PLA</option>
          <option value="PETG">PETG</option>
          <option value="ASA">ASA</option>
          <option value="Resin">Resin/SLA</option>
        </select>

        <label for="color">Barva</label>
        <select id="color" name="color">
          <option value="Nezáleží">Nezáleží</option>
          <option value="Bílá">Bílá</option>
          <option value="Černá">Černá</option>
          <option value="Šedá">Šedá</option>
        </select>

        <p>Klíčové vlastnosti:</p>
        <label
          ><input type="checkbox" name="features[]" value="Pevnost" /> Vysoká
          pevnost</label
        >
        <label
          ><input type="checkbox" name="features[]" value="Pružnost" />
          Pružnost</label
        >
        <label
          ><input type="checkbox" name="features[]" value="Teplota" /> Tepelná
          odolnost</label
        >
      </fieldset>

      <fieldset>
        <label>
          <input type="checkbox" name="consent" required /> Souhlasím se
          zpracováním údajů a obchodními podmínkami *
        </label>
      </fieldset>

      <button type="submit">Získat nezávaznou nabídku</button>
    </form>
  </section>
</template>

<style>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
button {
  color: white;
  background-color: var(--brand-color);
  padding-block: 1rem;
}

label {
  margin-right: 8px;
}

.grid-1 {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.grid-3 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}

@media screen and (max-width: 599px) {
  .grid-3 {
    grid-template-columns: 1fr;
  }
}

fieldset {
  border-color: var(--gray-8);
}
</style>
