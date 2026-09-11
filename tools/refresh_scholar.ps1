# refresh_scholar.ps1: refresh the Google Scholar numbers from this computer and
# publish them if they changed. Run weekly by the Windows scheduled task
# "Scholar stats update" (Google blocks this request from GitHub's servers,
# but not from a normal computer).
#
# Safety: if the local repository has commits that are not on GitHub yet,
# nothing is pushed; the run is only logged. Only data/scholar.js is ever committed.
# Log: %LOCALAPPDATA%\arash-site\scholar-refresh.log

$ErrorActionPreference = "Stop"
$repo = Split-Path -Parent $PSScriptRoot
$git = (Get-Command git -ErrorAction SilentlyContinue).Source
if (-not $git) { $git = "C:\Program Files\Git\cmd\git.exe" }
$py = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $py) { $py = "C:\opt\Python312\python.exe" }
$logDir = Join-Path $env:LOCALAPPDATA "arash-site"
New-Item -ItemType Directory -Force $logDir | Out-Null
$log = Join-Path $logDir "scholar-refresh.log"
function Log($msg) { Add-Content -Path $log -Value ("{0:yyyy-MM-dd HH:mm}  {1}" -f (Get-Date), $msg) -Encoding UTF8 }

try {
    & $git -C $repo fetch --quiet origin main
    $ahead = [int](& $git -C $repo rev-list --count origin/main..HEAD)
    $behind = [int](& $git -C $repo rev-list --count HEAD..origin/main)
    if ($ahead -gt 0) { Log "Skipped: $ahead local commit(s) not yet published; nothing pushed."; exit 0 }
    if ($behind -gt 0) { & $git -C $repo merge --ff-only --quiet origin/main }

    $ErrorActionPreference = "Continue"
    $out = & $py -B (Join-Path $repo "tools\update_scholar.py") | Out-String
    $ErrorActionPreference = "Stop"
    Log ($out.Trim() -split "`r?`n" | Select-Object -Last 1)

    & $git -C $repo diff --quiet -- data/scholar.js
    if ($LASTEXITCODE -eq 0) { exit 0 }

    & $git -C $repo commit --quiet -m "Update Scholar stats" -- data/scholar.js
    & $git -C $repo push --quiet origin main
    Log "Published new Scholar stats."
} catch {
    Log ("Error: " + $_.Exception.Message)
    exit 1
}
