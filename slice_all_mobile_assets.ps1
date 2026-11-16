Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\prana\.gemini\antigravity\brain\833c3432-99c1-45cf-8d20-fee65bb5646e\.user_uploaded\media_1794831228674_2f1051aa.jpg"
$outDir = "c:\Users\prana\Desktop\Invitation\public\images\mobile"
if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force }

$bmp = [System.Drawing.Bitmap]::FromFile($inputPath)

$columns = @(
    @{ Name = "col0"; X = 0; W = 231 },
    @{ Name = "col1"; X = 237; W = 228 },
    @{ Name = "col2"; X = 469; W = 230 },
    @{ Name = "col3"; X = 703; W = 232 }
)

$rows = @(
    @{ Name = "row0"; Y = 0; H = 509 },
    @{ Name = "row1"; Y = 514; H = 510 }
)

$names = @(
    @("mobile-hero-bg.jpg", "mobile-envelope-closed.jpg", "mobile-envelope-opened.jpg", "mobile-story-bg.jpg"),
    @("mobile-events-bg.jpg", "mobile-countdown-bg.jpg", "mobile-venue-bg.jpg", "mobile-rsvp-bg.jpg")
)

for ($r = 0; $r -lt 2; $r++) {
    for ($c = 0; $c -lt 4; $c++) {
        $col = $columns[$c]
        $row = $rows[$r]
        $rect = [System.Drawing.Rectangle]::new($col.X, $row.Y, $col.W, $row.H)
        $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
        $targetName = $names[$r][$c]
        $targetPath = Join-Path $outDir $targetName
        $cropped.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $cropped.Dispose()
        Write-Output "Saved: $targetName ($($col.W)x$($row.H))"
    }
}

$bmp.Dispose()
Write-Output "Done slicing all 8 mobile backgrounds!"

