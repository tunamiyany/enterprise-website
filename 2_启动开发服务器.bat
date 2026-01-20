@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 启动开发服务器
echo ========================================
echo.

echo 正在启动开发服务器...
echo 访问地址: http://localhost:3001
echo.
echo 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

call npm run dev
