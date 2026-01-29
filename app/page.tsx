import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            个人技术博客
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            分享技术心得与学习笔记
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {allPostsData.length === 0 ? (
            <p className="text-zinc-600 dark:text-zinc-400">
              还没有文章，在 /posts 目录下添加 .md 文件来创建文章。
            </p>
          ) : (
            allPostsData.map((post) => (
              <article
                key={post.id}
                className="group rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <Link href={`/posts/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                    {post.title}
                  </h2>
                </Link>

                <div className="mt-3 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>

                  {post.tags && post.tags.length > 0 && (
                    <>
                      <span>·</span>
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
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

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>

                <Link
                  href={`/posts/${post.slug}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  阅读更多
                  <svg
                    className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </article>
            ))
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto max-w-3xl px-4 text-center text-sm text-zinc-600 dark:text-zinc-400 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} 个人技术博客. 基于 Next.js 构建.</p>
        </div>
      </footer>
    </div>
  );
}
