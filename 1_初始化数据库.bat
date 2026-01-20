@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 初始化数据库
echo ========================================
echo.

echo 正在初始化数据库...
call npm run db:push

if errorlevel 1 (
    echo.
    echo ❌ 数据库初始化失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ 数据库初始化完成！
echo ========================================
echo.
echo 数据库文件: prisma/dev.db
echo.
echo 下一步:
echo - 运行 "2_启动开发服务器.bat" 启动项目
echo - 运行 "3_打开数据库管理.bat" 管理数据
echo.
pause
