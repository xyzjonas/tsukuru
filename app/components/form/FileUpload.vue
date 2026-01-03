<template>
  <div class="file-drop-wrapper">
    <div
      class="drop-area"
      :class="{ 'drag-over': isDragOver, 'has-files': files.length > 0 }"
      @drop.prevent="handleDrop"
      @dragover.prevent="isDragOver = true"
      @dragleave.prevent="isDragOver = false"
      @click="triggerFileInput"
    >
      <input
        ref="fileInput"
        type="file"
        multiple
        @change="handleFileSelect"
        style="display: none"
      />

      <div v-if="files.length === 0" class="drop-placeholder">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="3" x2="12" y2="15"></line>
        </svg>
        <p class="drop-text">Drop files here or click to browse</p>
        <p class="drop-subtext">Support for multiple files</p>
      </div>

      <div v-else class="files-list">
        <div v-for="(file, index) in files" :key="index" class="file-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
            ></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <div class="file-info">
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">{{ formatFileSize(file.size) }}</span>
          </div>
          <button
            @click.stop="removeFile(index)"
            class="remove-btn"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="files.length > 0" class="actions">
      <button @click="clearAll" class="btn btn-secondary" type="button">
        Clear All
      </button>
      <button @click="handleUpload" class="btn btn-primary" type="button">
        Upload {{ files.length }} {{ files.length === 1 ? "File" : "Files" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fileInput = ref(null);
const files = ref([]);
const isDragOver = ref(false);

const emit = defineEmits(["upload", "filesChanged"]);

const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const selectedFiles = Array.from(event.target.files);
  addFiles(selectedFiles);
};

const handleDrop = (event) => {
  isDragOver.value = false;
  const droppedFiles = Array.from(event.dataTransfer.files);
  addFiles(droppedFiles);
};

const addFiles = (newFiles) => {
  files.value = [...files.value, ...newFiles];
  emit("filesChanged", files.value);
};

const removeFile = (index) => {
  files.value.splice(index, 1);
  emit("filesChanged", files.value);
};

const clearAll = () => {
  files.value = [];
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  emit("filesChanged", files.value);
};

const handleUpload = () => {
  emit("upload", files.value);
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
</script>

<style scoped>
.file-drop-wrapper {
  width: 100%;
  /* max-width: 600px; */
}

.drop-area {
  background-color: #1a1a1a;
  border: 2px dashed #333;
  border-radius: 8px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.drop-area:hover {
  border-color: #555;
  background-color: #222;
}

.drop-area.drag-over {
  border-color: #60a5fa;
  background-color: #1e293b;
  border-style: solid;
}

.drop-area.has-files {
  padding: 20px;
  min-height: auto;
}

.drop-placeholder {
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.drop-placeholder svg {
  margin-bottom: 16px;
  color: #666;
}

.drop-text {
  font-size: 16px;
  color: #e0e0e0;
  margin-bottom: 8px;
}

.drop-subtext {
  font-size: 14px;
  color: #666;
}

.files-list {
  width: 100%;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: #0a0a0a;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  margin-bottom: 8px;
  transition: background-color 0.2s ease;
}

.file-item:hover {
  background-color: #151515;
}

.file-item svg {
  color: #60a5fa;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  min-width: 0;
}

.file-name {
  color: #e0e0e0;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.file-size {
  color: #666;
  font-size: 12px;
}

.remove-btn {
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-btn:hover {
  background-color: #2a2a2a;
  color: #ef4444;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
}

.btn {
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary {
  background-color: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #333;
}

.btn-secondary:hover {
  background-color: #333;
}

.btn-primary {
  background-color: #60a5fa;
  color: #0a0a0a;
}

.btn-primary:hover {
  background-color: #3b82f6;
}
</style>
