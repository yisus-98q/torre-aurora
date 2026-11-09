@echo off
title Torre Aurora 3D - Instrucciones de Setup
color 1F
cls

echo ============================================
echo   🏗️  TORRE AURORA 3D
echo ============================================
echo.
echo   Proyecto creado automaticamente por IA
echo   Desarrollado con Next.js 14 + Three.js
echo.
echo ============================================
echo.

:: Verificar directorio
if not exist "D:\torre-aurora\package.json" (
    echo ❌ Error: No encontrado package.json
    echo Ejecute desde: D:\torre-aurora
    pause
    exit /b
)

cd D:\torre-aurora

echo 📁 Directorio: %cd%
echo.

echo 📦 Paso 1: Instalando dependencias...
echo.
npm install
echo.

if %errorlevel% neq 0 (
    echo ⚠️ npm install tuvo problemas.
    echo Intente ejecutar manualmente: cd D:\torre-aurora && npm install
    pause
    exit /b
)

echo ✅ Dependencias instaladas correctamente.
echo.

echo ============================================
echo 🚀 Paso 2: Iniciando servidor...
echo ============================================
echo.
echo   El proyecto se abrirá en: http://localhost:3000
echo.

echo ⏳ Esperando que Next.js inicie...
echo.

:: Intentar iniciar el servidor
npm run dev >nul 2>&1 &
echo.
echo Si el servidor no inicia automaticamente, abra otro terminal y ejecute:
echo.
echo   cd D:\torre-aurora
echo   npm run dev
echo.
echo Presione cualquier tecla para salir...
pause >nul