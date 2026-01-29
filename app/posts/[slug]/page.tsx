import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPostSlugs, getPostData } from '@/lib/posts';

// 静态生成所有文章页面
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// 元数据生成
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    notFound();
  }

  // TypeScript 现在知道 post 不是 null
  const safePost = post;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回首页
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Article Header */}
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              {safePost.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
              <time dateTime={safePost.date}>
                {new Date(safePost.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>

              {safePost.tags && safePost.tags.length > 0 && (
                <>
                  <span>·</span>
                  <div className="flex gap-2">
                    {safePost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {safePost.description && (
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                {safePost.description}
              </p>
            )}
          </header>

          {/* Article Content with Typography */}
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote source={safePost.content} />
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            返回首页
          </Link>

          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
            © {new Date().getFullYear()} 个人技术博客. 基于 Next.js 构建.
          </p>
        </div>
      </footer>
    </div>
  );
}
