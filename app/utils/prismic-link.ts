export type HackyHacky = {
  url: string;
  text: string;
};

export const prismicLink = (link: unknown) => {
  return link as HackyHacky;
};
