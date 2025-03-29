<template>
  <component
    :is="tag"
    v-bind="attributes"
    :class="[componentStyles.get(variant)]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag: "a" | "button";
  variant:
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "gradient"
    | "link"
    | "link-primary"
    | "link-secondary"
    | "warning";
  link?: string;
}>();

const attributes = computed(() => {
  if (props.tag === "button") {
    return {
      type: "button",
    };
  }
  if (props.tag === "a") {
    return {
      href: props.link,
      target: "_self",
      rel: "noopener",
    };
  }
});

const componentStyles = ref(
  new Map([
    ["primary", "button button-primary"],
    ["secondary", "button button-secondary"],
    ["accent", "button button-accent"],
    ["success", "button button-success"],
    ["gradient", "button button-gradient"],
    ["warning", "button button-warning"],
    ["link-primary", "link-primary"],
    ["link-secondary", "link-secondary"],
  ])
);
</script>
