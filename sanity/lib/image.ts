import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Sanity CDN URL for an image, capped at `width` and served as WebP/AVIF where supported. */
export function imageUrl(source: SanityImageSource | null | undefined, width = 1600): string {
  if (!source) return "";
  return builder.image(source).width(width).fit("max").auto("format").url();
}
