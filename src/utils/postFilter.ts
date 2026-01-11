import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

const postFilter = ({ data }: CollectionEntry<"blog"> | CollectionEntry<"projects">) => {
  const hasPubDate = !!data.pubDatetime;
  const publishTs = hasPubDate
    ? new Date(data.pubDatetime as any).getTime() - SITE.scheduledPostMargin
    : 0; // show immediately if no pubDatetime
  const isPublishTimePassed = Date.now() > publishTs;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
