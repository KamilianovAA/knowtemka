@echo off
goto begin
 
:usage
echo Usage: %~n0
echo.
echo Starts the server
echo and waits for a key to stop.
goto end
 
:begin
if not "%1"=="" goto usage
cd server
start "Apache server" /B mapache.exe
echo Server has started
echo.
 
:runbrowser
echo Your browser will open http://localhost:8800
echo.
start http://localhost:8800/
 
:wait
echo To stop the server
pause
 
:stop
ApacheKill.exe
echo ... server stopped.
echo You can close this window now.
 
:end
