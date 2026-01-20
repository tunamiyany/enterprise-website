# 企业网站部署指南

## 部署前准备

### 1. 环境变量配置

在部署平台（Vercel/Netlify）中配置以下环境变量：

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `DATABASE_URL` | 数据库连接字符串 | `file:./dev.db` 或 PostgreSQL URL |
| `NEXTAUTH_SECRET` | NextAuth加密密钥 | 随机32位字符串 |
| `NEXTAUTH_URL` | 网站URL | `https://your-domain.com` |

### 2. 生成 NEXTAUTH_SECRET

在终端运行以下命令生成安全的密钥：

```bash
# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }) -as [byte[]])

# Linux/Mac
openssl rand -base64 32
```

---

## 部署到 Vercel（推荐）

### 方式一：通过 GitHub 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [vercel.com](https://vercel.com) 并登录
3. 点击 "New Project" → 导入 GitHub 仓库
4. 配置环境变量（Settings → Environment Variables）
5. 点击 "Deploy"

### 方式二：通过 CLI 部署

```bash
# 安装 Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel

# 生产环境部署
vercel --prod
```

---

## 部署到 Netlify

### 方式一：通过 GitHub 部署

1. 将代码推送到 GitHub 仓库
2. 访问 [netlify.com](https://netlify.com) 并登录
3. 点击 "Add new site" → "Import an existing project"
4. 选择 GitHub 仓库
5. 配置环境变量（Site settings → Environment variables）
6. 点击 "Deploy site"

### 方式二：通过 CLI 部署

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
netlify login

# 部署
netlify deploy

# 生产环境部署
netlify deploy --prod
```

---

## 数据库配置

### 开发环境（SQLite）

当前项目使用 SQLite 数据库，适合开发和小型部署：

```
DATABASE_URL="file:./dev.db"
```

### 生产环境（推荐 PostgreSQL）

对于生产环境，建议使用 PostgreSQL：

1. **Vercel Postgres**（推荐）
   - 在 Vercel 控制台创建 Postgres 数据库
   - 自动配置环境变量

2. **Supabase**
   - 访问 [supabase.com](https://supabase.com)
   - 创建项目并获取连接字符串

3. **PlanetScale**
   - 访问 [planetscale.com](https://planetscale.com)
   - 创建 MySQL 数据库

切换数据库后，需要修改 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"  // 或 "mysql"
  url      = env("DATABASE_URL")
}
```

然后运行：

```bash
npx prisma db push
node prisma/seed.js
```

---

## 部署后检查

1. **访问首页** - 确认页面正常加载
2. **测试产品页** - 访问 `/zh/products` 确认数据显示
3. **测试后台登录** - 访问 `/zh/admin/login`
   - 邮箱：`admin@example.com`
   - 密码：`admin123`
4. **检查多语言** - 切换中英文确认正常

---

## 常见问题

### Q: 部署后数据库为空？

A: 需要在部署后运行种子脚本：
```bash
npx prisma db push
node prisma/seed.js
```

### Q: 登录失败？

A: 检查环境变量 `NEXTAUTH_SECRET` 和 `NEXTAUTH_URL` 是否正确配置。

### Q: 图片不显示？

A: 将图片上传到 `public/images/` 目录，或使用外部图片服务（如 Cloudinary）。

---

## 技术支持

如有问题，请检查：
- Vercel/Netlify 部署日志
- 浏览器控制台错误信息
- 服务器端日志
