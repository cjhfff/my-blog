# 极简风格个人技术博客

基于 Next.js 14+ (App Router)、TypeScript 和 Tailwind CSS 构建的极简风格个人技术博客。

## 特性

- ✅ **Content as Code** - 通过 Markdown 文件管理文章
- ✅ **极简设计** - 干净、现代的 UI 风格
- ✅ **深色模式** - 自动适配系统主题
- ✅ **响应式设计** - 完美支持移动端、平板、桌面
- ✅ **静态生成 (SSG)** - 极快的页面加载速度
- ✅ **Markdown 渲染** - 支持完整的 Markdown 语法
- ✅ **SEO 友好** - 自动生成元数据
- ✅ **类型安全** - 完整的 TypeScript 类型定义

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + @tailwindcss/typography
- **Markdown 解析**: next-mdx-remote + gray-matter
- **部署**: Vercel

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 3. 创建文章

在 `posts/` 目录下创建 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2024-01-28"
description: "文章简介..."
tags: ["Next.js", "Tech"]
---

# 文章标题

这里是文章内容...
```

### 4. 部署

#### 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcjhfff%2Fmy-blog)

点击上方按钮，使用 GitHub 登录 Vercel，然后点击 "Deploy" 即可完成部署。

#### 手动部署步骤

1. **访问** [Vercel](https://vercel.com)
2. **使用 GitHub 登录**
3. **点击 "Add New Project"**
4. **导入仓库** `cjhfff/my-blog`
5. **点击 "Deploy"**

部署完成后，您将获得一个类似 `my-blog.vercel.app` 的在线地址。

#### 自动部署

每次推送到 `main` 分支时，Vercel 会自动重新部署。

## 项目结构

```
my-blog/
├── app/                    # Next.js App Router
│   ├── posts/
│   │   └── [slug]/       # 文章详情页动态路由
│   │       └── page.tsx  # 文章详情页组件
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx          # 首页
├── lib/                   # 工具函数
│   └── posts.ts          # 文章数据处理
├── posts/                 # Markdown 文章目录
│   ├── hello-world.md
│   └── ...
└── public/               # 静态资源
```

## 核心功能

### 文章数据管理 (`lib/posts.ts`)

- `getSortedPostsData()` - 获取所有文章列表（按日期倒序）
- `getPostData(slug)` - 获取单篇文章详情
- `getAllPostSlugs()` - 获取所有文章 slug（用于静态生成）

### 文章 Frontmatter 格式

```yaml
---
title: "文章标题"
date: "2024-01-28"
description: "文章简介..."
tags: ["标签1", "标签2"]
---
```

### Markdown 支持

- ✅ 标题 (H1-H6)
- ✅ 段落和换行
- ✅ 列表 (有序/无序)
- ✅ 代码块 (支持语法高亮)
- ✅ 链接和图片
- ✅ 表格
- ✅ 引用块
- ✅ 粗体和斜体

## 样式定制

### Tailwind Typography

文章内容使用 `prose` 类进行排版美化：

```tsx
<div className="prose prose-zinc dark:prose-invert max-w-none">
  <MDXRemote source={post.content} />
</div>
```

### 自定义配色

修改 `tailwind.config.ts` 中的颜色配置：

```typescript
theme: {
  extend: {
    colors: {
      // 自定义颜色
    },
  },
}
```

## 性能优化

- ✅ **静态生成 (SSG)** - 预生成所有文章页面
- ✅ **图片优化** - 使用 Next.js Image 组件
- ✅ **代码分割** - 自动按需加载
- ✅ **缓存策略** - Vercel 边缘缓存

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## License

MIT
