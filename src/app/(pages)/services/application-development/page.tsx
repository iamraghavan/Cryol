import ServiceDetail, { serviceMetadata } from '@/components/service-detail';
export const metadata = serviceMetadata('application-development');
export default function Page() { return <ServiceDetail slug="application-development" />; }
