
# Self-Hosted Coolify Setup Guide

You have chosen the robust, private route! Here is how to get your own "Heroku-like" platform up and running in minutes.

## 1. Get a VPS (Virtual Private Server)
You need a server. **Hetzner** is highly recommended for price/performance, but DigitalOcean or AWS Lightsail work fine too.

**Recommended Specs:**
*   **OS:** Ubuntu 22.04 LTS or 24.04 LTS (amd64)
*   **CPU:** 2 vCPUs (minimum)
*   **RAM:** 4 GB (minimum for smooth Docker usage)
*   **Storage:** 40 GB+ (NVMe preferred)

*Example: Hetzner CPX21 (~€8/mo) or CPX11 (~€4/mo - might require swap).*

## 2. Connect to your Server
Open your terminal (PowerShell or Command Prompt on Windows) and SSH into your new server using the IP address given by your provider.

```powershell
ssh root@<YOUR_SERVER_IP>
# Enter your password when prompted (it won't show on screen)
```

## 3. Install Coolify
Once logged in, run this single command. It handles everything (Docker, config, proxy).

```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

*This will take 3-5 minutes.*

## 4. Access Your Dashboard
When the script finishes, it will print your URL and credentials.
1.  Open your browser to: `http://<YOUR_SERVER_IP>:8000`
2.  Register your admin account.

## 5. Connect Your Domain (Optional but Recommended)
To have `app.yourdomain.com` instead of an IP:
1.  In Coolify, go to **Settings**.
2.  Set your "Instance Domain" (e.g., `https://coolify.yourdomain.com`).
3.  Add an `A Record` in your DNS provider (Namecheap/GoDaddy) pointing `coolify` to your server IP.

## 6. Deploy Kemet AI
1.  On the Coolify dashboard, click **"+ New Resource"**.
2.  Select **"Git Repository"** -> **"Public Repository"**.
3.  URL: `https://github.com/A-Njock/KEMET-AI`
4.  Build Pack: **Docker Compose**.
5.  Click **Deploy**.

Your API will be running on port 8000 and Frontend on port 80!
