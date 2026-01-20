@echo off
chcp 65001 >nul
echo ========================================
echo 一键修复安装
echo ========================================
echo.

echo [1/4] 清理环境...
if exist node_modules (
    echo 删除 node_modules...
    rd /s /q node_modules
)
if exist package-lock.json (
    echo 删除 package-lock.json...
    del package-lock.json
)
echo ✓ 清理完成

echo.
echo [2/4] 配置镜像源...
call npm config set registry https://registry.npmmirror.com
echo ✓ 已配置淘宝镜像

echo.
echo [3/4] 安装依赖（16个包）...
call npm install --legacy-peer-deps --loglevel=error

if errorlevel 1 (
    echo.
    echo ❌ 安装失败
    echo.
    echo 尝试方案:
    echo 1. 检查网络连接
    echo 2. 清理 npm 缓存: npm cache clean --force
    echo 3. 使用极速安装: 极速安装.bat
    echo.
    pause
    exit /b 1
)

echo.
echo [4/4] 验证安装...
call npm list --depth=0

echo.
echo ========================================
echo ✓ 安装成功！
echo ========================================
echo.
echo 下一步:
echo - 运行 "2_启动开发服务器.bat" 启动项目
echo.
pause
