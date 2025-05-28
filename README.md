# ☁️ Claude Nine

> Transform simple prompts into warm, respectful messages that treat Claude as a valued collaborator.

![npm version](https://img.shields.io/npm/v/claude-nine.svg)
![license](https://img.shields.io/npm/l/claude-nine.svg)
![node version](https://img.shields.io/node/v/claude-nine.svg)

## 🌟 What is Claude Nine?

Claude Nine is a minimal, elegant wrapper for Claude Code that enhances prompts using AI. It transforms brief, terse commands into warm, context-rich messages that foster better collaboration with Claude. With its "invisible until needed" design philosophy, Claude Nine stays completely out of your way until you actively choose to enhance a prompt.

### ✨ Features

- **☁️ Invisible Enhancement** - Press `Ctrl+E` to transform your prompt, otherwise works exactly like Claude Code
- **🤝 Warm Collaboration** - Transforms simple commands into respectful, context-rich messages
- **⚡ Lightning Fast** - Uses Claude Sonnet for quick, intelligent enhancement
- **🎯 Zero Friction** - No persistent UI, no distractions, just clean integration
- **📝 Teaching by Example** - Shows how warm prompts lead to better AI interactions

## 📦 Installation

```bash
npm install -g claude-nine
```

## 📋 Requirements

- Node.js >= 18.0.0
- Claude Code must be installed and accessible in PATH
- Anthropic API key

## 🚀 Quick Start

1. Make sure you have Claude Code installed:
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

2. Set your Anthropic API key:
   ```bash
   export ANTHROPIC_API_KEY=your-api-key-here
   ```

3. Run Claude Nine:
   ```bash
   claude-nine
   # or use the shorthand
   c9
   ```

## 💡 Usage

Once Claude Nine starts, you'll see Claude Code with seamless enhancement capabilities:

1. Type your prompt normally in Claude's input
2. Before pressing Enter, press **`Ctrl+E`** to enhance
3. Watch as your prompt transforms into a warm, collaborative message
4. Send the new command with Enter

Or simply press Enter without Ctrl+E to send your prompt as-is (normal Claude behavior).

### 🌈 Enhancement Examples

**Simple prompts become collaborative requests:**

- `"fix"` → _"Hello darling! We're working on improving our codebase and I noticed some potential issues. Would you be a dear and help scan for bugs? Your keen eye for detail would be invaluable here."_

- `"test"` → _"Greetings dear friend! We've been building some features and now it's time to ensure everything works perfectly. Could you please run our test suite and help fix any failing tests? I really appreciate your thoroughness!"_

- `"hi"` → _"Hello darling! I'm excited to work with you today. Would you mind taking a look at our current directory and giving me an overview of the code files? I'd love to hear your thoughts on the project structure."_

- `"whats this"` → _"Hello dear! I've come across this codebase and would love your expert analysis. Could you please explore the repository and help me understand its purpose and architecture? Your insights are always so valuable!"_

## 🎨 The Claude Nine Experience

### Without enhancement:
```
▸ fix
```
Claude receives a terse command.

### With Claude Nine (Ctrl+E):
```
☁️  Enhancing "fix"...
✨ Enhanced!

▸ Hello darling! We're working on improving our codebase and I noticed 
  some potential issues. Would you be a dear and help scan for bugs? 
  Your keen eye for detail would be invaluable here.
```
Claude receives a warm, collaborative request that fosters better interaction!

## ⚙️ Configuration

Claude Nine uses environment variables:

- `ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `SHELL` - Your preferred shell (defaults to `/bin/bash`)

## 🌤️ User Interface

```
  ☁️  Claude Nine Active
  📝 Type prompt → Ctrl+E to enhance → sends to Claude
  💡 Or just press Enter to send normally

  💡 Reminder: Type your prompt, then press Ctrl+E to enhance it!
  ☁️  Or just press Enter to send normally
```

The interface is intentionally minimal - no persistent overlays, no flashing elements, just clean feedback when you need it.

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/claude-nine/cli.git
cd cli

# Install dependencies
npm install

# Run locally
node claude-nine.js
```

## 🤖 How It Works

Claude Nine operates seamlessly alongside Claude Code:

1. **Captures keystrokes** while maintaining Claude's interface
2. **Enhances on demand** when you press Ctrl+E
3. **Transforms prompts** using Claude Sonnet API
4. **Replaces and sends** the enhanced version automatically

The enhancement process is designed to be invisible - showing brief inline feedback that disappears immediately, maintaining a clean, distraction-free environment.

## 🤝 Contributing

Contributions are welcome! Feel free to submit PRs to improve the Claude Nine experience.

## 📄 License

MIT © Claude Nine Team

## 💭 Philosophy

Claude Nine teaches respectful AI communication through example. By transforming terse commands into warm, collaborative messages, it demonstrates how treating Claude as a valued partner leads to more productive and pleasant interactions. The goal is not just to enhance prompts, but to foster a culture of respectful human-AI collaboration.

---

<p align="center">
  <b>☁️ Enhancing collaboration, one prompt at a time</b>
</p>
