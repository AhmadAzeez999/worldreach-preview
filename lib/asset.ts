/**
 * Prefixes a public-folder path with the deployment's basePath.
 *
 * `next/image` prepends basePath for statically imported images, but NOT for
 * plain string paths pointing at /public. That is a documented caveat and an
 * easy one to lose an afternoon to: images silently 404 only in the subpath
 * deployment, while everything looks fine locally.
 *
 * The image components call this internally, so callers keep passing ordinary
 * root-relative paths like "/photos/study.jpg".
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  if (!BASE_PATH || !path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
