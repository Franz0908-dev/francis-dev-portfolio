$ErrorActionPreference = 'Stop'
# Render only the reviewed public PDFs; never use the private certificate originals.
Add-Type -AssemblyName System.Runtime.WindowsRuntime
[Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Data.Pdf.PdfPageRenderOptions, Windows.Data.Pdf, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime] | Out-Null
$taskMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
$actionMethod = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and -not $_.IsGenericMethod -and $_.GetParameters().Count -eq 1 } | Select-Object -First 1
function Wait-Result($operation, $resultType) {
  $task = $taskMethod.MakeGenericMethod($resultType).Invoke($null, @($operation))
  $task.Wait()
  return $task.Result
}
$outputDirectory = Join-Path (Get-Location) '.cache/certificate-previews'
New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
$manifest = @()
foreach ($file in (Get-ChildItem public/certificates -File -Filter '*.pdf' | Sort-Object Name)) {
  $pdfFile = Wait-Result ([Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName)) ([Windows.Storage.StorageFile])
  $document = Wait-Result ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($pdfFile)) ([Windows.Data.Pdf.PdfDocument])
  if ($document.PageCount -ne 1) { throw "Expected a one-page public certificate: $($file.Name)" }
  $page = $document.GetPage(0)
  $memory = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
  $options = New-Object Windows.Data.Pdf.PdfPageRenderOptions
  $options.DestinationWidth = 1280
  $renderTask = $actionMethod.Invoke($null, @($page.RenderToStreamAsync($memory, $options)))
  $renderTask.Wait()
  $readStream = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($memory)
  $imagePath = Join-Path $outputDirectory "$($file.BaseName).png"
  $outputStream = [System.IO.File]::Create($imagePath)
  $readStream.CopyTo($outputStream)
  $outputStream.Dispose()
  $readStream.Dispose()
  $page.Dispose()
  $manifest += @{ name = $file.BaseName; imagePath = $imagePath }
}
$manifest | ConvertTo-Json | Set-Content (Join-Path $outputDirectory 'sources.json') -Encoding utf8
