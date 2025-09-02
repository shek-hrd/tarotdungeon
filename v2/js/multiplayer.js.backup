// Multiplayer system using Socket.IO
class MultiplayerManager {
    constructor() {
        this.socket = null;
        this.playerId = null;
        this.playerName = null;
        this.players = new Map();
        this.isHost = false;
        this.connected = false;
    }
    
    connect(playerName) {
        this.playerName = playerName;
        
        // For demo purposes, we'll simulate multiplayer locally
        // In production, replace with actual Socket.IO connection
        this.simulateConnection();
    }
    
    simulateConnection() {
        this.connected = true;
        this.playerId = `player_${Date.now()}`;
        
        // Add self as first player
        this.players.set(this.playerId, {
            id: this.playerId,
            name: this.playerName,
            position: { x: 0, y: 0, z: 0 },
            room: 'room_0'
        });
        
        // Simulate other players joining
        setTimeout(() => {
            this.addSimulatedPlayer('GrannyBot');
        }, 2000);
        
        this.updatePlayerList();
        narrator.welcomePlayer(this.playerName);
    }
    
    addSimulatedPlayer(name) {
        const playerId = `sim_${Date.now()}`;
        this.players.set(playerId, {
            id: playerId,
            name: name,
            position: { x: 2, y: 0, z: 0 },
            room: 'room_0'
        });
        
        narrator.playerJoined(name);
        this.updatePlayerList();
    }
    
    updatePlayerList() {
        const playerList = document.getElementById('players');
        if (playerList) {
            playerList.innerHTML = '';
            this.players.forEach(player => {
                const div = document.createElement('div');
                div.className = 'player-item';
                div.textContent = player.name;
                if (player.id === this.playerId) {
                    div.style.fontWeight = 'bold';
                }
                playerList.appendChild(div);
            });
        }
        
        document.getElementById('playerList').style.display = 'block';
    }
    
    movePlayer(playerId, position, roomId) {
        const player = this.players.get(playerId);
        if (player) {
            player.position = position;
            player.room = roomId;
            
            // In real multiplayer, this would broadcast to all players
            if (playerId === this.playerId) {
                this.broadcastPosition(position, roomId);
            }
        }
    }
    
    broadcastPosition(position, roomId) {
        // Simulate other players seeing the movement
        this.players.forEach((player, id) => {
            if (id !== this.playerId && player.room === roomId) {
                // Simulate other players being in the same room
                console.log(`${player.name} sees you in room ${roomId}`);
            }
        });
    }
    
    sendMessage(message) {
        // In real multiplayer, this would broadcast to all players
        console.log(`[${this.playerName}]: ${message}`);
    }
    
    disconnect() {
        this.connected = false;
        narrator.playerLeft(this.playerName);
    }
    
    getPlayerCount() {
        return this.players.size;
    }
    
    getPlayersInRoom(roomId) {
        const players = [];
        this.players.forEach(player => {
            if (player.room === roomId) {
                players.push(player);
            }
        });
        return players;
    }
}

// Global multiplayer manager
const multiplayer = new MultiplayerManager();