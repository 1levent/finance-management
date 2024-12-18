import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth-storage');

  if (!authToken) {
    redirect('/login');
  }

  redirect('/dashboard');
} 