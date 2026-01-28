import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";
export const PROJECTS_PATH = "src/data/projects";
export const TRAVEL_PATH = "src/data/travel";
export const REVIEWS_PATH = "src/data/reviews";
export const PAINTINGS_PATH = "src/data/paintings";
export const LOG_PATH = "src/data/log";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PROJECTS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date().optional(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
      github: z.string(),
      stars: z.number().optional(),
      forks: z.number().optional(),
      license: z.string().optional(),
      readmeLink: z.string().optional(),
    }),
});

const travel = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${TRAVEL_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      title: z.string(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      description: z.string(),
      draft: z.boolean().optional(),
      ogImage: image().or(z.string()).optional(),
    }),
});

const reviews = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${REVIEWS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      title: z.string(),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      description: z.string(),
      rating: z.number().min(1).max(5).optional(),
      draft: z.boolean().optional(),
      ogImage: image().or(z.string()).optional(),
    }),
});

const paintings = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${PAINTINGS_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      image: image().or(z.string()),
      title: z.string().optional(),
      description: z.string().optional(),
      draft: z.boolean().optional(),
    }),
});

const log = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: `./${LOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      hideEditPost: z.boolean().optional(),
      timezone: z.string().optional(),
    }),
});

export const collections = { blog, projects, travel, reviews, paintings, log };
