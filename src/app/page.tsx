import { redirect } from 'next/navigation';

// Redirect to the marketing home page
export default function HomePage() {
  redirect('/marketing');
}