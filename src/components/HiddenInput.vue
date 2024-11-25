<template>
  <div class="mb-4 relative">
    <label :for="id" class="block mb-2">{{ label }}</label>
    <input :type="inputType" :id="id" :placeholder="`Enter ${label}`" class="mt-1 p-2 w-full border rounded-md pr-10"
      :value="modelValue" @input="updateModelValue">
    <button type="button" @click="toggleVisibility"
      class="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none">
      <img class="toggleVisibility" :src="visibilityIcon" :alt="inputType === 'password' ? 'Show' : 'Hide'">
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  modelValue: string;
  label: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const inputType = ref<'password' | 'text'>('password');
const id = computed(() => props.label.toLowerCase().replace(/\s+/g, '-'));

const visibilityIcon = computed(() => 
  inputType.value === 'password' 
    ? 'https://img.icons8.com/material-outlined/24/000000/visible.png'
    : 'https://img.icons8.com/material-outlined/24/000000/invisible.png'
);

const toggleVisibility = () => {
  inputType.value = inputType.value === 'password' ? 'text' : 'password';
};

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>

<style scoped>
.toggleVisibility {
  padding-top: 35px;
}
</style>