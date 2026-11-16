Add-Type -AssemblyName System.Drawing
$images = @(
    "media_1794832404590_aa412bae.jpg",
    "media_1794832404595_13ab7099.jpg",
    "media_1794832404590_175befe0.jpg",
    "media_1794832404584_baea2b89.jpg",
    "media_1794832404607_a5c2ae13.jpg",
    "media_1794832404604_90b49e2c.jpg",
    "media_1794832404597_9fd33584.jpg",
    "media_1794832404613_68d441b0.jpg"
)

$baseDir = "C:\Users\prana\.gemini\antigravity\brain\833c3432-99c1-45cf-8d20-fee65bb5646e\.user_uploaded"

foreach ($name in $images) {
    $path = Join-Path $baseDir $name
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    # Sample top, center, bottom colors
    $top = $bmp.GetPixel([int]($bmp.Width / 2), 50)
    $mid = $bmp.GetPixel([int]($bmp.Width / 2), [int]($bmp.Height / 2))
    $bot = $bmp.GetPixel([int]($bmp.Width / 2), $bmp.Height - 50)
    Write-Output "$name ($($bmp.Width)x$($bmp.Height)): Top($($top.R),$($top.G),$($top.B)) Mid($($mid.R),$($mid.G),$($mid.B)) Bot($($bot.R),$($bot.G),$($bot.B))"
    $bmp.Dispose()
}

