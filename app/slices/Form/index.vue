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

const fileInput = ref<HTMLInputElement>();

const files = ref<File[]>([]);
const onChange = (e: unknown) => {
  files.value = e.target.files;
};

function removeFile(idx: number) {
  const dt = new DataTransfer();
  Array.from(files.value).forEach((f, i) => {
    if (i !== idx) dt.items.add(f);
  });
  fileInput.value.files = dt.files;
  onChange({ target: fileInput.value });
}

function formatSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

const dropZone = ref();
// dropZone.addEventListener('click', () => input.click());

const dragover = (e) => {
  e.preventDefault();
  dropZone.value.classList.add("dragover");
};

const dragleave = () => {
  dropZone.value.classList.remove("dragover");
};

const drop = (e: Event) => {
  e.preventDefault();
  dropZone.value.classList.remove("dragover");
  const dt = new DataTransfer();
  Array.from(e.dataTransfer.files).forEach((f) => dt.items.add(f));
  fileInput.value.files = e.dataTransfer.files;
  onChange({ target: fileInput.value });
};
</script>

<template>
  <section id="kontakt">
    <div class="rich-text">
      <PrismicRichText :field="slice.primary.heading" />
    </div>
    <form
      action="https://usebasin.com/f/845220db6cb4"
      method="POST"
      class="w-page contact-form-gradient"
      enctype="multipart/form-data"
      accept-charset="UTF-8"
    >
      <input
        type="hidden"
        name="access_key"
        value="ddeba9414d754cc9bbede3bcea34bdf3"
      />
      <input
        type="hidden"
        name="subject"
        value="TiskniLepe3d - Nová poptávka"
      />

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
          <input type="subject" id="subject" name="subject" required />
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

      <!-- <div class="grid-1">
        <label for="attachement">Model nebo výkres (Max 25 MB)</label>
        <input
          id="attachement"
          type="file"
          name="attachement"
          multiple
          accept=".stl,.step,.stp,.obj,.3mf,.pdf,.jpg,.png,.zip"
        />
      </div> -->
      <div>
        <!-- <label for="attachement">Model nebo výkres (Max 25 MB)</label> -->
        <div class="file-upload-wrapper">
          <input
            id="attachement"
            ref="fileInput"
            type="file"
            name="attachement"
            multiple
            accept=".stl,.step,.stp,.obj,.3mf,.pdf,.jpg,.png,.zip"
            @change="onChange"
          />
          <div
            class="file-upload-area"
            for="attachement"
            @dragover.prevent="dragover"
            @dragleave="dragleave"
            @drop.prevent="drop"
          >
            <label ref="dropZone" for="attachement">
              <div class="upload-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"
                  />
                </svg>
              </div>
              <div class="upload-text">
                Klikněte pro nahrání nebo přetáhněte soubory
              </div>
              <div class="upload-hint">Můžete nahrát více souborů najednou</div>
              <div class="upload-formats">
                STL, STEP, STP, OBJ, 3MF, PDF, JPG, PNG, ZIP
              </div>
            </label>
          </div>
        </div>
        <div v-if="fileInput" class="file-list">
          <div
            v-for="(file, index) in files"
            :key="file.name"
            class="file-item"
          >
            <div class="file-icon">
              {{
                file.name.split(".").length >= 2
                  ? (file.name.split(".").pop()?.toLowerCase() ?? "?")
                  : "?"
              }}
            </div>
            <div class="file-info">
              <div class="file-name">{{ file.name }}</div>
              <div class="file-size">{{ formatSize(file.size) }}</div>
              <div v-if="file.size > 25000000" class="file-error">
                Soubor je příliš velký (max 25 MB)
              </div>
            </div>
            <button
              type="button"
              class="file-remove"
              @click="removeFile(index)"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
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
      </div>

      <div class="grid-2">
        <span>
          <label for="usage">Kde bude výtisk používaný ?</label>
          <select id="usage" name="usage">
            <option value="Venku">Venku</option>
            <option value="Uvnitř">Uvnitř</option>
            <option value="Součást stroje">Součást stroje</option>
            <option value="Uvnitř i venku">Uvnitř i venku</option>
          </select>
        </span>

        <!-- Kvalita / vzhled -->
        <span>
          <label for="quality">Kvalita / vzhled</label>
          <select id="quality" name="quality">
            <option value="1">
              1 - Bude umístěno uvnitř stroje (nekladu důraz na kvalitu povrchu)
            </option>
            <option value="2">2 - Standardní kvalita povrchu</option>
            <option value="3">3 - Potřebuji co nejlepší kvalitu povrchu</option>
          </select>
        </span>
      </div>

      <div class="grid-2">
        <!-- Pevnost -->
        <span>
          <label for="strength">Pevnost</label>
          <select id="strength" name="strength">
            <option value="1">1 - Bude pouze vystaveno (postavička)</option>
            <option value="2">
              2 - Bez většího namáhání (stojany, pomůcky)
            </option>
            <option value="3">
              3 - Klasická manipulace (standardní pevnost)
            </option>
            <option value="4">4 - Vyšší pevnost</option>
            <option value="5">
              5 - Extra namáhané (ozubená kolečka apod.)
            </option>
          </select>
        </span>

        <!-- Doprava -->
        <span>
          <label for="shipping">Doprava</label>
          <select id="shipping" name="shipping">
            <option value="PPL">PPL - dodání na adresu 98,- Kč</option>
            <option value="PPL box">PPL box / Parcelshop- 88,- Kč</option>
          </select>
        </span>
      </div>

      <button type="submit">Odeslat</button>
    </form>
  </section>
</template>

<style lang="css" scoped>
section {
  /* background-color: #db7f2f7b; */
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-top: 1px solid rgba(219, 127, 47, 0.182);
  border-bottom: 1px solid rgba(219, 127, 47, 0.182);
  padding-block: 5rem;
}

:deep(h2) {
  color: var(--brand-color);
}

form {
  overflow-x: scroll;
  /* max-width: 12px; */
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid var(--brand-color);
  box-shadow: var(--shadow-5);
  padding: 18px;
  /* background-color: var(--foreground-color); */
  border-radius: 10px;
  animation: pulseGlowSubtle 2.5s ease-in-out infinite;
}

button {
  color: white;
  background-color: var(--brand-color);
  padding-block: 1rem;
  margin-top: 1rem;
}

label {
  /* color: var(--dark-bg-color); */
  margin-right: 8px;
}

span {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
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
/* input[type="file"]::file-selector-button {
  background-color: var(--dark-bg-color);
  color: white;
} */
/*
input[type="file"]::file-selector-button:hover {
  background-color: var(--dark-bg-color);
} */

/* Firefox */
/* input[type="file"]::file-selector-button {
  background-color: var(--dark-bg-color);
  color: white;
} */

/* Force color scheme on the input itself */
/* input[type="file"] {
  color-scheme: dark;
} */

.w-page {
  display: flex;
  flex-direction: column;
}

.rich-text {
  text-align: center;
  align-self: center;
}

@keyframes pulseGlow {
  0%,
  100% {
    box-shadow:
      0 0 20px rgba(219, 128, 47, 0.15),
      0 0 40px rgba(219, 128, 47, 0.1),
      inset 0 0 30px rgba(219, 128, 47, 0.05);
    border-color: rgba(219, 128, 47, 0.3);
  }
  50% {
    box-shadow:
      0 0 30px rgba(219, 128, 47, 0.3),
      0 0 60px rgba(219, 128, 47, 0.2),
      inset 0 0 40px rgba(219, 128, 47, 0.08);
    border-color: rgba(219, 128, 47, 0.5);
  }
}

@keyframes pulseGlowSubtle {
  0%,
  100% {
    box-shadow: 0 0 15px rgba(219, 128, 47, 0.1);
    border-color: rgba(219, 128, 47, 0.2);
  }
  50% {
    box-shadow: 0 0 25px rgba(219, 128, 47, 0.2);
    border-color: rgba(219, 128, 47, 0.35);
  }
}

/** CUSTOM FILE INPUT */

input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.file-upload-area {
  border: 1px dashed var(--border-color);
  border-radius: 12px;
  text-align: center;
  background: var(--foreground-color);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 1rem;
}

.file-upload-area:hover {
  border-color: var(--gray-7);
  /* background: var(--gray-10); */
}

.file-upload-area.dragover {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: scale(1.02);
}

.upload-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: var(--gray-9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--brand-color);
}

.upload-text {
  font-size: 16px;
  color: var(--text-color);
  margin-bottom: 8px;
  font-weight: 500;
}

.upload-hint {
  font-size: small;
  color: var(--text-color);
}

.upload-formats {
  font-size: x-small;
  color: var(--gray-6);
  margin-top: 8px;
}

.file-list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--foreground-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.file-item:hover {
  border-color: var(--gray-7);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.file-icon {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: smaller;
  color: var(--text-color);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: var(--gray-6);
  margin-top: 2px;
}

.file-remove {
  border-radius: 6px;
  border: none;
  background: transparent;
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  margin-top: 0;
  padding: 4px;
  text-shadow: none;
}

.file-remove:hover {
  background: var(--gray-8);
}

.file-error {
  color: #dc2626;
  font-size: 12px;
  margin-top: 4px;
}
</style>
