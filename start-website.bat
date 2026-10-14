@echo off
title Pushpraj Global Consulting - Local Web Server
echo ========================================================
echo   Starting Pushpraj Global Website on http://localhost:8080
echo ========================================================
echo.
start http://localhost:8080
python -m http.server 8080
pause
