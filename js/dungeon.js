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
        
        switch(fromDirection) {
            case 'north': pos.z -= offset; break;
            case 'south': pos.z += offset; break;
            case 'east': pos.x += offset; break;
            case 'west': pos.x -= offset; break;
            case 'up': pos.y += offset; break;
            case 'down': pos.y -= offset; break;
            default: pos.x += offset;
        }
        
        return pos;
    }
    
    getRoomTheme(cardEffect) {
        const themes = {
            'create_new_path': { color: 0x90EE90, type: 'garden' },
            'reveal_hidden_doors': { color: 0x9370DB, type: 'mystical' },
            'show_secret_passages': { color: 0x4B0082, type: 'hidden' },
            'grow_lush_garden_room': { color: 0x228B22, type: 'garden' },
            'create_throne_room': { color: 0x8B4513, type: 'royal' },
            'create_temple': { color: 0xDAA520, type: 'sacred' },
            'create_mirror_room': { color: 0xE6E6FA, type: 'reflective' },
            'create_racing_corridor': { color: 0xFF4500, type: 'speed' },
            'create_arena': { color: 0xDC143C, type: 'battle' },
            'create_labyrinth': { color: 0x696969, type: 'maze' },
            'rotate_dungeon_layout': { color: 0x8A2BE2, type: 'rotating' },
            'create_courtroom': { color: 0xB8860B, type: 'judgement' },
            'create_upside_down_room': { color: 0x800080, type: 'inverted' },
            'create_crypt': { color: 0x2F4F4F, type: 'death' },
            'create_sanctuary': { color: 0xF0E68C, type: 'peaceful' },
            'create_trap_room': { color: 0x8B0000, type: 'dangerous' },
            'destroy_random_walls': { color: 0xFF6347, type: 'chaos' },
            'create_observatory': { color: 0x191970, type: 'stargazing' },
            'create_dream_maze': { color: 0x6A5ACD, type: 'dreamy' },
            'create_sunlit_atrium': { color: 0xFFD700, type: 'bright' },
            'create_final_chamber': { color: 0xFFFFFF, type: 'final' },
            'create_treasure_vault': { color: 0xFFD700, type: 'treasure' },
            'create_spring_room': { color: 0x00CED1, type: 'water' },
            'create_meeting_room': { color: 0xDEB887, type: 'social' },
            'create_banquet_hall': { color: 0xCD853F, type: 'feast' },
            'create_meditation_chamber': { color: 0x708090, type: 'contemplative' },
            'create_memorial': { color: 0x556B2F, type: 'memory' },
            'create_playroom': { color: 0xFFB6C1, type: 'playful' },
            'create_illusion_maze': { color: 0xDA70D6, type: 'illusory' },
            'create_abandoned_corridor': { color: 0x696969, type: 'abandoned' },
            'create_wish_room': { color: 0xFF69B4, type: 'magical' },
            'create_cozy_chamber': { color: 0xDEB887, type: 'comfortable' },
            'create_fireplace_room': { color: 0xFF4500, type: 'warm' },
            'create_map_room': { color: 0x8B4513, type: 'exploration' },
            'create_balcony': { color: 0x87CEEB, type: 'elevated' },
            'create_festival_grounds': { color: 0xFF1493, type: 'celebration' },
            'create_battle_arena': { color: 0xB22222, type: 'combat' },
            'create_victory_hall': { color: 0xFFD700, type: 'triumph' },
            'create_fortress': { color: 0x696969, type: 'defensive' },
            'create_speed_corridor': { color: 0xFF6347, type: 'fast' },
            'create_guard_post': { color: 0x2F4F4F, type: 'watchful' },
            'create_storage_room': { color: 0x8B4513, type: 'storage' },
            'create_crystal_chamber': { color: 0xE0E0E0, type: 'crystalline' },
            'create_crossroads': { color: 0xD3D3D3, type: 'choice' },
            'create_sorrow_chamber': { color: 0x4682B4, type: 'melancholy' },
            'create_rest_chamber': { color: 0xF5F5DC, type: 'restful' },
            'create_betrayal_room': { color: 0x8B0000, type: 'treacherous' },
            'create_river_crossing': { color: 0x4169E1, type: 'water' },
            'create_secret_vault': { color: 0x2F4F4F, type: 'hidden' },
            'create_prison': { color: 0x696969, type: 'confining' },
            'create_nightmare_chamber': { color: 0x2F2F2F, type: 'dark' },
            'create_execution_ground': { color: 0x8B0000, type: 'grim' },
            'create_treasury': { color: 0xFFD700, type: 'wealth' },
            'create_balancing_bridge': { color: 0xDAA520, type: 'precarious' },
            'create_workshop': { color: 0x8B4513, type: 'craft' },
            'create_vault': { color: 0xB8860B, type: 'secure' },
            'create_ice_chamber': { color: 0xB0E0E6, type: 'frozen' },
            'create_gift_room': { color: 0xDDA0DD, type: 'generous' },
            'create_garden': { color: 0x228B22, type: 'natural' },
            'create_craft_room': { color: 0xDEB887, type: 'creative' },
            'create_luxury_chamber': { color: 0xFFD700, type: 'opulent' },
            'create_family_chamber': { color: 0xDEB887, type: 'domestic' }
        };
        
        return themes[cardEffect] || { color: 0x8B4513, type: 'default' };
    }
    
    applyCardEffect(room, cardEffect) {
        // Add specific objects and features based on the card effect
        const effectObjects = {
            'create_throne_room': [
                { type: 'throne', position: { x: 0, y: 0, z: -3 } },
                { type: 'pillar', position: { x: -2, y: 0, z: -2 } },
                { type: 'pillar', position: { x: 2, y: 0, z: -2 } }
            ],
            'create_garden': [
                { type: 'tree', position: { x: -1, y: 0, z: -1 } },
                { type: 'tree', position: { x: 1, y: 0, z: 1 } },
                { type: 'fountain', position: { x: 0, y: 0, z: 0 } }
            ],
            'create_treasure_vault': [
                { type: 'chest', position: { x: -1, y: 0, z: 0 } },
                { type: 'chest', position: { x: 1, y: 0, z: 0 } },
                { type: 'gold_pile', position: { x: 0, y: 0, z: -1 } }
            ]
        };
        
        room.objects = effectObjects[cardEffect] || [];
    }
    
    createDoors(room, fromDirection) {
        const directions = ['north', 'south', 'east', 'west', 'up', 'down'];
        const numDoors = Math.floor(Math.random() * 3) + 1; // 1-3 doors
        
        const availableDirections = directions.filter(d => d !== this.getOppositeDirection(fromDirection));
        
        for (let i = 0; i < numDoors && availableDirections.length > 0; i++) {
            const directionIndex = Math.floor(Math.random() * availableDirections.length);
            const direction = availableDirections.splice(directionIndex, 1)[0];
            
            const door = {
                id: `door_${room.id}_${direction}`,
                roomId: room.id,
                direction: direction,
                tarotCard: null,
                isOpen: true,
                leadsTo: null
            };
            
            room.doors.push(door);
