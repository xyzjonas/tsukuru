export const useUsePrismicLink = (link: MaybeRefOrGetter<unknown>) => {
  const linkUrl = computed(() => (toValue(link) as HackyHacky).url);
  const linkText = computed(() => (toValue(link) as HackyHacky).text);

  return {
    linkUrl,
    linkText,
  };
};
