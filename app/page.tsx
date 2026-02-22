import { getAllPosts } from '@/lib/posts';
import Portfolio from '@/components/HomeClient';

export default function Page() {
  const posts = getAllPosts();
  return <Portfolio posts={posts} />;
}
