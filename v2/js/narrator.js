// Narrator system with English grandma voice
class Narrator {
    constructor() {
        this.voice = null;
        this.isSpeaking = false;
        this.narratorElement = document.getElementById('narratorText');
        this.initializeVoice();
    }
    
    async initializeVoice() {
        if ('speechSynthesis' in window) {
            // Wait for voices to load
            return new Promise((resolve) => {
                if (speechSynthesis.getVoices().length > 0) {
                    this.selectVoice();
                    resolve();
                } else {
                    speechSynthesis.onvoiceschanged = () => {
                        this.selectVoice();
                        resolve();
                    };
                }
            });
        }
    }
    
    selectVoice() {
        const voices = speechSynthesis.getVoices();
        // Try to find an English voice, preferably female
        this.voice = voices.find(voice => 
            voice.lang.includes('en') && 
            (voice.name.includes('Female') || voice.name.includes('Anna') || voice.name.includes('Google'))
        ) || voices[0];
    }
    
    speak(text, priority = false) {
        if (this.isSpeaking && !priority) return;
        
        this.isSpeaking = true;
        this.updateNarratorText(text);
        
        if (this.voice && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = this.voice;
            utterance.rate = 0.9; // Slightly slower for grandma effect
            utterance.pitch = 1.1; // Slightly higher pitch
            
            utterance.onend = () => {
                this.isSpeaking = false;
            };
            
            utterance.onerror = () => {
                this.isSpeaking = false;
            };
            
            speechSynthesis.speak(utterance);
        } else {
            // Fallback if speech synthesis is not available
            setTimeout(() => {
                this.isSpeaking = false;
            }, 3000);
        }
    }
    
    updateNarratorText(text) {
        if (this.narratorElement) {
            this.narratorElement.textContent = text;
            document.getElementById('narrator').style.display = 'block';
        }
    }
    
    // Narration for specific events
    welcomePlayer(playerName) {
        const messages = [
            `Oh my, ${playerName}! Welcome to the Dragon's Nest, dearie. The cards have been waiting for you.`,
            `Well hello there, ${playerName}! Granny's been expecting you. The dungeon knows you're coming.`,
            `Come in, come in, ${playerName}! Don't be shy now. The tarot cards have such lovely stories to tell you.`
        ];
        this.speak(messages[Math.floor(Math.random() * messages.length)], true);
    }
    
    describeCard(card) {
        const messages = [
            `Oh, you've drawn ${card.name}, my dear. ${card.meaning}. This will change your path ahead.`,
            `Look at that! ${card.name} appears before you. ${card.meaning}. The dungeon listens to this wisdom.`,
            `Ah, ${card.name} - such a meaningful card. ${card.meaning}. Watch how the world shifts around you.`
        ];
        this.speak(messages[Math.floor(Math.random() * messages.length)]);
    }
    
    describeRoom(room) {
        const descriptions = {
            mystical: "You enter a room shimmering with ancient magic, dearie. Crystals hum with forgotten power.",
            royal: "My, what a grand throne room! The very walls speak of kings and queens long past.",
            nature: "Oh, how lovely! A garden grows within these stone walls. Life finds a way, doesn't it?",
            death: "This place feels... heavy, child. The air itself remembers those who came before.",
            treasure: "Oh my stars! Gold and jewels sparkle everywhere. But remember, wealth isn't just gold.",
            maze: "A labyrinth! How exciting! But don't worry, love, the cards will guide your way.",
            dream: "Everything feels... floaty here. Like walking through a lovely dream.",
            combat: "This room feels tense, like it's waiting for something. Best be careful, dearie."
        };
        
        const description = descriptions[room.theme] || "A mysterious room awaits you, full of possibilities.";
        this.speak(description);
    }
    
    playerJoined(playerName) {
        const messages = [
            `Oh look, ${playerName} has joined us! The more the merrier, I always say.`,
            `Welcome, ${playerName}! Granny's so pleased to have more visitors in our magical dungeon.`,
            `${playerName} has arrived! The cards whisper that this changes everything, dearie.`
        ];
        this.speak(messages[Math.floor(Math.random() * messages.length)]);
    }
    
    playerLeft(playerName) {
        const messages = [
            `Oh dear, ${playerName} has left us. The dungeon feels a bit quieter now.`,
            `${playerName} had to go, but the cards remember their journey.`,
            `Safe travels, ${playerName}! The Dragon's Nest will always welcome you back.`
        ];
        this.speak(messages[Math.floor(Math.random() * messages.length)]);
    }
    
    doorOpened(card) {
        const messages = [
            `As the door closes behind you, ${card.name} appears! The dungeon reshapes itself to this new wisdom.`,
            `The door seals shut, and ${card.name} materializes before you. Watch how the world changes, dearie!`,
            `With a soft click, the door transforms. ${card.name} now guards your way forward.`
        ];
        this.speak(messages[Math.floor(Math.random() * messages.length)]);
    }
    
    giveHint() {
        const hints = [
            "Remember, dearie, each card teaches us something new. Pay attention to their meanings!",
            "The dungeon is alive with stories. Listen to what each room tells you.",
            "Sometimes the longest path teaches us the most, child. Don't rush your journey.",
            "Every door leads somewhere new, but the cards decide where. Trust in their wisdom."
        ];
        this.speak(hints[Math.floor(Math.random() * hints.length)]);
    }
}

// Global narrator instance
const narrator = new Narrator();