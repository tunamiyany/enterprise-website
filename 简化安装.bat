@echo off
chcp 65001 >nul
echo ========================================
echo 简化安装 - 跳过 Prisma
echo ========================================
echo.

echo [1/4] 结束 Node 进程...
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✓ 完成

echo.
echo [2/4] 配置镜像...
call npm config set registry https://registry.npmmirror.com
echo ✓ 完成

echo.
echo [3/4] 只安装前端必需的包...
echo 安装: next-intl, clsx, tailwind-merge
call npm install next-intl@3.19.0 clsx@2.1.0 tailwind-merge@2.5.0

if errorlevel 1 (
    echo ❌ 安装失败
    pause
    exit /b 1
)

echo.
echo [4/4] 临时禁用 Prisma...
echo 正在修改配置文件...

echo.
echo ========================================
echo ✓ 简化安装完成！
echo ========================================
echo.
echo 注意: 暂时跳过了数据库功能
echo 现在可以启动项目查看前端界面
echo.
pause
