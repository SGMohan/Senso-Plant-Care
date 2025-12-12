@echo off
echo Starting Senso Plant Care Servers...

REM Start Backend Server
echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start Frontend Server
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo Both servers are starting...
echo Backend: http://192.168.1.3:3000
echo Frontend: http://192.168.1.3:8081
pause