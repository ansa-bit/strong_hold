import { getProjects } from "@/sanity/lib/content";
import WorksGallery from "./WorksGallery";

export default async function WorksPage() {
  const projects = await getProjects();
  return <WorksGallery projects={projects} />;
}
