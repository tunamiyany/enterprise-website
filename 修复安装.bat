@echo off
chcp 65001 >nul
echo ========================================
echo 修复安装 - 解决依赖问题
echo ========================================
echo.

echo [1/5] 结束所有 Node.js 进程...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✓ 进程已清理

echo.
echo [2/5] 删除锁定的文件夹...
if exist node_modules\@prisma (
    rd /s /q node_modules\@prisma 2>nul
)
if exist node_modules\.cache (
    rd /s /q node_modules\.cache 2>nul
)
echo ✓ 已清理

echo.
echo [3/5] 配置镜像源...
call npm config set registry https://registry.npmmirror.com
echo ✓ 已配置淘宝镜像

echo.
echo [4/5] 安装缺失的依赖...
echo 正在安装: next-intl, clsx, tailwind-merge, @prisma/client, prisma
call npm install next-intl@^3.0.0 clsx@^2.0.0 tailwind-merge@^2.0.0 @prisma/client@^5.0.0 prisma@^5.0.0 --legacy-peer-deps

if errorlevel 1 (
    echo.
    echo ❌ 安装失败
    echo.
    echo 请尝试:
    echo 1. 检查网络连接
    echo 2. 关闭所有终端窗口
    echo 3. 重新运行此脚本
    pause
    exit /b 1
)

echo.
echo [5/5] 生成 Prisma 客户端...
call npx prisma generate

echo.
echo ========================================
echo ✓ 修复完成！
echo ========================================
echo.
echo 下一步: 运行 "2_启动开发服务器.bat"
echo.
pause
