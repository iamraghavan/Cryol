import ServiceDetail, { serviceMetadata } from '@/components/service-detail';
export const metadata = serviceMetadata('digital-marketing');
export default function Page() { return <ServiceDetail slug="digital-marketing" />; }
