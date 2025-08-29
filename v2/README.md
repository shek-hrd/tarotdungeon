# The Dragon's Nest - Tarot Dungeon Game

A mystical 3D multiplayer dungeon game where tarot cards dynamically reshape the environment. Explore procedurally generated rooms, learn tarot meanings through gameplay, and interact with other players in a shared mystical world.

## Features

- **3D Dungeon Exploration**: Immersive Three.js-powered 3D environments
- **Tarot Card System**: Complete 62-card deck with authentic meanings and effects
- **Dynamic Room Generation**: Rooms transform based on tarot card symbolism
- **English Grandma Narrator**: Educational voice guidance using Web Speech API
- **Multiplayer Support**: Real-time interaction with other players
- **Educational Gameplay**: Learn tarot meanings through exploration and discovery

## Quick Start

### Single Player Mode
1. Open `index.html` directly in your web browser
2. No server setup required - runs entirely in-browser
3. Use simulated multiplayer with AI players

### Multiplayer Mode
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open http://localhost:3000 in your browser
4. Share the URL with friends to play together

## Game Controls

- **WASD**: Move around
- **Mouse**: Look around
- **Click**: Interact with doors and objects
- **Space**: Draw a tarot card
- **Enter**: Open chat
- **ESC**: Toggle menu

## Tarot Card Effects

Each card dynamically transforms the dungeon based on its symbolic meaning:

- **The Fool**: Creates new pathways and opportunities
- **The Magician**: Adds magical artifacts and tools
- **The High Priestess**: Reveals hidden knowledge and secret passages
- **The Empress**: Creates lush gardens and natural spaces
- **The Emperor**: Builds grand throne rooms and structures
- **Death**: Transforms rooms into crypts and graveyards
- **The Tower**: Creates dramatic architectural changes
- **The Star**: Adds celestial lighting and mystical elements

## Technical Architecture

### Frontend
- **Three.js**: 3D graphics and scene management
- **Web Speech API**: Text-to-speech narration
- **WebGL**: Hardware-accelerated rendering
- **Socket.IO Client**: Real-time communication

### Backend
- **Node.js**: Server runtime
- **Express.js**: Web server framework
- **Socket.IO**: Real-time bidirectional communication
- **Procedural Generation**: Dynamic room creation

## File Structure

```
tarot-dungeon/
├── index.html              # Main game interface
├── css/
│   └── styles.css          # Game styling
├── js/
│   ├── game.js            # Main game controller
│   ├── tarot.js           # Tarot card system
│   ├── dungeon.js         # Room generation
│   ├── narrator.js        # Voice guidance system
│   ├── multiplayer.js     # Client multiplayer logic
│   └── three.min.js       # Three.js library
├── server.js              # Node.js multiplayer server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Development

### Prerequisites
- Node.js 14+ for multiplayer mode
- Modern web browser with WebGL support
- Internet connection for multiplayer features

### Running in Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Browser Compatibility
- Chrome 60+ (recommended)
- Firefox 55+
- Safari 11+
- Edge 79+

## Educational Value

The game teaches tarot through:
- **Contextual Learning**: Cards appear in meaningful situations
- **Symbolic Understanding**: Visual representations of card meanings
- **Interactive Discovery**: Players learn by exploring transformed spaces
- **Narrative Integration**: English grandma provides gentle guidance
- **Multiplayer Discussion**: Players share interpretations and insights

## Troubleshooting

### Web Speech API Issues
- Ensure browser has microphone permissions
- Check that speech synthesis is supported
- Try refreshing the page if narrator doesn't speak

### Multiplayer Connection Issues
- Ensure server is running on port 3000
- Check firewall settings
- Verify all players use the same server URL

### Performance Issues
- Lower graphics quality in settings
- Close other browser tabs
- Ensure WebGL is enabled in browser

## License

MIT License - Feel free to modify and distribute

## Credits

- **Tarot Meanings**: Based on traditional Rider-Waite interpretations
- **3D Models**: Procedurally generated using Three.js
- **Voice**: Web Speech API with system voices
- **Multiplayer**: Socket.IO for real-time communication

---

*Enter The Dragon's Nest and let the cards guide your destiny...*