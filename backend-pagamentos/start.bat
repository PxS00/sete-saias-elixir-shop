@echo off
echo ========================================
echo INICIANDO SERVIDOR SETE SAIAS
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando se o Node.js está instalado...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERRO: Node.js não encontrado!
    echo Instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado!
echo.

echo Verificando dependências...
if not exist "node_modules" (
    echo Instalando dependências...
    npm install
)

echo ✅ Dependências OK!
echo.

echo Iniciando servidor na porta 3001...
echo.
echo Dashboard: http://localhost:3001/dashboard
echo API: http://localhost:3001/api/pending-orders
echo.
echo ========================================
echo PRESSIONE CTRL+C PARA PARAR O SERVIDOR
echo ========================================
echo.

node server.js 