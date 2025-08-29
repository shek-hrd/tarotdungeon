// Main game controller
class TarotDungeonGame {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.currentRoom = null;
        this.player = null;
        this.isInitialized = false;
        
        this.init();
    }
    
    init() {
        this.setupThreeJS();
        this.setupControls();
        this.setupEventListeners();
        this.startGame();
    }
    
    setupThreeJS() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 8);
        this.camera.lookAt(0, 0, 0);
        
        // Renderer setup
        const canvas = document.getElementById('game-canvas');
        if (!canvas) {
            console.error('Canvas element not found!');
            return;
        }
        
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    
    setupControls() {
        // Simple mouse controls
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            this.camera.position.x = mouseX * 5;
            this.camera.position.y = 5 + mouseY * 3;
            this.camera.lookAt(0, 0, 0);
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'Space':
                    event.preventDefault();
                    this.interactWithNearestDoor();
                    break;
                case 'KeyH':
                    this.showHelp();
                    break;
                case 'KeyM':
                    this.toggleAudio();
                    break;
            }
        });
    }
    
    setupEventListeners() {
        // Click on doors
        this.renderer.domElement.addEventListener('click', (event) => {
            this.handleClick(event);
        });
        
        // Menu buttons
        const startGameBtn = document.getElementById('start-game');
        if (startGameBtn) {
            startGameBtn.addEventListener('click', () => {
                const menuOverlay = document.getElementById('menu-overlay');
                if (menuOverlay) menuOverlay.classList.add('hidden');
                this.startGame();
            });
        }
        
        const settingsBtn = document.getElementById('settings-btn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                const settingsOverlay = document.getElementById('settings-overlay');
                if (settingsOverlay) settingsOverlay.classList.remove('hidden');
            });
        }
        
        const closeSettingsBtn = document.getElementById('close-settings');
        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => {
                const settingsOverlay = document.getElementById('settings-overlay');
                if (settingsOverlay) settingsOverlay.classList.add('hidden');
            });
        }
        
        const closeTarotBtn = document.getElementById('close-tarot');
        if (closeTarotBtn) {
            closeTarotBtn.addEventListener('click', () => {
                const tarotOverlay = document.getElementById('tarot-overlay');
                if (tarotOverlay) tarotOverlay.classList.add('hidden');
            });
        }
        
        // Chat system
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    const message = event.target.value.trim();
                    if (message) {
                        if (typeof multiplayer !== 'undefined') {
                            multiplayer.sendMessage(message);
                        }
                        event.target.value = '';
                    }
                }
            });
        }
    }
    
    startGame() {
        // Hide loading screen
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
        
        // Show UI elements
        const uiElements = ['ui-overlay', 'top-hud', 'bottom-hud'];
        uiElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) element.style.display = 'block';
        });
        
        // Get player name
        const playerName = prompt("Welcome to the Dragon's Nest! What's your name, dearie?");
        if (!playerName) {
            this.playerName = "Adventurer";
        } else {
            this.playerName = playerName;
        }
        
        // Update player name in UI
        const playerNameElement = document.getElementById('player-name');
        if (playerNameElement) {
            playerNameElement.textContent = this.playerName;
        }
        
        // Connect to multiplayer
        if (typeof multiplayer !== 'undefined') {
            multiplayer.connect(this.playerName);
        }
        
        // Generate starting room
        const startingCard = tarotDeck.getRandomCard();
        this.currentRoom = dungeon.generateRoom(startingCard.effect);
        dungeon.currentRoom = this.currentRoom;
        
        // Build the room
        this.buildRoom(this.currentRoom);
        
        // Start render loop
        this.animate();
        
        // Welcome narration
        setTimeout(() => {
            if (typeof narrator !== 'undefined') {
                narrator.describeRoom(this.currentRoom);
            }
        }, 1000);
    }
    
    buildRoom(room) {
        // Clear existing room
        while (this.scene.children.length > 2) {
            this.scene.remove(this.scene.children[2]);
        }
        
        // Create floor
        const floorGeometry = new THREE.PlaneGeometry(10, 10);
        const floorMaterial = new THREE.MeshLambertMaterial({ 
            color: this.getRoomColor(room.theme) 
        });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);
        
        // Create walls
        this.createWalls();
        
        // Create ceiling
        const ceilingGeometry = new THREE.PlaneGeometry(10, 10);
        const ceilingMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2a2a2a 
        });
        const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.y = 5;
        this.scene.add(ceiling);
        
        // Add room objects
        this.addRoomObjects(room);
        
        // Add doors
        this.addDoors(room);
    }
    
    createWalls() {
        const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x4a4a4a });
        const wallHeight = 5;
        
        // North wall
        const northWall = new THREE.Mesh(
            new THREE.BoxGeometry(10, wallHeight, 0.5),
            wallMaterial
        );
        northWall.position.set(0, wallHeight/2, -5);
        northWall.castShadow = true;
        this.scene.add(northWall);
        
        // South wall
        const southWall = new THREE.Mesh(
            new THREE.BoxGeometry(10, wallHeight, 0.5),
            wallMaterial
        );
        southWall.position.set(0, wallHeight/2, 5);
        southWall.castShadow = true;
        this.scene.add(southWall);
        
        // East wall
        const eastWall = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, wallHeight, 10),
            wallMaterial
        );
        eastWall.position.set(5, wallHeight/2, 0);
        eastWall.castShadow = true;
        this.scene.add(eastWall);
        
        // West wall
        const westWall = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, wallHeight, 10),
            wallMaterial
        );
        westWall.position.set(-5, wallHeight/2, 0);
        westWall.castShadow = true;
        this.scene.add(westWall);
    }
    
    addRoomObjects(room) {
        room.objects.forEach(obj => {
            switch (obj.type) {
                case 'crystal':
                    this.createCrystal(obj.position, obj.color);
                    break;
                case 'throne':
                    this.createThrone(obj.position, obj.color);
                    break;
                case 'treasure':
                    this.createTreasure(obj.position, obj.color);
                    break;
                case 'tree':
                    if (obj.positions) {
                        obj.positions.forEach(pos => this.createTree(pos, obj.color));
                    }
                    break;
                case 'fountain':
                    this.createFountain(obj.position, obj.color);
                    break;
                case 'coffin':
                    this.createCoffin(obj.position, obj.color);
                    break;
            }
        });
    }
    
    createCrystal(position, color) {
        const geometry = new THREE.OctahedronGeometry(1);
        const material = new THREE.MeshLambertMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.3
        });
        const crystal = new THREE.Mesh(geometry, material);
        crystal.position.set(position.x, position.y, position.z);
        crystal.castShadow = true;
        this.scene.add(crystal);
        
        // Add rotation animation
        crystal.userData = { rotationSpeed: 0.01 };
    }
    
    createThrone(position, color) {
        const geometry = new THREE.BoxGeometry(2, 3, 1);
        const material = new THREE.MeshLambertMaterial({ color: color });
        const throne = new THREE.Mesh(geometry, material);
        throne.position.set(position.x, position.y + 1.5, position.z);
        throne.castShadow = true;
        this.scene.add(throne);
        
        // Add backrest
        const backrest = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 0.5),
            material
        );
        backrest.position.set(position.x, position.y + 2.5, position.z - 0.5);
        this.scene.add(backrest);
    }
    
    createTreasure(position, color) {
        const geometry = new THREE.BoxGeometry(2, 1, 1.5);
        const material = new THREE.MeshLambertMaterial({ 
            color: color,
            emissive: color,
            emissiveIntensity: 0.2
        });
        const treasure = new THREE.Mesh(geometry, material);
        treasure.position.set(position.x, position.y + 0.5, position.z);
        treasure.castShadow = true;
        this.scene.add(treasure);
        
        // Add coins
        for (let i = 0; i < 5; i++) {
            const coin = new THREE.Mesh(
                new THREE.CylinderGeometry(0.2, 0.2, 0.1, 8),
                material
            );
            coin.position.set(
                position.x + (Math.random() - 0.5) * 2,
                position.y + 1 + Math.random() * 0.5,
                position.z + (Math.random() - 0.5) * 1.5
            );
            this.scene.add(coin);
        }
    }
    
    createTree(position, color) {
        // Trunk
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2, 0.3, 2),
            new THREE.MeshLambertMaterial({ color: 0x8b4513 })
        );
        trunk.position.set(position.x, position.y + 1, position.z);
        trunk.castShadow = true;
        this.scene.add(trunk);
        
        // Leaves
        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(1.5),
            new THREE.MeshLambertMaterial({ color: color })
        );
        leaves.position.set(position.x, position.y + 2.5, position.z);
        leaves.castShadow = true;
        this.scene.add(leaves);
    }
    
    createFountain(position, color) {
        const base = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1.5, 0.5),
            new THREE.MeshLambertMaterial({ color: 0x696969 })
        );
        base.position.set(position.x, position.y + 0.25, position.z);
        this.scene.add(base);
        
        const water = new THREE.Mesh(
            new THREE.CylinderGeometry(0.8, 0.8, 0.1),
            new THREE.MeshLambertMaterial({ 
                color: color,
                transparent: true,
                opacity: 0.7
            })
        );
        water.position.set(position.x, position.y + 0.6, position.z);
        this.scene.add(water);
    }
    
    createCoffin(position, color) {
        const geometry = new THREE.BoxGeometry(2, 0.5, 1);
        const material = new THREE.MeshLambertMaterial({ color: color });
        const coffin = new THREE.Mesh(geometry, material);
        coffin.position.set(position.x, position.y + 0.25, position.z);
        coffin.castShadow = true;
        this.scene.add(coffin);
    }
    
    addDoors(room) {
        room.doors.forEach(door => {
            this.createDoor(door);
        });
    }
    
    createDoor(door) {
        const doorGeometry = new THREE.BoxGeometry(1.5, 2.5, 0.2);
        const doorMaterial = new THREE.MeshLambertMaterial({ 
            color: door.card ? 0x8b4513 : 0x2a2a2a
        });
        
        const doorMesh = new THREE.Mesh(doorGeometry, doorMaterial);
        doorMesh.position.set(door.position.x, 1.25, door.position.z);
        doorMesh.userData = { doorId: door.id, card: door.card };
        doorMesh.castShadow = true;
        
        // Add card symbol if it has a card
        if (door.card) {
            const cardSymbol = new THREE.Mesh(
                new THREE.PlaneGeometry(0.8, 1.2),
                new THREE.MeshLambertMaterial({ 
                    color: 0xf5f5dc,
                    map: this.createCardTexture(door.card)
                })
            );
            cardSymbol.position.set(0, 0, 0.11);
            doorMesh.add(cardSymbol);
        }
        
        this.scene.add(doorMesh);
    }
    
    createCardTexture(card) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 192;
        const ctx = canvas.getContext('2d');
        
        // Background
        ctx.fillStyle = '#f5f5dc';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Border
        ctx.strokeStyle = '#8b4513';
        ctx.lineWidth = 4;
        ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
        
        // Card symbol
        ctx.fillStyle = '#8b4513';
        ctx.font = '48px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(card.image, canvas.width/2, canvas.height/2);
        
        // Card name
        ctx.font = '12px serif';
        ctx.fillText(card.name, canvas.width/2, canvas.height - 20);
        
        const texture = new THREE.CanvasTexture(canvas);
        return texture;
    }
    
    getRoomColor(theme) {
        const colors = {
            mystical: 0x4b0082,
            royal: 0x8b4513,
            nature: 0x228b22,
            death: 0x2f4f4f,
            treasure: 0xffd700,
            maze: 0x696969,
            dream: 0x9370db,
            combat: 0x8b0000,
            light: 0xffffe0,
            shadow: 0x2f2f2f,
            arcane: 0x663399,
            sacred: 0xf5f5dc
        };
        
        return colors[theme] || 0x4a4a4a;
    }
    
    handleClick(event) {
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);
        
        const intersects = raycaster.intersectObjects(this.scene.children);
        
        for (let intersect of intersects) {
            if (intersect.object.userData.doorId) {
                this.openDoor(intersect.object.userData.doorId);
                break;
            }
        }
    }
    
    openDoor(doorId) {
        const newRoom = dungeon.openDoor(doorId);
        if (newRoom) {
            this.currentRoom = newRoom;
            this.buildRoom(newRoom);
            
            // Update UI
            const door = this.findDoorById(doorId);
            if (door && door.card) {
                // Update card display in bottom HUD
                const cardNameElement = document.getElementById('card-name');
                const cardMeaningElement = document.getElementById('card-meaning');
                if (cardNameElement) cardNameElement.textContent = door.card.name;
                if (cardMeaningElement) cardMeaningElement.textContent = door.card.meaning;
                
                // Update cards counter
                const cardsCountElement = document.getElementById('cards-count');
                if (cardsCountElement) {
                    const currentCount = parseInt(cardsCountElement.textContent) || 0;
                    cardsCountElement.textContent = currentCount + 1;
                }
                
                // Update room name
                const roomNameElement = document.getElementById('room-name');
                if (roomNameElement) {
                    roomNameElement.textContent = newRoom.name || `${door.card.name} Room`;
                }
                
                // Narrator updates
                if (typeof narrator !== 'undefined') {
                    narrator.doorOpened(door.card);
                    narrator.describeRoom(newRoom);
                }
            }
            
            // Update player position
            if (typeof multiplayer !== 'undefined') {
                multiplayer.movePlayer(multiplayer.playerId, newRoom.position, newRoom.id);
            }
        }
    }
    
    findDoorById(doorId) {
        for (let room of dungeon.rooms.values()) {
            const door = room.doors.find(d => d.id === doorId);
            if (door) return door;
        }
        return null;
    }
    
    interactWithNearestDoor() {
        // Find closest door
        const doors = [];
        this.currentRoom.doors.forEach(door => {
            const distance = Math.sqrt(
                door.position.x * door.position.x + 
                door.position.z * door.position.z
            );
            doors.push({ door, distance });
        });
        
        if (doors.length > 0) {
            doors.sort((a, b) => a.distance - b.distance);
            this.openDoor(doors[0].door.id);
        }
    }
    
    showHelp() {
        const helpText = `
Welcome to the Dragon's Nest!
        
🎮 Controls:
- Mouse: Look around
- Click: Interact with doors
- Space: Open nearest door
- H: Show this help
- M: Toggle audio
        
🃏 How to play:
1. Explore mystical rooms
2. Click on doors to open them
3. Each door reveals a tarot card
4. The dungeon changes based on the card's meaning
5. Learn tarot as you journey deeper
        
The narrator (Granny) will guide you with stories and wisdom!
        `;
        
        alert(helpText);
    }
    
    toggleAudio() {
        if (typeof narrator !== 'undefined' && narrator.voice) {
            const button = document.querySelector('#controls-hint span');
            if (button && button.textContent.includes('🔊')) {
                button.textContent = button.textContent.replace('🔊', '🔇');
                speechSynthesis.cancel();
            } else if (button) {
                button.textContent = button.textContent.replace('🔇', '🔊');
            }
        }
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate crystals and other animated objects
        this.scene.children.forEach(child => {
            if (child.userData.rotationSpeed) {
                child.rotation.y += child.userData.rotationSpeed;
            }
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize game when page loads
let game;
window.addEventListener('load', () => {
    game = new TarotDungeonGame();
});