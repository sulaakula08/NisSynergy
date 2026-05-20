# Install NIS Energy app on Android phone via USB
$ErrorActionPreference = "Stop"
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:Path"
$env:CI = "1"
$env:EXPO_NO_TELEMETRY = "1"

$projectRoot = Split-Path $PSScriptRoot -Parent
Set-Location $projectRoot

Write-Host ""
Write-Host "=== NIS Energy - USB install ===" -ForegroundColor Cyan
Write-Host "1. Developer options -> USB debugging ON"
Write-Host "2. USB cable connected (File transfer mode)"
Write-Host "3. Allow USB debugging on phone"
Write-Host ""

$maxWait = 180
$elapsed = 0
$found = $false
$deviceLine = $null

while ($elapsed -lt $maxWait) {
    $out = adb devices 2>&1
    $deviceLine = $out | Where-Object { $_ -match "\tdevice$" } | Select-Object -First 1
    if ($deviceLine) {
        $found = $true
        Write-Host "Device found: $deviceLine" -ForegroundColor Green
        break
    }
    if (($elapsed % 10) -eq 0) {
        Write-Host "Waiting for phone... ($elapsed / $maxWait sec)"
    }
    Start-Sleep -Seconds 2
    $elapsed += 2
}

if (-not $found) {
    Write-Host "Phone not detected. Check cable and USB debugging." -ForegroundColor Red
    exit 1
}

$serial = ($deviceLine -split "\t")[0].Trim()
$state = adb -s $serial get-state 2>&1
if ($state -ne "device") {
    Write-Host "Device $serial not ready (state: $state). Replug USB." -ForegroundColor Red
    exit 1
}

# Expo uses ANDROID_SERIAL (adb id), NOT --device serial
$env:ANDROID_SERIAL = $serial

Write-Host "Port forward Metro 8081..." -ForegroundColor Yellow
adb -s $serial reverse tcp:8081 tcp:8081

$apk = Join-Path $projectRoot "android\app\build\outputs\apk\debug\app-debug.apk"

Write-Host "Building and installing on $serial (5-15 min first time)..." -ForegroundColor Yellow
$env:ANDROID_SERIAL = $serial
npx expo run:android --port 8081
if ($LASTEXITCODE -ne 0 -and (Test-Path $apk)) {
    Write-Host "Expo install failed. Trying adb install..." -ForegroundColor Yellow
    adb -s $serial install -r $apk
    if ($LASTEXITCODE -eq 0) {
        adb -s $serial shell monkey -p com.anonymous.nisenergy -c android.intent.category.LAUNCHER 1 2>$null
        Write-Host "APK installed. Open 'nisenergy' on phone." -ForegroundColor Green
    }
}
