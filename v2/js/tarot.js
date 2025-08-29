// Complete Tarot Card System for The Dragon's Nest
// Includes all 78 cards of the Rider-Waite tarot deck with meanings and effects

const TAROT_DECK = {
    majorArcana: [
        {
            id: 0,
            name: "The Fool",
            image: "🃏",
            meaning: "New beginnings, innocence, spontaneity",
            reversed: "Recklessness, risk-taking, being taken advantage of",
            effect: "create_new_path",
            description: "A new journey begins. The dungeon shifts to reveal unexplored pathways.",
            keywords: ["beginning", "journey", "potential", "innocence"]
        },
        {
            id: 1,
            name: "The Magician",
            image: "🎭",
            meaning: "Manifestation, resourcefulness, power",
            reversed: "Manipulation, poor planning, untapped talents",
            effect: "create_magical_tools",
            description: "Tools of power appear. Magical artifacts manifest in the room.",
            keywords: ["power", "skill", "manifestation", "creation"]
        },
        {
            id: 2,
            name: "The High Priestess",
            image: "👸",
            meaning: "Intuition, unconscious knowledge, mystery",
            reversed: "Secrets revealed, disconnected from intuition",
            effect: "reveal_hidden_passages",
            description: "Hidden knowledge surfaces. Secret passages and concealed doors appear.",
            keywords: ["intuition", "mystery", "secrets", "wisdom"]
        },
        {
            id: 3,
            name: "The Empress",
            image: "👑",
            meaning: "Femininity, nurturing, fertility, abundance",
            reversed: "Creative blocks, dependency on others",
            effect: "create_garden",
            description: "Nature flourishes. The room transforms into a lush garden sanctuary.",
            keywords: ["abundance", "nurturing", "nature", "creation"]
        },
        {
            id: 4,
            name: "The Emperor",
            image: "👑",
            meaning: "Authority, structure, control, fatherhood",
            reversed: "Excessive control, rigidity, domination",
            effect: "create_throne_room",
            description: "Authority manifests. A grand throne room materializes with regal splendor.",
            keywords: ["authority", "structure", "leadership", "power"]
        },
        {
            id: 5,
            name: "The Hierophant",
            image: "⛪",
            meaning: "Tradition, conformity, morality, ethics",
            reversed: "Challenging the status quo, personal beliefs",
            effect: "create_temple",
            description: "Sacred space emerges. A temple of ancient wisdom forms around you.",
            keywords: ["tradition", "wisdom", "spirituality", "guidance"]
        },
        {
            id: 6,
            name: "The Lovers",
            image: "💕",
            meaning: "Love, harmony, relationships, choices",
            reversed: "Disharmony, imbalance, poor communication",
            effect: "create_lovers_chamber",
            description: "Love's energy fills the space. A romantic chamber appears with symbols of union.",
            keywords: ["love", "harmony", "choice", "union"]
        },
        {
            id: 7,
            name: "The Chariot",
            image: "🚗",
            meaning: "Control, willpower, victory, assertion",
            reversed: "Lack of control, opposition, aggression",
            effect: "create_vehicle",
            description: "Movement becomes possible. A mystical vehicle appears for transportation.",
            keywords: ["victory", "control", "movement", "determination"]
        },
        {
            id: 8,
            name: "Strength",
            image: "💪",
            meaning: "Courage, patience, influence, compassion",
            reversed: "Self-doubt, weakness, insecurity",
            effect: "create_training_ground",
            description: "Inner strength manifests. A training ground for developing power appears.",
            keywords: ["strength", "courage", "patience", "compassion"]
        },
        {
            id: 9,
            name: "The Hermit",
            image: "🔦",
            meaning: "Soul-searching, introspection, guidance",
            reversed: "Isolation, loneliness, withdrawal",
            effect: "create_sanctuary",
            description: "Solitude calls. A peaceful sanctuary for reflection materializes.",
            keywords: ["wisdom", "solitude", "guidance", "reflection"]
        },
        {
            id: 10,
            name: "Wheel of Fortune",
            image: "🎡",
            meaning: "Good luck, karma, life cycles, destiny",
            reversed: "Bad luck, resistance to change, breaking cycles",
            effect: "create_wheel",
            description: "Fate spins. A great wheel appears, changing the dungeon's layout.",
            keywords: ["luck", "cycles", "destiny", "change"]
        },
        {
            id: 11,
            name: "Justice",
            image: "⚖️",
            meaning: "Justice, fairness, truth, cause and effect",
            reversed: "Unfairness, lack of accountability, dishonesty",
            effect: "create_courtroom",
            description: "Balance is restored. A courtroom of cosmic justice forms.",
            keywords: ["justice", "truth", "balance", "accountability"]
        },
        {
            id: 12,
            name: "The Hanged Man",
            image: "🙃",
            meaning: "Surrender, new perspective, suspension",
            reversed: "Delays, resistance, stalling, indecision",
            effect: "create_inverted_room",
            description: "Perspective shifts. The room inverts, offering new viewpoints.",
            keywords: ["surrender", "perspective", "suspension", "letting go"]
        },
        {
            id: 13,
            name: "Death",
            image: "💀",
            meaning: "Endings, change, transformation, transition",
            reversed: "Resistance to change, personal transformation",
            effect: "create_crypt",
            description: "Transformation begins. A crypt of endings and new beginnings appears.",
            keywords: ["transformation", "ending", "change", "rebirth"]
        },
        {
            id: 14,
            name: "Temperance",
            image: "🍷",
            meaning: "Balance, moderation, patience, purpose",
            reversed: "Imbalance, excess, self-healing, re-alignment",
            effect: "create_sanctuary",
            description: "Harmony flows. A balanced sanctuary of healing energy forms.",
            keywords: ["balance", "moderation", "healing", "harmony"]
        },
        {
            id: 15,
            name: "The Devil",
            image: "😈",
            meaning: "Bondage, materialism, sexuality, addiction",
            reversed: "Releasing limiting beliefs, exploring dark thoughts",
            effect: "create_dungeon",
            description: "Shadows emerge. A dark dungeon of temptation and bondage manifests.",
            keywords: ["bondage", "materialism", "temptation", "shadow"]
        },
        {
            id: 16,
            name: "The Tower",
            image: "🏰",
            meaning: "Sudden change, upheaval, chaos, revelation",
            reversed: "Personal transformation, fear of change, averting disaster",
            effect: "create_tower",
            description: "Destruction and revelation. A crumbling tower rises dramatically.",
            keywords: ["upheaval", "chaos", "revelation", "destruction"]
        },
        {
            id: 17,
            name: "The Star",
            image: "⭐",
            meaning: "Hope, faith, purpose, renewal, spirituality",
            reversed: "Lack of faith, despair, self-trust, disconnection",
            effect: "create_observatory",
            description: "Hope illuminates. A starlit observatory opens to cosmic wisdom.",
            keywords: ["hope", "faith", "renewal", "inspiration"]
        },
        {
            id: 18,
            name: "The Moon",
            image: "🌙",
            meaning: "Illusion, fear, anxiety, subconscious, intuition",
            reversed: "Release of fear, repressed emotion, inner confusion",
            effect: "create_moonlit_chamber",
            description: "Mystery deepens. A moonlit chamber of dreams and illusions appears.",
            keywords: ["illusion", "intuition", "mystery", "subconscious"]
        },
        {
            id: 19,
            name: "The Sun",
            image: "☀️",
            meaning: "Positivity, fun, warmth, success, vitality",
            reversed: "Inner child, feeling down, overly optimistic",
            effect: "create_sun_chamber",
            description: "Joy radiates. A sun-drenched chamber of warmth and success manifests.",
            keywords: ["joy", "success", "vitality", "positivity"]
        },
        {
            id: 20,
            name: "Judgement",
            image: "📯",
            meaning: "Judgement, rebirth, inner calling, absolution",
            reversed: "Self-doubt, inner critic, ignoring the call",
            effect: "create_judgement_hall",
            description: "Reckoning arrives. A hall of final judgement and rebirth forms.",
            keywords: ["rebirth", "judgement", "awakening", "redemption"]
        },
        {
            id: 21,
            name: "The World",
            image: "🌍",
            meaning: "Completion, integration, accomplishment, travel",
            reversed: "Seeking personal closure, short-cuts, delays",
            effect: "create_world_chamber",
            description: "Completion achieved. A chamber representing wholeness and integration appears.",
            keywords: ["completion", "integration", "accomplishment", "wholeness"]
        }
    ],
    
    minorArcana: {
        cups: [
            { name: "Ace of Cups", image: "🍷", meaning: "New feelings, spirituality, intuition", effect: "create_spring", keywords: ["emotion", "intuition", "spirituality"] },
            { name: "Two of Cups", image: "🍷🍷", meaning: "Unity, partnership, mutual attraction", effect: "create_lovers_nest", keywords: ["partnership", "unity", "love"] },
            { name: "Three of Cups", image: "🍷🍷🍷", meaning: "Celebration, friendship, creativity", effect: "create_festival_ground", keywords: ["celebration", "friendship", "joy"] },
            { name: "Four of Cups", image: "🍷🍷🍷🍷", meaning: "Apathy, contemplation, disconnectedness", effect: "create_meditation_garden", keywords: ["contemplation", "apathy", "meditation"] },
            { name: "Five of Cups", image: "🍷🍷🍷🍷🍷", meaning: "Loss, grief, disappointment, regret", effect: "create_memorial", keywords: ["loss", "grief", "regret"] },
            { name: "Six of Cups", image: "🍷🍷🍷🍷🍷🍷", meaning: "Nostalgia, memories, familiarity, healing", effect: "create_memory_chamber", keywords: ["nostalgia", "memories", "healing"] },
            { name: "Seven of Cups", image: "🍷🍷🍷🍷🍷🍷🍷", meaning: "Choices, opportunities, illusion, wishful thinking", effect: "create_choice_chamber", keywords: ["choices", "illusions", "opportunities"] },
            { name: "Eight of Cups", image: "🍷🍷🍷🍷🍷🍷🍷🍷", meaning: "Walking away, disillusionment, leaving behind", effect: "create_departure_gate", keywords: ["departure", "disillusionment", "journey"] },
            { name: "Nine of Cups", image: "🍷🍷🍷🍷🍷🍷🍷🍷🍷", meaning: "Satisfaction, emotional stability, luxury", effect: "create_luxury_chamber", keywords: ["satisfaction", "luxury", "contentment"] },
            { name: "Ten of Cups", image: "🍷🍷🍷🍷🍷🍷🍷🍷🍷🍷", meaning: "Divine love, blissful relationships, harmony", effect: "create_family_chamber", keywords: ["harmony", "family", "bliss"] },
            { name: "Page of Cups", image: "👦🍷", meaning: "Creative opportunities, intuitive messages", effect: "create_art_studio", keywords: ["creativity", "intuition", "messages"] },
            { name: "Knight of Cups", image: "🤴🍷", meaning: "Romance, charm, 'knight in shining armor'", effect: "create_romantic_chamber", keywords: ["romance", "charm", "proposal"] },
            { name: "Queen of Cups", image: "👸🍷", meaning: "Compassion, calm, comfort", effect: "create_comfort_chamber", keywords: ["compassion", "comfort", "calm"] },
            { name: "King of Cups", image: "🤴🍷", meaning: "Emotional balance, diplomacy, counseling", effect: "create_counseling_chamber", keywords: ["balance", "diplomacy", "wisdom"] }
        ],
        
        pentacles: [
            { name: "Ace of Pentacles", image: "💰", meaning: "New financial opportunity, manifestation", effect: "create_treasury", keywords: ["opportunity", "manifestation", "wealth"] },
            { name: "Two of Pentacles", image: "💰💰", meaning: "Balance, adaptability, time management", effect: "create_balance_chamber", keywords: ["balance", "adaptability", "juggling"] },
            { name: "Three of Pentacles", image: "💰💰💰", meaning: "Teamwork, collaboration, learning", effect: "create_workshop", keywords: ["teamwork", "collaboration", "mastery"] },
            { name: "Four of Pentacles", image: "💰💰💰💰", meaning: "Possessiveness, scarcity mindset, control", effect: "create_vault", keywords: ["possessiveness", "security", "control"] },
            { name: "Five of Pentacles", image: "💰💰💰💰💰", meaning: "Financial loss, poverty, insecurity", effect: "create_poorhouse", keywords: ["loss", "poverty", "hardship"] },
            { name: "Six of Pentacles", image: "💰💰💰💰💰💰", meaning: "Giving, receiving, sharing wealth", effect: "create_charity_chamber", keywords: ["generosity", "charity", "sharing"] },
            { name: "Seven of Pentacles", image: "💰💰💰💰💰💰💰", meaning: "Long-term view, sustainable results", effect: "create_garden_plot", keywords: ["patience", "investment", "growth"] },
            { name: "Eight of Pentacles", image: "💰💰💰💰💰💰💰💰", meaning: "Apprenticeship, education, quality", effect: "create_apprentice_chamber", keywords: ["apprenticeship", "skill", "mastery"] },
            { name: "Nine of Pentacles", image: "💰💰💰💰💰💰💰💰💰", meaning: "Abundance, luxury, self-sufficiency", effect: "create_luxury_garden", keywords: ["luxury", "independence", "abundance"] },
            { name: "Ten of Pentacles", image: "💰💰💰💰💰💰💰💰💰💰", meaning: "Wealth, inheritance, family, establishment", effect: "create_family_estate", keywords: ["wealth", "family", "legacy"] },
            { name: "Page of Pentacles", image: "👦💰", meaning: "Manifestation, financial opportunity, new job", effect: "create_study_chamber", keywords: ["manifestation", "opportunity", "learning"] },
            { name: "Knight of Pentacles", image: "🤴💰", meaning: "Efficiency, routine, conservatism", effect: "create_methodical_chamber", keywords: ["efficiency", "routine", "method"] },
            { name: "Queen of Pentacles", image: "👸💰", meaning: "Practical, homely, motherly, down-to-earth", effect: "create_home_chamber", keywords: ["practicality", "nurturing", "comfort"] },
            { name: "King of Pentacles", image: "🤴💰", meaning: "Wealth, business, leadership, security", effect: "create_executive_chamber", keywords: ["wealth", "leadership", "security"] }
        ],
        
        swords: [
            { name: "Ace of Swords", image: "⚔️", meaning: "Breakthrough, clarity, sharp mind", effect: "create_clarity_chamber", keywords: ["clarity", "breakthrough", "truth"] },
            { name: "Two of Swords", image: "⚔️⚔️", meaning: "Difficult choices, indecision, stalemate", effect: "create_decision_chamber", keywords: ["choices", "indecision", "stalemate"] },
            { name: "Three of Swords", image: "⚔️⚔️⚔️", meaning: "Heartbreak, separation, sadness", effect: "create_sorrow_chamber", keywords: ["heartbreak", "sorrow", "separation"] },
            { name: "Four of Swords", image: "⚔️⚔️⚔️⚔️", meaning: "Rest, restoration, contemplation, recuperation", effect: "create_rest_chamber", keywords: ["rest", "recovery", "contemplation"] },
            { name: "Five of Swords", image: "⚔️⚔️⚔️⚔️⚔️", meaning: "Conflict, disagreements, competition, defeat, winning at all costs", effect: "create_battlefield", keywords: ["conflict", "competition", "defeat"] },
            { name: "Six of Swords", image: "⚔️⚔️⚔️⚔️⚔️⚔️", meaning: "Transition, change, rite of passage, releasing baggage", effect: "create_transition_chamber", keywords: ["transition", "journey", "moving on"] },
            { name: "Seven of Swords", image: "⚔️⚔️⚔️⚔️⚔️⚔️⚔️", meaning: "Betrayal, deception, getting away with something, acting strategically", effect: "create_deception_chamber", keywords: ["deception", "strategy", "betrayal"] },
            { name: "Eight of Swords", image: "⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️", meaning: "Imprisonment, entrapment, self-victimization, restriction", effect: "create_prison", keywords: ["restriction", "entrapment", "victimhood"] },
            { name: "Nine of Swords", image: "⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️", meaning: "Anxiety, worry, fear, depression, nightmares", effect: "create_nightmare_chamber", keywords: ["anxiety", "worry", "fear"] },
            { name: "Ten of Swords", image: "⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️⚔️", meaning: "Failure, collapse, defeat, betrayal, the end", effect: "create_ruins", keywords: ["defeat", "ending", "betrayal"] },
            { name: "Page of Swords", image: "👦⚔️", meaning: "Curiosity, restlessness, mental energy, communication", effect: "create_study", keywords: ["curiosity", "communication", "learning"] },
            { name: "Knight of Swords", image: "🤴⚔️", meaning: "Action, impulsiveness, defending beliefs, championing causes", effect: "create_battle_arena", keywords: ["action", "champion", "defense"] },
            { name: "Queen of Swords", image: "👸⚔️", meaning: "Complexity, perceptiveness, clear mindedness, independence", effect: "create_council_chamber", keywords: ["perception", "independence", "wisdom"] },
            { name: "King of Swords", image: "🤴⚔️", meaning: "Mental clarity, intellectual power, authority, truth", effect: "create_courtroom", keywords: ["clarity", "authority", "truth"] }
        ],
        
        wands: [
            { name: "Ace of Wands", image: "🔥", meaning: "Inspiration, new opportunities, growth, potential", effect: "create_inspiration_chamber", keywords: ["inspiration", "potential", "growth"] },
            { name: "Two of Wands", image: "🔥🔥", meaning: "Future planning, progress, decisions, discovery", effect: "create_planning_chamber", keywords: ["planning", "future", "decisions"] },
            { name: "Three of Wands", image: "🔥🔥🔥", meaning: "Looking ahead, expansion, rapid growth, foresight", effect: "create_observation_deck", keywords: ["expansion", "foresight", "growth"] },
            { name: "Four of Wands", image: "🔥🔥🔥🔥", meaning: "Celebration, joy, harmony, relaxation, homecoming", effect: "create_celebration_hall", keywords: ["celebration", "harmony", "home"] },
            { name: "Five of Wands", image: "🔥🔥🔥🔥🔥", meaning: "Conflict, disagreements, competition, tension, diversity", effect: "create_competition_ground", keywords: ["competition", "conflict", "tension"] },
            { name: "Six of Wands", image: "🔥🔥🔥🔥🔥🔥", meaning: "Success, public recognition, progress, self-confidence", effect: "create_victory_hall", keywords: ["victory", "success", "recognition"] },
            { name: "Seven of Wands", image: "🔥🔥🔥🔥🔥🔥🔥", meaning: "Challenge, competition, protection, perseverance", effect: "create_defensive_position", keywords: ["defense", "challenge", "perseverance"] },
            { name: "Eight of Wands", image: "🔥🔥🔥🔥🔥🔥🔥🔥", meaning: "Movement, fast paced change, action, alignment", effect: "create_speedway", keywords: ["speed", "movement", "action"] },
            { name: "Nine of Wands", image: "🔥🔥🔥🔥🔥🔥🔥🔥🔥", meaning: "Resilience, grit, last stand, persistence, fatigue", effect: "create_last_stand", keywords: ["resilience", "persistence", "defense"] },
            { name: "Ten of Wands", image: "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥", meaning: "Burden, responsibility, hard work, stress, achievement", effect: "create_burden_chamber", keywords: ["burden", "responsibility", "achievement"] },
            { name: "Page of Wands", image: "👦🔥", meaning: "Enthusiasm, exploration, discovery, free spirit", effect: "create_exploration_chamber", keywords: ["enthusiasm", "exploration", "discovery"] },
            { name: "Knight of Wands", image: "🤴🔥", meaning: "Energy, passion, lust, action, adventure, impulsiveness", effect: "create_adventure_path", keywords: ["adventure", "passion", "action"] },
            { name: "Queen of Wands", image: "👸🔥", meaning: "Courage, determination, joy, confidence, social butterfly", effect: "create_social_chamber", keywords: ["courage", "confidence", "social"] },
            { name: "King of Wands", image: "🤴🔥", meaning: "Natural-born leader, vision, entrepreneur, honor", effect: "create_leadership_chamber", keywords: ["leadership", "vision", "honor"] }
        ]
    }
};

// Tarot Deck Management System
class TarotDeck {
    constructor() {
        this.reset();
    }
    
    reset() {
        // Create a complete deck with all 78 cards
        this.cards = [];
        
        // Add Major Arcana
        TAROT_DECK.majorArcana.forEach(card => {
            this.cards.push({...card, type: 'major', suit: 'major'});
        });
        
        // Add Minor Arcana
        Object.keys(TAROT_DECK.minorArcana).forEach(suit => {
            TAROT_DECK.minorArcana[suit].forEach(card => {
                this.cards.push({...card, type: 'minor', suit: suit});
            });
        });
        
        this.shuffle();
    }
    
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    draw(count = 1) {
        if (count === 1) {
            return this.cards.pop();
        }
        return this.cards.splice(-count);
    }
    
    drawRandom() {
        const index = Math.floor(Math.random() * this.cards.length);
        return this.cards.splice(index, 1)[0];
    }
    
    getRemainingCount() {
        return this.cards.length;
    }
    
    isEmpty() {
        return this.cards.length === 0;
    }
    
    // Get cards by keyword or meaning
    searchCards(query) {
        query = query.toLowerCase();
        return this.cards.filter(card =>
            card.name.toLowerCase().includes(query) ||
            card.meaning.toLowerCase().includes(query) ||
            card.keywords.some(keyword => keyword.toLowerCase().includes(query))
        );
    }
    
    // Get cards by effect type
    getCardsByEffect(effect) {
        return this.cards.filter(card => card.effect === effect);
    }
    
    // Get cards by suit
    getCardsBySuit(suit) {
        return this.cards.filter(card => card.suit === suit);
    }
}

// Card effect implementations
const CARD_EFFECTS = {
    create_new_path: (room) => {
        room.description = "A new path opens before you, filled with potential and uncertainty.";
        room.exits.push({ direction: "forward", leadsTo: "new_area", locked: false });
        return room;
    },
    
    create_magical_tools: (room) => {
        room.description = "Magical tools and artifacts materialize around you.";
        room.items.push({ name: "Magical Wand", type: "tool", power: 5 });
        room.items.push({ name: "Crystal Ball", type: "tool", power: 3 });
        return room;
    },
    
    reveal_hidden_passages: (room) => {
        room.description = "Hidden passages reveal themselves in the walls.";
        room.exits.push({ direction: "secret", leadsTo: "hidden_chamber", locked: false });
        return room;
    },
    
    create_garden: (room) => {
        room.description = "A lush garden sanctuary blooms around you.";
        room.environment = "garden";
        room.items.push({ name: "Healing Herb", type: "potion", effect: "heal" });
        return room;
    },
    
    create_throne_room: (room) => {
        room.description = "A grand throne room materializes with regal splendor.";
        room.environment = "throne_room";
        room.items.push({ name: "Crown", type: "treasure", value: 100 });
        return room;
    },
    
    create_temple: (room) => {
        room.description = "A sacred temple of ancient wisdom forms around you.";
        room.environment = "temple";
        room.items.push({ name: "Holy Symbol", type: "artifact", power: 10 });
        return room;
    },
    
    create_lovers_chamber: (room) => {
        room.description = "A romantic chamber filled with symbols of union appears.";
        room.environment = "lovers_chamber";
        room.items.push({ name: "Love Potion", type: "potion", effect: "charm" });
        return room;
    },
    
    create_vehicle: (room) => {
        room.description = "A mystical vehicle appears for transportation.";
        room.items.push({ name: "Magic Carpet", type: "vehicle", speed: 10 });
        return room;
    },
    
    create_training_ground: (room) => {
        room.description = "A training ground for developing power appears.";
        room.environment = "training_ground";
        room.items.push({ name: "Training Sword", type: "weapon", power: 5 });
        return room;
    },
    
    create_sanctuary: (room) => {
        room.description = "A peaceful sanctuary for reflection materializes.";
        room.environment = "sanctuary";
        room.items.push({ name: "Meditation Cushion", type: "tool", effect: "wisdom" });
        return room;
    },
    
    create_wheel: (room) => {
        room.description = "A great wheel of fortune appears, changing the dungeon's layout.";
        room.items.push({ name: "Wheel of Fortune", type: "artifact", effect: "random_teleport" });
        return room;
    },
    
    create_courtroom: (room) => {
        room.description = "A courtroom of cosmic justice forms around you.";
        room.environment = "courtroom";
        room.items.push({ name: "Scales of Justice", type: "artifact", power: 7 });
        return room;
    },
    
    create_inverted_room: (room) => {
        room.description = "The room inverts, offering new perspectives on everything.";
        room.environment = "inverted";
        room.items.push({ name: "Upside-down Mirror", type: "artifact", effect: "perspective_shift" });
        return room;
    },
    
    create_crypt: (room) => {
        room.description = "A crypt of endings and new beginnings appears.";
        room.environment = "crypt";
        room.items.push({ name: "Phoenix Feather", type: "artifact", effect: "rebirth" });
        return room;
    },
    
    create_dungeon: (room) => {
        room.description = "A dark dungeon of temptation and shadow emerges.";
        room.environment = "dungeon";
        room.items.push({ name: "Shadow Key", type: "key", opens: "dark_secrets" });
        return room;
    },
    
    create_tower: (room) => {
        room.description = "A crumbling tower rises dramatically before you.";
        room.environment = "tower";
        room.items.push({ name: "Lightning Rod", type: "artifact", power: 15 });
        return room;
    },
    
    create_observatory: (room) => {
        room.description = "A starlit observatory opens to cosmic wisdom.";
        room.environment = "observatory";
        room.items.push({ name: "Star Map", type: "tool", effect: "navigation" });
        return room;
    },
    
    create_moonlit_chamber: (room) => {
        room.description = "A moonlit chamber of dreams and illusions appears.";
        room.environment = "moonlit";
        room.items.push({ name: "Moonstone", type: "gem", power: 8 });
        return room;
    },
    
    create_sun_chamber: (room) => {
        room.description = "A sun-drenched chamber of warmth and success manifests.";
        room.environment = "sunlit";
        room.items.push({ name: "Sun Crystal", type: "gem", power: 12 });
        return room;
    },
    
    create_judgement_hall: (room) => {
        room.description = "A hall of final judgement and rebirth forms.";
        room.environment = "judgement_hall";
        room.items.push({ name: "Trumpet of Awakening", type: "artifact", effect: "rebirth" });
        return room;
    },
    
    create_world_chamber: (room) => {
        room.description = "A chamber representing wholeness and integration appears.";
        room.environment = "cosmic";
        room.items.push({ name: "World Globe", type: "artifact", effect: "completion" });
        return room;
    }
};

// Utility functions
function getRandomCard() {
    const deck = new TarotDeck();
    return deck.draw();
}

function getCardByName(name) {
    const deck = new TarotDeck();
    return deck.cards.find(card => card.name.toLowerCase() === name.toLowerCase());
}

function interpretCard(card, reversed = false) {
    const interpretation = {
        name: card.name,
        image: card.image,
        meaning: reversed ? card.reversed || card.meaning : card.meaning,
        keywords: card.keywords,
        effect: card.effect,
        description: card.description
    };
    
    if (reversed) {
        interpretation.name += " (Reversed)";
    }
    
    return interpretation;
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TAROT_DECK, TarotDeck, CARD_EFFECTS, getRandomCard, getCardByName, interpretCard };
} else {
    window.TAROT_SYSTEM = { TAROT_DECK, TarotDeck, CARD_EFFECTS, getRandomCard, getCardByName, interpretCard };
}