import ServiceDetail, { serviceMetadata } from '@/components/service-detail';
export const metadata = serviceMetadata('cloud-services');
export default function Page() { return <ServiceDetail slug="cloud-services" />; }
