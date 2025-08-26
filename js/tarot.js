// Tarot card definitions and meanings
const TAROT_CARDS = {
    // Major Arcana
    0: { name: "The Fool", meaning: "New beginnings, innocence, spontaneity", image: "🃏", effect: "create_new_path" },
    1: { name: "The Magician", meaning: "Manifestation, resourcefulness, power", image: "🎩", effect: "reveal_hidden_doors" },
    2: { name: "The High Priestess", meaning: "Intuition, mystery, subconscious", image: "👁️", effect: "show_secret_passages" },
    3: { name: "The Empress", meaning: "Abundance, nurturing, fertility", image: "👑", effect: "grow_lush_garden_room" },
    4: { name: "The Emperor", meaning: "Authority, structure, control", image: "⚔️", effect: "create_throne_room" },
    5: { name: "The Hierophant", meaning: "Tradition, conformity, spiritual wisdom", image: "📿", effect: "create_temple" },
    6: { name: "The Lovers", meaning: "Relationships, choices, harmony", image: "💕", effect: "create_mirror_room" },
    7: { name: "The Chariot", meaning: "Determination, willpower, victory", image: "🐎", effect: "create_racing_corridor" },
    8: { name: "Strength", meaning: "Courage, patience, inner strength", image: "🦁", effect: "create_arena" },
    9: { name: "The Hermit", meaning: "Soul-searching, introspection, guidance", image: "🏮", effect: "create_labyrinth" },
    10: { name: "Wheel of Fortune", meaning: "Cycles, destiny, turning point", image: "🎡", effect: "rotate_dungeon_layout" },
    11: { name: "Justice", meaning: "Fairness, truth, law", image: "⚖️", effect: "create_courtroom" },
    12: { name: "The Hanged Man", meaning: "Surrender, new perspective, suspension", image: "🙃", effect: "create_upside_down_room" },
    13: { name: "Death", meaning: "Transformation, endings, change", image: "💀", effect: "create_crypt" },
    14: { name: "Temperance", meaning: "Balance, moderation, patience", image: "🌊", effect: "create_sanctuary" },
    15: { name: "The Devil", meaning: "Bondage, materialism, temptation", image: "😈", effect: "create_trap_room" },
    16: { name: "The Tower", meaning: "Sudden change, upheaval, revelation", image: "🏰", effect: "destroy_random_walls" },
    17: { name: "The Star", meaning: "Hope, inspiration, serenity", image: "⭐", effect: "create_observatory" },
    18: { name: "The Moon", meaning: "Illusion, intuition, dreams", image: "🌙", effect: "create_dream_maze" },
    19: { name: "The Sun", meaning: "Joy, success, vitality", image: "☀️", effect: "create_sunlit_atrium" },
    20: { name: "Judgement", meaning: "Rebirth, inner calling, absolution", image: "📯", effect: "create_final_chamber" },
    21: { name: "The World", meaning: "Completion, integration, accomplishment", image: "🌍", effect: "create_treasure_vault" },
    
    // Minor Arcana - Cups
    22: { name: "Ace of Cups", meaning: "New feelings, love, intuition", image: "🍷", effect: "create_spring_room" },
    23: { name: "Two of Cups", meaning: "Partnership, mutual attraction", image: "👥", effect: "create_meeting_room" },
    24: { name: "Three of Cups", meaning: "Celebration, friendship, creativity", image: "🎉", effect: "create_banquet_hall" },
    25: { name: "Four of Cups", meaning: "Apathy, contemplation, disconnectedness", image: "🤔", effect: "create_meditation_chamber" },
    26: { name: "Five of Cups", meaning: "Loss, regret, disappointment", image: "😢", effect: "create_memorial" },
    27: { name: "Six of Cups", meaning: "Nostalgia, childhood memories", image: "👶", effect: "create_playroom" },
    28: { name: "Seven of Cups", meaning: "Choices, illusions, imagination", image: "🎭", effect: "create_illusion_maze" },
    29: { name: "Eight of Cups", meaning: "Walking away, disillusionment", image: "🚶", effect: "create_abandoned_corridor" },
    30: { name: "Nine of Cups", meaning: "Wishes fulfilled, satisfaction", image: "🎁", effect: "create_wish_room" },
    31: { name: "Ten of Cups", meaning: "Happiness, family, harmony", image: "🏠", effect: "create_cozy_chamber" },
    
    // Minor Arcana - Wands
    32: { name: "Ace of Wands", meaning: "Inspiration, new opportunities", image: "🔥", effect: "create_fireplace_room" },
    33: { name: "Two of Wands", meaning: "Planning, making decisions", image: "🗺️", effect: "create_map_room" },
    34: { name: "Three of Wands", meaning: "Looking ahead, expansion", image: "👀", effect: "create_balcony" },
    35: { name: "Four of Wands", meaning: "Celebration, homecoming", image: "🏛️", effect: "create_festival_grounds" },
    36: { name: "Five of Wands", meaning: "Conflict, competition", image: "⚔️", effect: "create_battle_arena" },
    37: { name: "Six of Wands", meaning: "Victory, recognition", image: "🏆", effect: "create_victory_hall" },
    38: { name: "Seven of Wands", meaning: "Defensiveness, perseverance", image: "🛡️", effect: "create_fortress" },
    39: { name: "Eight of Wands", meaning: "Speed, action, movement", image: "⚡", effect: "create_speed_corridor" },
    40: { name: "Nine of Wands", meaning: "Resilience, persistence", image: "🛡️", effect: "create_guard_post" },
    41: { name: "Ten of Wands", meaning: "Burden, responsibility", image: "📦", effect: "create_storage_room" },
    
    // Minor Arcana - Swords
    42: { name: "Ace of Swords", meaning: "Clarity, breakthrough, new ideas", image: "⚔️", effect: "create_crystal_chamber" },
    43: { name: "Two of Swords", meaning: "Difficult choices, stalemate", image: "⚖️", effect: "create_crossroads" },
    44: { name: "Three of Swords", meaning: "Heartbreak, sorrow, grief", image: "💔", effect: "create_sorrow_chamber" },
    45: { name: "Four of Swords", meaning: "Rest, recovery, contemplation", image: "🛌", effect: "create_rest_chamber" },
    46: { name: "Five of Swords", meaning: "Conflict, betrayal, defeat", image: "🗡️", effect: "create_betrayal_room" },
    47: { name: "Six of Swords", meaning: "Transition, moving on", image: "⛵", effect: "create_river_crossing" },
    48: { name: "Seven of Swords", meaning: "Deception, strategy, theft", image: "🦊", effect: "create_secret_vault" },
    49: { name: "Eight of Swords", meaning: "Restriction, victim mentality", image: "🔗", effect: "create_prison" },
    50: { name: "Nine of Swords", meaning: "Anxiety, worry, sleepless nights", image: "😰", effect: "create_nightmare_chamber" },
    51: { name: "Ten of Swords", meaning: "Betrayal, painful endings", image: "🗡️", effect: "create_execution_ground" },
    
    // Minor Arcana - Pentacles
    52: { name: "Ace of Pentacles", meaning: "New financial opportunity", image: "💰", effect: "create_treasury" },
    53: { name: "Two of Pentacles", meaning: "Balance, adaptability", image: "♊", effect: "create_balancing_bridge" },
    54: { name: "Three of Pentacles", meaning: "Teamwork, collaboration", image: "👷", effect: "create_workshop" },
    55: { name: "Four of Pentacles", meaning: "Possessiveness, control", image: "🏛️", effect: "create_vault" },
    56: { name: "Five of Pentacles", meaning: "Hardship, poverty, insecurity", image: "❄️", effect: "create_ice_chamber" },
    57: { name: "Six of Pentacles", meaning: "Generosity, charity, sharing", image: "🎁", effect: "create_gift_room" },
    58: { name: "Seven of Pentacles", meaning: "Patience, investment, growth", image: "🌱", effect: "create_garden" },
    59: { name: "Eight of Pentacles", meaning: "Apprenticeship, craftsmanship", image: "🔨", effect: "create_craft_room" },
    60: { name: "Nine of Pentacles", meaning: "Self-sufficiency, luxury", image: "🏡", effect: "create_luxury_chamber" },
    61: { name: "Ten of Pentacles", meaning: "Legacy, family, wealth", image: "👨‍👩‍👧‍👦", effect: "create_family_chamber" }
};

class TarotDeck {
    constructor() {
        this.cards = Object.keys(TAROT_CARDS).map(Number);
        this.shuffle();
    }
    
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    drawCard() {
        if (this.cards.length === 0) {
            this.shuffle();
        }
        return this.cards.pop();
    }
    
    getCardInfo(cardId) {
        return TAROT_CARDS[cardId] || null;
    }
    
    getRandomCard() {
        const cardId = Math.floor(Math.random() * 62);
        return {
            id: cardId,
            ...this.getCardInfo(cardId)
        };
    }
}

// Global tarot deck instance
const tarotDeck = new TarotDeck();