import ServiceDetail, { serviceMetadata } from '@/components/service-detail';
export const metadata = serviceMetadata('cyber-security');
export default function Page() { return <ServiceDetail slug="cyber-security" />; }
