@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo === FX Desk GitHub'a gonderiliyor... ===
git add -A
git commit -m "guncelleme %date% %time%"
git push
echo.
echo === Bitti! Site 1-2 dakika icinde guncellenir. ===
pause
