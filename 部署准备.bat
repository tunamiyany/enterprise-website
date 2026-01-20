@echo off
chcp 65001 >nul
title 企业网站 - 部署准备

echo ========================================
echo    企业网站 - 部署准备工具
echo ========================================
echo.

echo [1/4] 检查 Node.js 环境...
node -v >nul 2>&1
if errorlevel 1 (
    echo × Node.js 未安装，请先安装 Node.js
    pause
    exit /b 1
)
echo √ Node.js 已安装

echo.
echo [2/4] 安装依赖...
call npm install --registry=https://registry.npmmirror.com --legacy-peer-deps
if errorlevel 1 (
    echo × 依赖安装失败
    pause
    exit /b 1
)
echo √ 依赖安装完成

echo.
echo [3/4] 生成 Prisma Client...
call npx prisma generate
if errorlevel 1 (
    echo × Prisma 生成失败
    pause
    exit /b 1
)
echo √ Prisma Client 生成完成

echo.
echo [4/4] 构建生产版本...
call npm run build
if errorlevel 1 (
    echo × 构建失败，请检查错误信息
    pause
    exit /b 1
)
echo √ 构建完成

echo.
echo ========================================
echo    部署准备完成！
echo ========================================
echo.
echo 下一步操作：
echo.
echo 1. 本地预览生产版本：
echo    npm run start
echo    访问 http://localhost:3001
echo.
echo 2. 部署到 Vercel：
echo    npx vercel
echo.
echo 3. 部署到 Netlify：
echo    npx netlify deploy
echo.
echo 详细部署说明请查看 DEPLOY.md
echo.
pause
