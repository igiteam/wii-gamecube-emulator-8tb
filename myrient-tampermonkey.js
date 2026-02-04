// ==UserScript==
// @name         Myrient Wii Game Downloader (Enhanced)
// @namespace    http://tampermonkey.net/
// @version      2.4
// @description  Collect Wii game links and create a resumable bash script with Python 3 check and proper headers
// @match        https://myrient.erista.me/files/Redump/Nintendo%20-%20Wii%20-%20NKit%20RVZ%20[zstd-19-128k]/
// @match        https://myrient.erista.me/files/Redump/Nintendo%20-%20GameCube%20-%20NKit%20RVZ%20%5Bzstd-19-128k%5D/
// @icon         https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://myrient.erista.me/files/Redump/Sony%20-%20PlayStation/&size=256
// @grant        GM_download
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
  "use strict";

  // Create enhanced download button
  const downloadBtn = document.createElement("button");
  downloadBtn.textContent = "📥 Generate Enhanced Download Script";
  downloadBtn.style.cssText =
    "position:fixed;top:20px;right:20px;z-index:9999;padding:12px 20px;background:#0056b3;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.1);font-size:14px;";
  document.body.appendChild(downloadBtn);

  downloadBtn.addEventListener("click", function () {
    const allLinks = [];
    const rows = document.querySelectorAll("tr");

    // Get current URL to determine platform
    const currentUrl = window.location.href;
    const isGameCube = currentUrl.includes("GameCube");
    const isWii = currentUrl.includes("Wii");
    let platform = "Wii";
    let expectedFiles = 3778; // Default Wii file count
    let expectedSize = "6.01 TB"; // Default Wii size

    if (isGameCube) {
      platform = "GameCube";
      expectedFiles = 2016;
      expectedSize = "1.52 TB";
    }

    // Parse table rows
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length >= 2) {
        const linkCell = cells[0];
        const sizeCell = cells[1];
        const dateCell = cells[2];
        const link = linkCell.querySelector("a");

        if (
          link &&
          link.href.includes(".zip") &&
          !link.textContent.includes("Parent directory")
        ) {
          const filename = link.textContent.trim();
          const sizeText = sizeCell.textContent.trim();
          const dateText = dateCell ? dateCell.textContent.trim() : "Unknown";

          allLinks.push({
            url: link.href,
            filename: filename,
            size: sizeText,
            date: dateText,
          });
        }
      }
    });

    console.log(
      `Found ${allLinks.length} ${platform} game files (Expected: ${expectedFiles})`
    );

    // Generate bash script
    const bashScript = generateEnhancedBashScript(
      allLinks,
      platform,
      currentUrl
    );

    // Download the script file
    const blob = new Blob([bashScript], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dolphin_${platform.toLowerCase()}_games.sh`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Show detailed alert
    const totalSize = calculateTotalSize(allLinks);
    alert(
      `✅ Generated script for ${platform} games!\n\n` +
        `Files: ${allLinks.length} (Expected: ${expectedFiles})\n` +
        `Total: ~${totalSize}\n` +
        `Script saved as: dolphin_${platform.toLowerCase()}_games.sh\n\n` +
        `IMPORTANT: Run with: chmod +x dolphin_${platform.toLowerCase()}_games.sh && ./dolphin_${platform.toLowerCase()}_games.sh`
    );
  });

  function calculateTotalSize(links) {
    let totalMB = 0;
    links.forEach((item) => {
      const sizeText = item.size.toUpperCase();
      if (sizeText.includes("GIB")) {
        const gb = parseFloat(sizeText);
        totalMB += gb * 1024;
      } else if (sizeText.includes("MIB")) {
        const mb = parseFloat(sizeText);
        totalMB += mb;
      } else if (sizeText.includes("KIB")) {
        const kb = parseFloat(sizeText) / 1024;
        totalMB += kb;
      }
    });

    if (totalMB >= 1024 * 1024) {
      // TB
      return (totalMB / (1024 * 1024)).toFixed(2) + " TB";
    } else if (totalMB >= 1024) {
      // GB
      return (totalMB / 1024).toFixed(2) + " GB";
    } else {
      return totalMB.toFixed(2) + " MB";
    }
  }

  function generateEnhancedBashScript(links, platform, baseUrl) {
    const date = new Date().toISOString().split("T")[0];
    const totalSize = calculateTotalSize(links);
    const scriptName = platform.toLowerCase();

    let script = `#!/bin/bash

# ===============================================
# ${platform} Game Download Script - Enhanced
# ===============================================
# Generated: ${date}
# Source: ${baseUrl}
# Total files: ${links.length}
# Total size: ~${totalSize}
# Platform: ${platform}
# ===============================================

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
CYAN='\\033[0;36m'
NC='\\033[0m'

# Configuration
SCRIPT_NAME="dolphin_${scriptName}_games.sh"
PROGRESS_FILE="${scriptName}_download_progress.json"
LOG_FILE="${scriptName}_download.log"
DOWNLOAD_DIR="${platform} Games"
MAX_RETRIES=5
RETRY_DELAY=30  # seconds
CONCURRENT_DOWNLOADS=2  # Be nice to the server

echo -e "\${CYAN}"
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           ${platform} GAME DOWNLOAD SCRIPT - ENHANCED           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo -e "\${NC}"

# ===============================================
# 1. DEPENDENCY CHECK AND INSTALLATION
# ===============================================
echo -e "\${CYAN}🔧 Checking and installing dependencies...\${NC}"

check_and_install_deps() {
    # Check for Python 3
    if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
        echo -e "\${YELLOW}⚠ Python 3 not found. Installing...\${NC}"

        # Detect OS
        if [[ "\$(uname)" == "Darwin" ]]; then
            # macOS
            if command -v brew &> /dev/null; then
                brew install python3
            else
                echo -e "\${RED}❌ Homebrew not found. Please install Python 3 manually:\${NC}"
                echo "   Download from: https://www.python.org/downloads/macos/"
                exit 1
            fi
        elif [[ -f /etc/debian_version ]]; then
            # Debian/Ubuntu
            sudo apt-get update
            sudo apt-get install -y python3 python3-pip
        elif [[ -f /etc/redhat-release ]]; then
            # RHEL/CentOS/Fedora
            sudo yum install -y python3 python3-pip
        else
            echo -e "\${RED}❌ Unsupported OS. Please install Python 3 manually.\${NC}"
            exit 1
        fi

        echo -e "\${GREEN}✅ Python 3 installed successfully\${NC}"
    else
        echo -e "\${GREEN}✅ Python 3 found\${NC}"
    fi

    # Check for curl (should be on macOS/Linux)
    if ! command -v curl &> /dev/null; then
        echo -e "\${YELLOW}⚠ curl not found. Installing...\${NC}"
        if [[ "\$(uname)" == "Darwin" ]]; then
            brew install curl
        else
            sudo apt-get install -y curl
        fi
        echo -e "\${GREEN}✅ curl installed\${NC}"
    else
        echo -e "\${GREEN}✅ curl found\${NC}"
    fi

    # Check for parallel if we want concurrent downloads
    if ! command -v parallel &> /dev/null; then
        echo -e "\${YELLOW}⚠ GNU parallel not found (optional for faster downloads)\${NC}"
        echo -e "\${CYAN}   To install: brew install parallel (macOS) or apt-get install parallel (Linux)\${NC}"
    fi
}

# Run dependency check
check_and_install_deps

echo ""

# ===============================================
# 2. DOWNLOAD FUNCTION WITH HEADERS AND RESUME
# ===============================================
# Create Python script in current directory
cat > download_with_headers.py << 'PYTHON_EOF'
#!/usr/bin/env python3
"""
Enhanced downloader with proper headers and resume capability
"""
import json
import os
import sys
import subprocess
import time
import re
from urllib.parse import urlparse

def download_file(url, filename, progress_file, log_file, max_retries=5):
    """
    Download a file with proper headers and resume capability
    """
    headers = [
        '-H', 'Referer: https://myrient.erista.me/',
        '-H', 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        '-H', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        '-H', 'Accept-Language: en-US,en;q=0.9',
        '-H', 'Accept-Encoding: gzip, deflate, br',
        '-H', 'Connection: keep-alive',
        '-H', 'Upgrade-Insecure-Requests: 1',
        '-H', 'Sec-Fetch-Dest: document',
        '-H', 'Sec-Fetch-Mode: navigate',
        '-H', 'Sec-Fetch-Site: same-origin',
        '-H', 'Sec-Fetch-User: ?1'
    ]

    # Prepare curl command with resume capability
    cmd = ['curl', '-L', '-C', '-', '--retry', str(max_retries), '--retry-delay', '10']
    cmd.extend(headers)
    cmd.extend([url, '-o', filename, '--progress-bar'])

    # Execute download
    try:
        with open(log_file, 'a') as log:
            log.write(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] Starting: {filename}\\n')
            print(f'📥 Downloading: {filename}')

            result = subprocess.run(cmd, stderr=subprocess.STDOUT, stdout=subprocess.PIPE, text=True)

            if result.returncode == 0:
                log.write(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] ✓ Completed: {filename}\\n')
                return True, 'Download completed'
            else:
                log.write(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] ✗ Failed: {filename} (code: {result.returncode})\\n')
                return False, f'Curl error: {result.returncode}'

    except Exception as e:
        with open(log_file, 'a') as log:
            log.write(f'[{time.strftime("%Y-%m-%d %H:%M:%S")}] ✗ Error: {filename} - {str(e)}\\n')
        return False, str(e)

def update_progress(progress_file, filename, status):
    """
    Update progress JSON file
    """
    try:
        if os.path.exists(progress_file):
            with open(progress_file, 'r') as f:
                data = json.load(f)
        else:
            data = {"completed": [], "failed": [], "pending": [], "total": 0}

        # Remove from pending if exists
        if filename in data.get("pending", []):
            data["pending"].remove(filename)

        # Add to appropriate list
        if status == "completed":
            if filename not in data["completed"]:
                data["completed"].append(filename)
        elif status == "failed":
            if filename not in data["failed"]:
                data["failed"].append(filename)

        # Update total if needed
        total_files = len(data.get("completed", [])) + len(data.get("failed", [])) + len(data.get("pending", []))
        if data["total"] < total_files:
            data["total"] = total_files

        with open(progress_file, 'w') as f:
            json.dump(data, f, indent=2)

        return True
    except Exception as e:
        print(f"Error updating progress: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 6:
        print("Usage: python3 download_with_headers.py <url> <filename> <progress_file> <log_file> <max_retries>")
        sys.exit(1)

    url, filename, progress_file, log_file, max_retries = sys.argv[1:]

    # Update as pending
    update_progress(progress_file, filename, "pending")

    # Download file
    success, message = download_file(url, filename, progress_file, log_file, int(max_retries))

    # Update progress based on result
    if success:
        update_progress(progress_file, filename, "completed")
        print(f"✅ {filename}")
    else:
        update_progress(progress_file, filename, "failed")
        print(f"❌ {filename}: {message}")

    sys.exit(0 if success else 1)
PYTHON_EOF

echo -e "\${GREEN}✅ Python downloader script created\${NC}"
chmod +x download_with_headers.py

# ===============================================
# 3. MAIN DOWNLOAD SCRIPT
# ===============================================

# Create download directory
mkdir -p "\$DOWNLOAD_DIR"
cd "\$DOWNLOAD_DIR"

# Initialize progress tracking
if [ ! -f "\$PROGRESS_FILE" ]; then
    echo -e "\${CYAN}📊 Creating progress tracker...\${NC}"
    python3 -c "
import json
initial_data = {
    'completed': [],
    'failed': [],
    'pending': [],
    'total': ${links.length},
    'started': '${date}',
    'platform': '${platform}'
}
with open('\$PROGRESS_FILE', 'w') as f:
    json.dump(initial_data, f, indent=2)
print('Progress tracker created: \$PROGRESS_FILE')
"
fi

echo -e "\${CYAN}📊 Current Progress:\${NC}"
python3 -c "
import json, os
progress_file = '\$PROGRESS_FILE'
if os.path.exists(progress_file):
    with open(progress_file, 'r') as f:
        data = json.load(f)
    completed = len(data.get('completed', []))
    failed = len(data.get('failed', []))
    total = data.get('total', ${links.length})
    print(f'Completed: {completed}/{total}')
    print(f'Failed: {failed}/{total}')
    print(f'Remaining: {total - completed - failed}/{total}')
    if failed > 0:
        print(f'\\nFailed files:')
        for f in data.get('failed', [])[:5]:
            print(f'  - {f}')
        if len(data['failed']) > 5:
            print(f'  ... and {len(data[\"failed\"]) - 5} more')
else:
    print('No progress file found. Starting fresh.')
"

echo ""
echo -e "\${CYAN}🚀 Starting download of ${links.length} ${platform} games...\${NC}"
echo -e "\${YELLOW}⚠ This will take significant time and bandwidth! (~${totalSize})\${NC}"
echo -e "\${CYAN}📁 Download directory: \$(pwd)\${NC}"
echo -e "\${CYAN}📝 Log file: \${LOG_FILE}\${NC}"
echo -e "\${CYAN}📊 Progress file: \${PROGRESS_FILE}\${NC}"
echo ""

# Ask for confirmation
read -p "Continue with download? (y/N): " confirm
confirm=\${confirm:-N}
if [[ "\$confirm" != "y" && "\$confirm" != "Y" ]]; then
    echo -e "\${YELLOW}⚠ Download cancelled. You can run later with:\${NC}"
    echo "  ./\$SCRIPT_NAME"
    exit 0
fi

# Start download timer
START_TIME=\$(date +%s)

# Download all files
FAILED_COUNT=0
COMPLETED_COUNT=0

echo -e "\${CYAN}📥 Beginning downloads...\${NC}"
echo "=================================================="

# Create download list file
DOWNLOAD_LIST="${scriptName}_download_list.txt"
> "\$DOWNLOAD_LIST"

# Generate download list (properly escaped)
`;

    // Add all files to download list - FIXED: properly escape the data
    links.forEach((item, index) => {
      // Escape special characters for bash
      const escapedUrl = item.url.replace(/'/g, "'\"'\"'");
      const escapedFilename = item.filename.replace(/'/g, "'\"'\"'");
      const escapedSize = item.size.replace(/'/g, "'\"'\"'");

      // Use printf for safer output
      script += `printf '%s\\n' '${escapedUrl} ${escapedFilename} ${escapedSize}' >> "\$DOWNLOAD_LIST"\n`;
    });

    script += `
echo -e "\${GREEN}✅ Created download list with ${links.length} files\${NC}"
echo ""

# Function to show progress bar
show_progress() {
    python3 -c "
import json, time, os
progress_file = '\$PROGRESS_FILE'
if os.path.exists(progress_file):
    with open(progress_file, 'r') as f:
        data = json.load(f)
    completed = len(data.get('completed', []))
    failed = len(data.get('failed', []))
    total = data.get('total', ${links.length})
    if total > 0:
        percent = (completed / total) * 100
        bar_length = 40
        filled = int(bar_length * completed // total)
        bar = '█' * filled + '░' * (bar_length - filled)
        print(f'Progress: |{bar}| {completed}/{total} ({percent:.1f}%)')
"
}

# Download using Python script
echo -e "\${CYAN}⚡ Downloading files...\${NC}"
echo "Press Ctrl+C to pause (progress will be saved)"
echo ""

# Read download list and process
LINE_NUM=0
TOTAL_LINES=\$(wc -l < "\$DOWNLOAD_LIST")

# Copy Python script to download directory (it's already in current dir, so no need for ../)
if [ -f "../download_with_headers.py" ]; then
    cp ../download_with_headers.py ./
elif [ -f "./download_with_headers.py" ]; then
    echo -e "\${GREEN}✅ Python script already in directory\${NC}"
else
    echo -e "\${RED}❌ Python script not found. Please run the script from its original location.\${NC}"
    exit 1
fi
chmod +x ./download_with_headers.py

# Function to extract URL and filename safely - FIXED VERSION
extract_fields() {
    local line="\$1"
    
    # Extract URL (first field)
    local url=\$(echo "\$line" | awk '{print \$1}')
    
    # Extract size (last field)
    local size=\$(echo "\$line" | awk '{print \$NF}')
    
    # Remove URL and size from the line to get filename
    local temp="\${line#\$url }"
    local filename="\${temp% \$size}"
    
    # If filename extraction failed (empty or same as temp), use awk as fallback
    if [ -z "\$filename" ] || [ "\$filename" = "\$temp" ]; then
        filename=\$(echo "\$line" | awk '{
            for (i=2; i<NF; i++) {
                printf "%s", \$i
                if (i < NF-1) printf " "
            }
        }')
    fi
    
    echo "\$url"
    echo "\$filename"
}

while IFS= read -r line || [ -n "\$line" ]; do
    LINE_NUM=\$((LINE_NUM + 1))
    
    # Extract URL and filename using our function
    fields=\$(extract_fields "\$line")
    url=\$(echo "\$fields" | head -1)
    filename=\$(echo "\$fields" | tail -1)
    
    if [ -z "\$url" ] || [ -z "\$filename" ]; then
        echo -e "\${RED}⚠ Failed to parse line \${LINE_NUM}: \${line}\${NC}"
        FAILED_COUNT=\$((FAILED_COUNT + 1))
        continue
    fi
    
    # Check if already completed - FIXED: use bash variable instead of JavaScript template
    if python3 -c "
import json, sys, os
progress_file = '\$PROGRESS_FILE'
filename_to_check = '\$filename'
if os.path.exists(progress_file):
    with open(progress_file, 'r') as f:
        data = json.load(f)
    if filename_to_check in data.get('completed', []):
        sys.exit(0)
    else:
        sys.exit(1)
else:
    sys.exit(1)
"; then
        echo -e "\${GREEN}✓ Already downloaded: \${filename} (\${LINE_NUM}/\${TOTAL_LINES})\${NC}"
        COMPLETED_COUNT=\$((COMPLETED_COUNT + 1))
        continue
    fi

    # Download with Python script
    echo -e "\${CYAN}[\${LINE_NUM}/\${TOTAL_LINES}] Downloading: \${filename}\${NC}"

    if python3 ./download_with_headers.py "\$url" "\$filename" "\$PROGRESS_FILE" "\$LOG_FILE" "\$MAX_RETRIES"; then
        COMPLETED_COUNT=\$((COMPLETED_COUNT + 1))
    else
        FAILED_COUNT=\$((FAILED_COUNT + 1))
        echo -e "\${RED}⚠ Download failed: \${filename}\${NC}"
    fi

    # Show progress more frequently for large downloads
    if [ \$((LINE_NUM % 5)) -eq 0 ] || [ \$LINE_NUM -eq \$TOTAL_LINES ]; then
        show_progress
    fi

    # Be nice to the server
    sleep 1

done < "\$DOWNLOAD_LIST"

# Final progress
show_progress
echo ""

# Calculate time taken
END_TIME=\$(date +%s)
DURATION=\$((END_TIME - START_TIME))
HOURS=\$((DURATION / 3600))
MINUTES=\$(( (DURATION % 3600) / 60 ))
SECONDS=\$((DURATION % 60))

# Final report
echo ""
echo -e "\${GREEN}═══════════════════════════════════════════════════════════════\${NC}"
echo -e "\${GREEN}🎉 DOWNLOAD COMPLETE! 🎉\${NC}"
echo -e "\${GREEN}═══════════════════════════════════════════════════════════════\${NC}"
echo ""
echo -e "\${CYAN}📊 FINAL STATISTICS:\${NC}"
echo "  Total files: ${links.length}"
echo "  Completed:   \${COMPLETED_COUNT}"
echo "  Failed:      \${FAILED_COUNT}"
echo "  Time taken:  \${HOURS}h \${MINUTES}m \${SECONDS}s"
echo ""
echo -e "\${CYAN}📁 Files saved to:\${NC}"
echo "  \$(pwd)/"
echo ""
echo -e "\${CYAN}📋 Useful files:\${NC}"
echo "  Progress:    \$(pwd)/\${PROGRESS_FILE}"
echo "  Logs:        \$(pwd)/\${LOG_FILE}"
echo "  List:        \$(pwd)/\${DOWNLOAD_LIST}"
echo ""

if [ \$FAILED_COUNT -gt 0 ]; then
    echo -e "\${YELLOW}⚠ Some downloads failed. To retry failed downloads:\${NC}"
    echo "  Run this script again - it will skip already completed files"
    echo ""
    echo -e "\${CYAN}Failed files list:\${NC}"
    python3 -c "
import json, os
progress_file = '\$PROGRESS_FILE'
if os.path.exists(progress_file):
    with open(progress_file, 'r') as f:
        data = json.load(f)
    for f in data.get('failed', []):
        print(f'  - {f}')
"
fi

echo ""
echo -e "\${GREEN}✅ Script finished successfully!\${NC}"
echo -e "\${YELLOW}💾 Remember to keep the progress file if you need to resume later.\${NC}"

exit 0
`;
    // Add styling for better visibility
    const style = document.createElement("style");
    style.textContent = `
        .file-item { margin: 5px 0; padding: 5px; border-left: 3px solid #007bff; }
        .file-size { color: #666; font-size: 0.9em; }
    `;
    document.head.appendChild(style);
    return script;
  }
})();
