@echo off
echo Fixing PowerShell execution policy...
echo.
powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"
echo.
echo PowerShell execution policy updated!
echo You can now use: npm run dev
echo.
pause

