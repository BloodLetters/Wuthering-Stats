Add-Type -AssemblyName System.Web

$global:gamePath = $null
$global:urlFound = $false
$global:logFound = $false
$global:folderFound = $false
$global:err = ""
$global:checkedDirectories = @()

function Write-Status {
    param(
        [string]$message,
        [string]$color = "White"
    )
    Write-Host $message -ForegroundColor $color
}

function LogCheck {
    param(
        [string]$path
    )
    
    $global:folderFound = $false
    $global:logFound = $false
    $global:urlFound = $false
    
    if (!(Test-Path $path)) {
        return
    }
    
    $global:folderFound = $true
    
    $logPaths = @(
        "$path\Client\Saved\Logs\Client.log",
        "$path\Client\Binaries\Win64\ThirdParty\KrPcSdk_Global\KRSDKRes\KRSDKWebView\debug.log"
    )
    
    $urlPatterns = @(
        "https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record*",
        '"#url": "(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)/aki/gacha/index\.html#/record[^"]*)"'
    )
    
    $urlToCopy = $null
    
    foreach ($i in 0..1) {
        if (!(Test-Path $logPaths[$i])) {
            continue
        }
        
        $global:logFound = $true
        $content = Get-Content $logPaths[$i] -ErrorAction SilentlyContinue
        
        if ($null -eq $content) {
            continue
        }
        
        $match = $content | Select-String -Pattern $urlPatterns[$i] | Select-Object -Last 1
        
        if ($null -eq $match) {
            continue
        }
        
        if ($i -eq 0) {
            $urlToCopy = $match -replace '.*?(https://aki-gm-resources(-oversea)?\.aki-game\.(net|com)[^"]*).*', '$1'
        } else {
            $urlToCopy = $match.Matches.Groups[1].Value
        }
        
        if (![string]::IsNullOrWhiteSpace($urlToCopy)) {
            Write-Status "URL found in $($logPaths[$i])"
            $global:urlFound = $true
            break
        }
    }
    
    if ($global:urlFound) {
        Write-Status "`nConvene Record URL: $urlToCopy"
        Set-Clipboard $urlToCopy
        Write-Status "`nLink copied to clipboard, paste it in wuwatracker.com and click the Import History button." -color Green
    }
}

function Check-Path {
    param(
        [string]$path,
        [string]$source
    )
    
    if ($path -like "*OneDrive*") {
        $global:err += "Skipping path as it contains 'OneDrive': $($path)`n"
        return
    }
    
    if ($path -in $global:checkedDirectories) {
        $global:err += "Already checked: $($path)`n"
        return
    }
    
    $global:checkedDirectories += $path
    LogCheck $path
    
    if ($global:urlFound) {
        return $true
    }
    
    if ($global:logFound) {
        $global:err += "Path checked ($source): $($path).`n"
        $global:err += "Cannot find the convene history URL in logs! Please open your Convene History first!`n"
        $global:err += "Contact Us if you think this is correct directory and still facing issues.`n"
    }
    elseif ($global:folderFound) {
        $global:err += "No logs found at $path`n"
    }
    else {
        $global:err += "No Installation found at $path`n"
    }
    
    return $false
}

function Check-RegistryPaths {
    param(
        [string[]]$registryPaths,
        [string]$pattern,
        [string]$source
    )
    
    foreach ($regPath in $registryPaths) {
        try {
            $entries = (Get-ItemProperty -Path $regPath -ErrorAction SilentlyContinue).PSObject.Properties | 
                      Where-Object { $_.Value -like "*wuthering*" -and $_.Name -like $pattern }
            
            if ($entries.Count -eq 0) {
                continue
            }
            
            $global:err += "$source($($entries.Count)):`n"
            
            foreach ($entry in $entries) {
                $path = if ($source -eq "MUI Cache") {
                    ($entry.Name -split '\\client\\')[0]
                } else {
                    (($entry.Value -split 'App=')[1] -split '\\client\\')[0]
                }
                
                if (Check-Path $path $source) {
                    return $true
                }
            }
        }
        catch {
            $global:err += "Error accessing $source registry: $_`n"
        }
    }
    
    return $false
}

Write-Status "Attempting to find URL automatically..."

# Check MUI Cache
if (!$global:urlFound) {
    $muiCachePath = "Registry::HKEY_CURRENT_USER\Software\Classes\Local Settings\Software\Microsoft\Windows\Shell\MuiCache"
    if (Check-RegistryPaths @($muiCachePath) "*client-win64-shipping.exe*" "MUI Cache") {
        exit
    }
    $global:err += "No entries found in MUI Cache.`n"
}

# Check Firewall
if (!$global:urlFound) {
    $firewallPath = "Registry::HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SharedAccess\Parameters\FirewallPolicy\FirewallRules"
    if (Check-RegistryPaths @($firewallPath) "*client-win64-shipping*" "Firewall") {
        exit
    }
    $global:err += "No entries found in firewall.`n"
}

# Check Native Installations
if (!$global:urlFound) {
    $regPaths = @(
        "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\*",
        "Registry::HKEY_LOCAL_MACHINE\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*"
    )
    
    try {
        $installPaths = Get-ItemProperty -Path $regPaths -ErrorAction SilentlyContinue | 
                       Where-Object { $_.DisplayName -like "*wuthering*" } | 
                       Select-Object -ExpandProperty InstallPath -Unique
        
        if ($installPaths) {
            foreach ($path in $installPaths) {
                if (Check-Path $path "Native Install") {
                    exit
                }
            }
        }
        else {
            $global:err += "No Entry found for Native Client.`n"
        }
    }
    catch {
        $global:err += "Error accessing registry: $_`n"
    }
}

# Check Common Installation Paths
if (!$global:urlFound) {
    $diskLetters = (Get-PSDrive -PSProvider FileSystem).Name
    $commonPaths = @(
        "\Wuthering Waves Game",
        "\Wuthering Waves\Wuthering Waves Game",
        "\Program Files\Epic Games\WutheringWavesj3oFh",
        "\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game"
    )
    
    foreach ($diskLetter in $diskLetters) {
        foreach ($relativePath in $commonPaths) {
            $fullPath = "$diskLetter`:$relativePath"
            
            if (!(Test-Path $fullPath)) {
                continue
            }
            
            if (Check-Path $fullPath "Common Paths") {
                exit
            }
        }
    }
    
    $global:err += "No URL Found in Common Installation Paths`n"
}

Write-Status $global:err -color Magenta

# Manual Input
while (!$global:urlFound) {
    Write-Status "Game install location not found or log files missing." -color Red
    Write-Status "Please to open your convenence history first!"
    Write-Status "Otherwise, please enter the game install location path."
    Write-Status 'Common install locations:' -color Yellow
    Write-Status '  C:\Wuthering Waves' -color Yellow
    Write-Status '  C:\Wuthering Waves\Wuthering Waves Game' -color Yellow
    Write-Status 'For EGS:' -color Yellow
    Write-Status '  C:\Program Files\Epic Games\WutheringWavesj3oFh' -color Yellow
    Write-Status '  C:\Program Files\Epic Games\WutheringWavesj3oFh\Wuthering Waves Game' -color Yellow
    
    $path = Read-Host "Path (Type exit to quit)"
    
    if ($path.ToLower() -eq "exit") {
        break
    }
    
    if ([string]::IsNullOrWhiteSpace($path)) {
        Write-Status "Invalid game location. Did you set your game location properly?" -color Red
        continue
    }
    
    Write-Status "`n`n`nUser provided path: $($path)" -color Magenta
    LogCheck $path
    
    if ($global:urlFound) {
        break
    }
    
    if ($global:logFound) {
        $global:err += "Path checked: $($path).`n"
        $global:err += "Cannot find the convene history URL in logs! Please open your Convene History first!`n"
        $global:err += "Contact Us if you think this is correct directory and still facing issues.`n"
    }
    elseif ($global:folderFound) {
        Write-Status "No logs found at $path`n"
    }
    else {
        Write-Status "Folder not found in user-provided path: $path"
        Write-Status "Could not find log files. Did you set your game location properly or open your Convene History first?" -color Red
    }
}