import { BLOG_PATH, PROJECTS_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * Get full path of a blog post or project
 * @param id - id of the post/project (aka slug)
 * @param filePath - the post/project full file location
 * @param includeBase - whether to include the base path in return value
 * @param type - the collection type ("blog" or "projects")
 * @returns blog post or project path
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  type: "blog" | "projects" = "blog"
) {
  const basePath = type === "projects" ? PROJECTS_PATH : BLOG_PATH;
  
  const pathSegments = filePath
    ?.replace(basePath, "")
    .split("/")
    .filter(path => path !== "") // remove empty string in the segments ["", "other-path"] <- empty string will be removed
    .filter(path => !path.startsWith("_")) // exclude directories start with underscore "_"
    .slice(0, -1) // remove the last segment_ file name_ since it's unnecessary
    .map(segment => slugifyStr(segment)); // slugify each segment path

  const pathPrefix = includeBase ? (type === "projects" ? "/projects" : "/blog") : "";

  // Making sure `id` does not contain the directory
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  // If not inside the sub-dir, simply return the file path
  if (!pathSegments || pathSegments.length < 1) {
    return [pathPrefix, slug].join("/");
  }

  return [pathPrefix, ...pathSegments, slug].join("/");
}
