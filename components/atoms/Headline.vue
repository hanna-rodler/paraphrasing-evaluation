<template>
  <component :is="level" :class="getClasses">
    <span
      v-if="iconName && iconName !== ''"
      class="flex justify-center items-center mr-2"
    >
      <Icon name="heroicons:check-circle-16-solid" class="bg-success" />
    </span>
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  level: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  levelStyle?: "gradient-headline" | "secondary-gradient-headline";
  iconName?: string;
  iconColor?: string;
}>();

const getClasses = computed(() => {
  if (props.iconName && props.iconName !== "") {
    if (props.levelStyle) {
      return props.levelStyle + " flex";
    } else {
      return "flex";
    }
  } else {
    return props.levelStyle;
  }
});
</script>
