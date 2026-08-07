// Ensure this points to the external IP/domain your API is hosted on.
// If testing locally on the same network, 127.0.0.1 or localhost works.
const API_URL = "http://127.0.0.1:8080/api/me"; 

async function loadProfile() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (!data.error) {
            // Set Avatar
            const avatarImg = document.getElementById('nav-avatar');
            avatarImg.src = data.avatar;

            // Set Username
            document.getElementById('nav-username').innerText = data.username;

            // Set Status Glow
            const dot = document.getElementById('status-indicator');
            const statusColors = {
                online: '#82ff9d',
                idle: '#faa61a',
                dnd: '#ff2e4d',
                offline: '#747f8d'
            };
            
            const color = statusColors[data.status] || statusColors.offline;
            dot.style.backgroundColor = color;
            dot.style.boxShadow = `0 0 12px ${color}`;
        }
    } catch (error) {
        console.error("API link failed ✧", error);
        document.getElementById('nav-username').innerText = "System Offline ✧";
    }
}

// Fire on load
loadProfile();

// Refreshes the profile dynamically every 30 seconds
setInterval(loadProfile, 30000);
