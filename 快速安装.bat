@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 快速安装（使用国内镜像）
echo ========================================
echo.

echo 正在配置淘宝镜像源...
call npm config set registry https://registry.npmmirror.com

echo.
echo 开始安装依赖（共16个包）...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ❌ 安装失败，尝试清理缓存后重试...
    call npm cache clean --force
    call npm install
)

echo.
echo ✓ 安装完成！
echo.
echo 恢复默认镜像源...
call npm config set registry https://registry.npmjs.org

echo.
pause
