@echo off
chcp 65001 >nul
title Math Everyday - site local (tout debloque)
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo  Node.js n'est pas installe sur cet ordinateur.
  echo  Telecharge-le sur https://nodejs.org ^(version LTS^), installe-le, puis relance ce fichier.
  echo.
  pause
  exit /b 1
)

echo.
echo  Math Everyday en local : http://localhost:4182
echo  Compte Demo abonne a vie, espace professeur, tout est debloque.
echo  Les comptes sont simules dans le navigateur : rien n'est envoye en ligne.
echo.
echo  Laisse cette fenetre ouverte pendant que tu utilises le site.
echo  Pour arreter le site : ferme cette fenetre.
echo.

rem ouvre le navigateur 2 secondes plus tard, le temps que le serveur demarre
start "" /b powershell -NoProfile -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process 'http://localhost:4182/?fauxcloud=1&debloque=1#/aujourdhui'"
node _serve.js

echo.
echo  Le serveur s'est arrete. Si le message parle de EADDRINUSE, le site tourne deja :
echo  ouvre simplement http://localhost:4182/?fauxcloud=1^&debloque=1
echo.
pause
