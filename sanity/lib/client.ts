import { createClient, type QueryParams } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn: true })
  : null;

// Content is cached and refreshed every REVALIDATE_SECONDS, or immediately
// when Sanity calls the /api/revalidate webhook with a matching tag.
const REVALIDATE_SECONDS = 3600;

export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  tags: string[] = []
): Promise<T> {
  if (!client) throw new Error("Sanity is not configured");
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
}
