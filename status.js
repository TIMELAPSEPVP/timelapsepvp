document.addEventListener("DOMContentLoaded", () => {
    // Vul alvast 90 balkjes voor Discord met 100% operational
    generateUptimeBars("discord-bars", 0); 
    
    // Check de Minecraft server status live
    checkMinecraftServer();
});

function generateUptimeBars(containerId, errorIndex = -1) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = ""; // Container leegmaken

    const totalBars = 45; // Aantal visuele balkjes voor 90 dagen

    for (let i = 0; i < totalBars; i++) {
        const bar = document.createElement("div");
        
        // Als dit de specifieke dag is met een fout (bijv. vandaag bij downtime)
        if (i === errorIndex) {
            bar.className = "bar outage";
            bar.title = "Downtime detected";
        } else {
            bar.className = "bar operational";
            bar.title = "100% operational";
        }
        
        container.appendChild(bar);
    }
}

async function checkMinecraftServer() {
    const ip = "timelapsepvp.verixen.com";
    const port = 19132;

    const banner = document.getElementById("overall-banner");
    const bannerIcon = document.getElementById("banner-icon");
    const bannerText = document.getElementById("overall-text");

    const mcIcon = document.getElementById("mc-icon");
    const mcUptime = document.getElementById("mc-uptime");

    try {
        const response = await fetch(`https://api.mcsrvstat.us/bedrock/2/${ip}:${port}`);
        const data = await response.json();

        if (data.online) {
            // Server is ONLINE
            banner.className = "system-banner operational";
            bannerIcon.className = "fa-solid fa-circle-check banner-icon";
            bannerText.textContent = "All systems operational";

            mcIcon.className = "fa-solid fa-circle-check status-icon-green";
            mcUptime.textContent = "100.0% uptime";
            mcUptime.className = "uptime-text";

            // Genereer volledig groene balkjes
            generateUptimeBars("mc-bars", -1);
        } else {
            // Server is OFFLINE / DOWN
            banner.className = "system-banner degraded";
            bannerIcon.className = "fa-solid fa-triangle-exclamation banner-icon";
            bannerText.textContent = "Partial System Outage";

            mcIcon.className = "fa-solid fa-circle-xmark status-icon-red";
            mcUptime.textContent = "Offline";
            mcUptime.className = "uptime-text text-red";

            // Laat de meest recente balk (vandaag) als rood/downtime zien
            generateUptimeBars("mc-bars", 44); 
        }
    } catch (error) {
        console.error("Fout bij ophalen server status:", error);
        
        // Bij netwerk/API-fout
        banner.className = "system-banner degraded";
        bannerIcon.className = "fa-solid fa-circle-exclamation banner-icon";
        bannerText.textContent = "Status Check Failed";
        
        mcIcon.className = "fa-solid fa-circle-exclamation status-icon-orange";
        mcUptime.textContent = "Unknown";
        mcUptime.className = "uptime-text text-orange";
        
        generateUptimeBars("mc-bars", 44);
    }
}