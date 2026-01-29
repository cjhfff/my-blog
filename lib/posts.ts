import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 文章的 Frontmatter 类型
export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

// 文章完整数据类型
export interface Post extends PostFrontmatter {
  id: string; // 文件名（不含扩展名）
  content: string; // Markdown 内容
  slug: string; // URL slug
}

// 文章列表项类型（不含 content）
export interface PostListItem extends PostFrontmatter {
  id: string;
  slug: string;
}

/**
 * 获取所有文章的 slug（用于 generateStaticParams）
 */
export function getAllPostSlugs(): string[] {
  const postsDirectory = path.join(process.cwd(), 'posts');

  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);

  // 返回所有 .md 文件（不含扩展名）
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 获取排序后的文章列表（按日期倒序）
 */
export function getSortedPostsData(): PostListItem[] {
  const allSlugs = getAllPostSlugs();
  const allPostsData = allSlugs.map((slug) => {
    const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      id: slug,
      slug,
      ...(matterResult.data as PostFrontmatter),
    };
  });

  // 按日期倒序排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    } else {
      return 0;
    }
  });
}

/**
 * 根据 slug 获取单篇文章的完整数据
 * 如果文章不存在，返回 null
 */
export async function getPostData(slug: string): Promise<Post | null> {
  const fullPath = path.join(process.cwd(), 'posts', `${slug}.md`);

  // 检查文件是否存在
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const post: Post = {
      id: slug,
      slug,
      content: matterResult.content,
      ...(matterResult.data as PostFrontmatter),
    };

    return post;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
