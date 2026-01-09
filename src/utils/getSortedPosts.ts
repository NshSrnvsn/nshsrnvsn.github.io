import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = <T extends "blog" | "projects">(
  posts: CollectionEntry<T>[]
): CollectionEntry<T>[] => {
  return posts
    .filter(postFilter as any)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    ) as CollectionEntry<T>[];
};

export default getSortedPosts;
