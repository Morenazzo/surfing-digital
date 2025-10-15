import { redirect } from 'next/navigation';
import DashboardClient from './DashboardClient';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  const email = params.email;

  if (!email) {
    // Redirect to login page if no email provided
    redirect('/login');
  }

  return <DashboardClient email={email} />;
}

