// Dungeon generation system based on tarot cards
class DungeonGenerator {
    constructor() {
        this.rooms = new Map();
        this.doors = new Map();
        this.currentRoom = null;
        this.roomCounter = 0;
    }
    
    generateRoom(cardEffect, fromDirection = null) {
        const roomId = `room_${this.roomCounter++}`;
        const room = {
            id: roomId,
            cardEffect: cardEffect,
            position: this.calculateRoomPosition(fromDirection),
            doors: [],
            theme: this.getRoomTheme(cardEffect),
            objects: [],
            players: []
        };
        
        // Generate room based on card effect
        this.applyCardEffect(room, cardEffect);
        
        // Create doors
        this.createDoors(room, fromDirection);
        
        this.rooms.set(roomId, room);
        return room;
    }
    
    calculateRoomPosition(fromDirection) {
        // Simple grid-based positioning
        if (!this.currentRoom) return { x: 0, y: 0, z: 0 };
        
        const offset = 10;
        const pos = { ...this.currentRoom.position };
        
        switch (fromDirection) {
            case 'north': pos.z -= offset; break;
            case 'south': pos.z += offset; break;
            case 'east': pos.x += offset; break;
            case 'west': pos.x -= offset; break;
            case 'up': pos.y += offset; break;
            case 'down': pos.y -= offset; break;
        }
        
        return pos;
    }
    
    getRoomTheme(cardEffect) {
        const themes = {
            'create_new_path': 'mystical',
            'reveal_hidden_doors': 'arcane',
            'show_secret_passages': 'shadow',
            'grow_lush_garden_room': 'nature',
            'create_throne_room': 'royal',
            'create_temple': 'sacred',
            'create_mirror_room': 'reflective',
            'create_racing_corridor': 'dynamic',
            'create_arena': 'combat',
            'create_labyrinth': 'maze',
            'rotate_dungeon_layout': 'chaos',
            'create_courtroom': 'judgment',
            'create_upside_down_room': 'inverted',
            'create_crypt': 'death',
            'create_sanctuary': 'peace',
            'create_trap_room': 'danger',
            'destroy_random_walls': 'destruction',
            'create_observatory': 'cosmic',
            'create_dream_maze': 'dream',
            'create_sunlit_atrium': 'light',
            'create_final_chamber': 'destiny',
            'create_treasure_vault': 'wealth'
        };
        
        return themes[cardEffect] || 'mystical';
    }
    
    applyCardEffect(room, effect) {
        switch (effect) {
            case 'create_new_path':
                room.objects.push({
                    type: 'portal',
                    position: { x: 0, y: 0, z: 0 },
                    color: 0x9b59b6
                });
                break;
                
            case 'create_throne_room':
                room.objects.push({
                    type: 'throne',
                    position: { x: 0, y: 0, z: -4 },
                    color: 0xd4af37
                });
                room.objects.push({
                    type: 'pillars',
                    positions: [
                        { x: -3, y: 0, z: -3 },
                        { x: 3, y: 0, z: -3 },
                        { x: -3, y: 0, z: 3 },
                        { x: 3, y: 0, z: 3 }
                    ],
                    color: 0x8b4513
                });
                break;
                
            case 'create_garden':
                room.objects.push({
                    type: 'tree',
                    positions: [
                        { x: -2, y: 0, z: -2 },
                        { x: 2, y: 0, z: -2 },
                        { x: -2, y: 0, z: 2 },
                        { x: 2, y: 0, z: 2 }
                    ],
                    color: 0x228b22
                });
                room.objects.push({
                    type: 'fountain',
                    position: { x: 0, y: 0, z: 0 },
                    color: 0x4682b4
                });
                break;
                
            case 'create_labyrinth':
                room.objects.push({
                    type: 'walls',
                    pattern: 'maze',
                    color: 0x696969
                });
                break;
                
            case 'create_mirror_room':
                room.objects.push({
                    type: 'mirrors',
                    positions: [
                        { x: -4, y: 0, z: 0 },
                        { x: 4, y: 0, z: 0 },
                        { x: 0, y: 0, z: -4 },
                        { x: 0, y: 0, z: 4 }
                    ],
                    color: 0xc0c0c0
                });
                break;
                
            case 'create_crypt':
                room.objects.push({
                    type: 'coffin',
                    position: { x: 0, y: 0, z: 0 },
                    color: 0x2f4f4f
                });
                room.objects.push({
                    type: 'candles',
                    positions: [
                        { x: -2, y: 1, z: -2 },
                        { x: 2, y: 1, z: -2 },
                        { x: -2, y: 1, z: 2 },
                        { x: 2, y: 1, z: 2 }
                    ],
                    color: 0xffa500
                });
                break;
                
            case 'create_treasure_vault':
                room.objects.push({
                    type: 'treasure',
                    position: { x: 0, y: 0, z: 0 },
                    color: 0xffd700
                });
                room.objects.push({
                    type: 'coins',
                    positions: this.generateRandomPositions(20),
                    color: 0xffd700
                });
                break;
                
            default:
                // Default mystical room
                room.objects.push({
                    type: 'crystal',
                    position: { x: 0, y: 1, z: 0 },
                    color: 0x9370db
                });
        }
    }
    
    createDoors(room, fromDirection) {
        const directions = ['north', 'south', 'east', 'west', 'up', 'down'];
        const opposite = {
            north: 'south',
            south: 'north',
            east: 'west',
            west: 'east',
            up: 'down',
            down: 'up'
        };
        
        // Always create a door back to the previous room
        if (fromDirection) {
            room.doors.push({
                id: `door_${room.id}_${opposite[fromDirection]}`,
                direction: opposite[fromDirection],
                position: this.getDoorPosition(opposite[fromDirection]),
                card: null,
                leadsTo: null
            });
        }
        
        // Create 1-3 additional doors
        const numDoors = Math.floor(Math.random() * 3) + 1;
        const availableDirections = directions.filter(d => d !== fromDirection && d !== opposite[fromDirection]);
        
        for (let i = 0; i < numDoors && availableDirections.length > 0; i++) {
            const direction = availableDirections.splice(Math.floor(Math.random() * availableDirections.length), 1)[0];
            room.doors.push({
                id: `door_${room.id}_${direction}`,
                direction: direction,
                position: this.getDoorPosition(direction),
                card: tarotDeck.getRandomCard(),
                leadsTo: null
            });
        }
    }
    
    getDoorPosition(direction) {
        const offset = 4.5;
        switch (direction) {
            case 'north': return { x: 0, y: 0, z: -offset };
            case 'south': return { x: 0, y: 0, z: offset };
            case 'east': return { x: offset, y: 0, z: 0 };
            case 'west': return { x: -offset, y: 0, z: 0 };
            case 'up': return { x: 0, y: offset, z: 0 };
            case 'down': return { x: 0, y: -offset, z: 0 };
            default: return { x: 0, y: 0, z: 0 };
        }
    }
    
    generateRandomPositions(count) {
        const positions = [];
        for (let i = 0; i < count; i++) {
            positions.push({
                x: (Math.random() - 0.5) * 6,
                y: 0,
                z: (Math.random() - 0.5) * 6
            });
        }
        return positions;
    }
    
    getRoom(roomId) {
        return this.rooms.get(roomId);
    }
    
    getCurrentRoom() {
        return this.currentRoom;
    }
    
    moveToRoom(roomId) {
        const room = this.rooms.get(roomId);
        if (room) {
            this.currentRoom = room;
            return room;
        }
        return null;
    }
    
    openDoor(doorId) {
        const [roomId, direction] = doorId.split('_').slice(1);
        const room = this.rooms.get(roomId);
        
        if (room) {
            const door = room.doors.find(d => d.id === doorId);
            if (door && door.card) {
                // Generate new room based on the card
                const newRoom = this.generateRoom(door.card.effect, direction);
                door.leadsTo = newRoom.id;
                
                // Create return door
                const returnDoor = newRoom.doors.find(d => d.direction === this.getOppositeDirection(direction));
                if (returnDoor) {
                    returnDoor.leadsTo = roomId;
                }
                
                return newRoom;
            }
        }
        return null;
    }
    
    getOppositeDirection(direction) {
        const opposites = {
            north: 'south',
            south: 'north',
            east: 'west',
            west: 'east',
            up: 'down',
            down: 'up'
        };
        return opposites[direction];
    }
}

// Global dungeon generator
const dungeon = new DungeonGenerator();