@echo off
chcp 65001 >nul
echo ========================================
echo 企业网站项目 - 安装依赖
echo ========================================
echo.

echo [1/3] 检查 Node.js 环境...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未检测到 Node.js
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js 已安装
node --version
echo.

echo [2/3] 安装项目依赖...
echo 这可能需要几分钟时间，请耐心等待...
echo.
call npm install

if errorlevel 1 (
    echo.
    echo ❌ 依赖安装失败
    echo 请检查网络连接或尝试使用国内镜像:
    echo npm config set registry https://registry.npmmirror.com
    pause
    exit /b 1
)

echo.
echo [3/3] 复制环境变量文件...
if not exist .env (
    copy .env.example .env >nul
    echo ✓ 已创建 .env 文件
) else (
    echo ✓ .env 文件已存在
)

echo.
echo ========================================
echo ✓ 安装完成！
echo ========================================
echo.
echo 下一步:
echo 1. 编辑 .env 文件配置环境变量
echo 2. 运行 "1_初始化数据库.bat" 初始化数据库
echo 3. 运行 "2_启动开发服务器.bat" 启动项目
echo.
pause
