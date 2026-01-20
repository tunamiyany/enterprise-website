@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - Prisma Studio
echo ========================================
echo.

echo 正在启动 Prisma Studio...
echo 访问地址: http://localhost:5555
echo.
echo 按 Ctrl+C 停止服务
echo.
echo ========================================
echo.

call npm run db:studio
