@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 构建生产版本
echo ========================================
echo.

echo 正在构建生产版本...
call npm run build

if errorlevel 1 (
    echo.
    echo ❌ 构建失败
    pause
    exit /b 1
)

echo.
echo ========================================
echo ✓ 构建完成！
echo ========================================
echo.
echo 运行 "5_启动生产服务器.bat" 启动生产服务器
echo.
pause
