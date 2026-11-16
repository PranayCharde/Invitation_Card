Add-Type -AssemblyName System.Drawing

$fileMap = @{
    "mobile-hero-bg.jpg"          = "media_1794832404597_9fd33584.jpg"
    "mobile-envelope-closed.jpg"  = "media_1794832404607_a5c2ae13.jpg"
    "mobile-envelope-opened.jpg"  = "media_1794832404604_90b49e2c.jpg"
    "mobile-story-bg.jpg"         = "media_1794832404590_175befe0.jpg"
    "mobile-events-bg.jpg"        = "media_1794832404613_68d441b0.jpg"
    "mobile-countdown-bg.jpg"     = "media_1794832404584_baea2b89.jpg"
    "mobile-venue-bg.jpg"         = "media_1794832404595_13ab7099.jpg"
    "mobile-rsvp-bg.jpg"          = "media_1794832404590_aa412bae.jpg"
}

$baseDir = "C:\Users\prana\.gemini\antigravity\brain\833c3432-99c1-45cf-8d20-fee65bb5646e\.user_uploaded"
$outDir = "c:\Users\prana\Desktop\Invitation\public\images\mobile"
$distDir = "c:\Users\prana\Desktop\Invitation\dist\images\mobile"

foreach ($entry in $fileMap.GetEnumerator()) {
    $targetName = $entry.Key
    $sourceFile = $entry.Value
    $srcPath = Join-Path $baseDir $sourceFile
    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

    # Detect white/near-white borders on left, right, top, bottom
    $leftTrim = 0
    for ($x = 0; $x -lt 25; $x++) {
        $c = $bmp.GetPixel($x, [int]($bmp.Height / 2))
        if ($c.R -gt 235 -and $c.G -gt 235 -and $c.B -gt 235) {
            $leftTrim = $x + 1
        }
    }

    $rightTrim = 0
    for ($x = $bmp.Width - 1; $x -ge $bmp.Width - 25; $x--) {
        $c = $bmp.GetPixel($x, [int]($bmp.Height / 2))
        if ($c.R -gt 235 -and $c.G -gt 235 -and $c.B -gt 235) {
            $rightTrim = $bmp.Width - $x
        }
    }

    $topTrim = 0
    for ($y = 0; $y -lt 25; $y++) {
        $c = $bmp.GetPixel([int]($bmp.Width / 2), $y)
        if ($c.R -gt 235 -and $c.G -gt 235 -and $c.B -gt 235) {
            $topTrim = $y + 1
        }
    }

    $bottomTrim = 0
    for ($y = $bmp.Height - 1; $y -ge $bmp.Height - 25; $y--) {
        $c = $bmp.GetPixel([int]($bmp.Width / 2), $y)
        if ($c.R -gt 235 -and $c.G -gt 235 -and $c.B -gt 235) {
            $bottomTrim = $bmp.Height - $y
        }
    }

    $newW = $bmp.Width - $leftTrim - $rightTrim
    $newH = $bmp.Height - $topTrim - $bottomTrim
    Write-Output "$targetName (from $sourceFile): Trim(L:$leftTrim, R:$rightTrim, T:$topTrim, B:$bottomTrim) -> Final: ${newW}x${newH}"

    $rect = [System.Drawing.Rectangle]::new($leftTrim, $topTrim, $newW, $newH)
    $cropped = $bmp.Clone($rect, $bmp.PixelFormat)
    
    $savePath1 = Join-Path $outDir $targetName
    $savePath2 = Join-Path $distDir $targetName
    $cropped.Save($savePath1, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Save($savePath2, [System.Drawing.Imaging.ImageFormat]::Jpeg)

    $cropped.Dispose()
    $bmp.Dispose()
}

Write-Output "Successfully processed and copied all 8 mobile images with auto-trimming!"

