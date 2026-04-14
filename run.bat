@echo off
echo ===========================================
echo   Smart Resume Analyzer - Startup Script
echo ===========================================
echo.
echo Checking and installing dependencies... (This may take a moment)
echo.

echo [1/2] Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo [2/2] Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo ===========================================
echo   Starting Backend and Frontend Servers...
echo ===========================================
echo.

REM Start backend server in a new command window
start "Smart Resume Backend (API)" cmd /k "title Smart Resume Backend && cd backend && npm run start"

REM Start frontend server in a new command window
start "Smart Resume Frontend (UI)" cmd /k "title Smart Resume Frontend && cd frontend && npm run dev"

echo The servers are booting up!
echo Ensure the two new black windows remain open while you use the app.
echo.
echo Once they finish loading, open your web browser and go to:
echo http://localhost:5173
echo.
pause
