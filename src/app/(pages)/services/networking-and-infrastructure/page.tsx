import ServiceDetail, { serviceMetadata } from '@/components/service-detail';

export const metadata = serviceMetadata('networking-and-infrastructure');
export default function Page() { return <ServiceDetail slug="networking-and-infrastructure" />; }
