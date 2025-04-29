@echo off
echo ==========================================
echo Running MERN Project Offline Setup
echo ==========================================
cd /d %~dp0

:: Step 1: Install server dependencies
echo.
echo === Installing dependencies in /server ===
cd server
call npm install

:: Step 2: Install concurrently if not installed
echo.
echo === Checking for 'concurrently' ===
IF NOT EXIST node_modules\concurrently (
    echo Installing concurrently module...
    call npm install concurrently
) ELSE (
    echo 'concurrently' already installed.
)

:: Step 3: Install client dependencies
echo.
echo === Installing dependencies in /client ===
cd ../client
call npm install

:: Step 4: Start both servers using one terminal
echo.
echo === Starting backend and frontend ===
cd ../server
call npm run all

pause