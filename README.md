# 企业网站项目

基于 Next.js 14 的现代化企业官网，包含前后端、多语言支持、后台管理系统和产品数据库。

## 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **动画**: Framer Motion
- **图标**: Lucide React
- **多语言**: next-intl

### 后端
- **数据库**: SQLite (Prisma ORM)
- **认证**: NextAuth.js
- **表单验证**: React Hook Form + Zod

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env`:

```bash
cp .env.example .env
```

编辑 `.env` 文件，设置必要的环境变量。

### 3. 初始化数据库

```bash
npm run db:push
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看网站。

## 项目结构

```
企业网站项目/
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── [locale]/         # 多语言路由
│   │   │   ├── page.tsx      # 首页
│   │   │   └── layout.tsx    # 语言布局
│   │   ├── globals.css       # 全局样式
│   │   └── layout.tsx        # 根布局
│   ├── components/           # React 组件
│   │   ├── Header.tsx        # 头部导航
│   │   ├── Footer.tsx        # 页脚
│   │   └── HeroCarousel.tsx  # 轮播图
│   ├── lib/                  # 工具库
│   │   ├── prisma.ts         # Prisma 客户端
│   │   └── utils.ts          # 工具函数
│   ├── messages/             # 多语言文件
│   │   ├── zh.json           # 中文
│   │   └── en.json           # 英文
│   ├── i18n.ts               # 多语言配置
│   └── middleware.ts         # Next.js 中间件
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## 功能特性

### ✓ 已实现
- [x] 响应式设计
- [x] 多语言支持 (中文/英文)
- [x] 固定顶部导航
- [x] 轮播图组件
- [x] 数据库模型设计
- [x] 基础页面布局

### ⏳ 待开发
- [ ] 产品列表页面
- [ ] 产品详情页面
- [ ] 产品搜索功能
- [ ] 后台管理系统
- [ ] 用户认证
- [ ] 图片上传功能
- [ ] SEO 优化

## 数据库模型

### Product (产品)
- 产品编号、名称(中英文)
- 描述、分类、图片
- 规格、特性、应用场景
- 认证信息

### Category (分类)
- 分类名称(中英文)
- 描述、图片、排序

### Application (应用领域)
- 应用名称(中英文)
- 描述、图片、排序

### Banner (轮播图)
- 标题(中英文)、图片
- 链接、排序、状态

### Partner (合作伙伴)
- 名称、Logo、链接

### User (用户)
- 邮箱、密码、角色

## 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 数据库推送
npm run db:push

# 打开 Prisma Studio
npm run db:studio
```

## 多语言使用

在组件中使用翻译:

```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('nav');
  
  return <h1>{t('home')}</h1>;
}
```

## 样式规范

### 颜色系统
- **主色**: `#00558E` (primary)
- **辅助色**: `#005B94` (primary-dark)
- **深色背景**: `#333333` (dark)
- **文字色**: `#444444` (dark-light)

### 间距系统
- **section-padding**: `py-16 md:py-20 lg:py-24`
- **container-custom**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

## 下一步开发建议

1. **添加产品数据**: 在数据库中添加示例产品数据
2. **创建产品页面**: 实现产品列表和详情页
3. **开发搜索功能**: 实现产品搜索和筛选
4. **后台管理**: 创建管理员登录和CRUD功能
5. **图片处理**: 配置图片上传和优化
6. **SEO优化**: 添加元数据和结构化数据

## 注意事项

- 所有lint错误会在安装依赖后自动解决
- 首次运行需要执行 `npm run db:push` 初始化数据库
- 开发时建议使用 `npm run db:studio` 查看数据库
- 生产环境需要配置真实的数据库连接

## 技术支持

如有问题，请查看:
- [Next.js 文档](https://nextjs.org/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [next-intl 文档](https://next-intl-docs.vercel.app/)
