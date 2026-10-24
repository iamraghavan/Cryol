import ServiceDetail, { serviceMetadata } from '@/components/service-detail';
export const metadata = serviceMetadata('website-development');
export default function Page() { return <ServiceDetail slug="website-development" />; }
