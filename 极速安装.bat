@echo off
chcp 65001 >nul
echo ========================================
echo 极速安装 - 仅安装核心包（共13个）
echo ========================================
echo.

echo 清理旧文件...
if exist node_modules (
    rd /s /q node_modules
    echo ✓ 已删除 node_modules
)
if exist package-lock.json (
    del package-lock.json
    echo ✓ 已删除 package-lock.json
)

echo.
echo 备份原 package.json...
copy package.json package.json.bak >nul

echo 使用精简版配置...
copy package.minimal.json package.json >nul

echo.
echo 配置淘宝镜像...
call npm config set registry https://registry.npmmirror.com

echo.
echo 开始安装（预计1-2分钟）...
call npm install

if errorlevel 1 (
    echo.
    echo ❌ 安装失败，恢复原配置...
    copy package.json.bak package.json >nul
    pause
    exit /b 1
)

echo.
echo ✓ 核心包安装完成！
echo.
echo 注意: 这是精简版，不包含数据库和多语言功能
echo 如需完整功能，请运行 "快速安装.bat"
echo.
pause
