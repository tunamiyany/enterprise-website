@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 启动生产服务器
echo ========================================
echo.

if not exist .next (
    echo ❌ 错误: 未找到构建文件
    echo 请先运行 "4_构建生产版本.bat"
    pause
    exit /b 1
)

echo 正在启动生产服务器...
echo 访问地址: http://localhost:3000
echo.
echo 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

call npm start
