import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = <T extends "blog" | "projects">(
  posts: CollectionEntry<T>[]
): CollectionEntry<T>[] => {
  const toTs = (d: string | number | Date | null | undefined) =>
    d ? Math.floor(new Date(d).getTime() / 1000) : 0;

  return posts
    .filter(postFilter as any)
    .sort(
      (a, b) =>
        toTs(b.data.modDatetime ?? (b.data as any).pubDatetime) -
        toTs(a.data.modDatetime ?? (a.data as any).pubDatetime)
    ) as CollectionEntry<T>[];
};

export default getSortedPosts;
