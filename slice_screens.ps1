Add-Type -AssemblyName System.Drawing
$imgPath = "C:\Users\prana\.gemini\antigravity\brain\833c3432-99c1-45cf-8d20-fee65bb5646e\.user_uploaded\media_1794831228674_2f1051aa.jpg"
$bmp = [System.Drawing.Bitmap]::FromFile($imgPath)
Write-Output "Size: $($bmp.Width) x $($bmp.Height)"

# Scan horizontal divider
Write-Output "--- Horizontal scan at x=100 ---"
for ($y = 495; $y -le 525; $y++) {
    $c = $bmp.GetPixel(100, $y)
    if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
        Write-Output "White line at y=$y ($($c.R), $($c.G), $($c.B))"
    }
}

# Scan vertical dividers at y=200
Write-Output "--- Vertical scan at y=200 ---"
for ($x = 210; $x -le 250; $x++) {
    $c = $bmp.GetPixel($x, 200)
    if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
        Write-Output "White col 1 at x=$x"
    }
}
for ($x = 440; $x -le 480; $x++) {
    $c = $bmp.GetPixel($x, 200)
    if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
        Write-Output "White col 2 at x=$x"
    }
}
for ($x = 680; $x -le 720; $x++) {
    $c = $bmp.GetPixel($x, 200)
    if ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240) {
        Write-Output "White col 3 at x=$x"
    }
}

$bmp.Dispose()

