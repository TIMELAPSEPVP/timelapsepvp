async function checkServerStatus() {
    // We voegen de poort :19132 direct toe aan het IP-adres
    const serverAddress = "timelapsepvp.verixen.com:19132";
    const statusElement = document.getElementById("server-status");
    const playersElement = document.getElementById("player-count");

    try {
        let response = await fetch(`https://api.mcsrvstat.us/2/${serverAddress}`);
        let data = await response.json();

        if (data.online) {
            statusElement.textContent = "ONLINE";
            statusElement.className = "online";
            playersElement.textContent = `Players online: ${data.players.online} / ${data.players.max}`;
        } else {
            statusElement.textContent = "OFFLINE";
            statusElement.className = "offline";
            playersElement.textContent = "Players online: 0";
        }
    } catch (error) {
        console.error("Error fetching server status:", error);
        statusElement.textContent = "Unable to load status";
        statusElement.className = "offline";
    }
}

// Roep de functie direct aan en herlaad elke 60 seconden
checkServerStatus();
setInterval(checkServerStatus, 60000);
