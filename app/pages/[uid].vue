<script setup lang="ts">
import { components } from "~/slices";

const prismic = usePrismic();
const route = useRoute();
const { data: page } = await useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID("page", route.params.uid as string)
);

useHead({
  title: prismic.asText(page.value?.data.title),
});

useSeoMeta({
  title: prismic.asText(page.value?.data.meta_title) ?? "TiskniLepe3D",
  description: page.value?.data.meta_description ?? undefined,
  ogImage: computed(() => prismic.asImageSrc(page.value?.data.meta_image)),
});
</script>

<template>
  <SliceZone
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>
