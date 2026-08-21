Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourcePath = Join-Path $root 'ganqi-selected-homepage-direction.png'
$implementationPath = Join-Path $root 'ganqi-implementation-desktop.png'
$heroPath = Join-Path $root 'ganqi-implementation-desktop.png'

function Draw-FitWidth($graphics, $image, $x, $y, $width) {
  $height = [int][Math]::Round($image.Height * $width / $image.Width)
  $graphics.DrawImage($image, $x, $y, $width, $height)
  return $height
}

$source = [System.Drawing.Image]::FromFile($sourcePath)
$implementation = [System.Drawing.Image]::FromFile($implementationPath)
$board = New-Object System.Drawing.Bitmap 1436, 3800
$graphics = [System.Drawing.Graphics]::FromImage($board)
$graphics.Clear([System.Drawing.Color]::White)
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
[void](Draw-FitWidth $graphics $source 0 0 718)
[void](Draw-FitWidth $graphics $implementation 718 0 718)
$board.Save((Join-Path $root 'ganqi-comparison-full.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$graphics.Dispose()
$board.Dispose()

$hero = [System.Drawing.Image]::FromFile($heroPath)
$heroBoard = New-Object System.Drawing.Bitmap 1436, 500
$heroGraphics = [System.Drawing.Graphics]::FromImage($heroBoard)
$heroGraphics.Clear([System.Drawing.Color]::White)
$heroGraphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$sourceRect = New-Object System.Drawing.Rectangle 0, 0, 718, 500
$heroGraphics.DrawImage($source, $sourceRect, $sourceRect, [System.Drawing.GraphicsUnit]::Pixel)
$heroGraphics.DrawImage($hero, (New-Object System.Drawing.Rectangle 718, 0, 718, 500), (New-Object System.Drawing.Rectangle 0, 0, 1440, 1000), [System.Drawing.GraphicsUnit]::Pixel)
$heroBoard.Save((Join-Path $root 'ganqi-comparison-hero.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$heroGraphics.Dispose()
$heroBoard.Dispose()

$source.Dispose()
$implementation.Dispose()
$hero.Dispose()
