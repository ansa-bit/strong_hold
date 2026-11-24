import { getFaqs, getServices } from "@/sanity/lib/content";
import ServicesList from "./ServicesList";

export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([getServices(), getFaqs("services")]);
  return <ServicesList services={services} faqs={faqs} />;
}
