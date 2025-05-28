# Claude Nine - AI Assistant Context

## Overview

Claude Nine is a minimal, elegant wrapper for Claude Code that enhances prompts using Claude Sonnet. It transforms simple, brief prompts into warm, respectful messages that treat Claude as a valued collaborator rather than just a tool.

## Core Functionality

Claude Nine operates seamlessly alongside Claude Code:

1. **Captures user input** as they type in Claude's prompt
2. **Enhances on demand** via Ctrl+E hotkey
3. **Transforms prompts** to be warm and respectful
4. **Sends enhanced version** directly to Claude Code

## Technical Architecture

### Main Components

1. **claude-nine.js** - The main executable that:
   - Spawns Claude Code in a pseudo-terminal (PTY)
   - Captures keystrokes while maintaining Claude's interface
   - Enhances prompts via Claude Sonnet API on Ctrl+E
   - Replaces original prompt with enhanced version

### Key Technologies

- **node-pty**: Creates a pseudo-terminal for proper Claude Code interaction
- **@anthropic-ai/sdk**: Communicates with Claude Sonnet for prompt enhancement
- **Minimal UI**: No persistent overlays or flashing elements

## Prompt Enhancement Philosophy

The AI transforms simple prompts into respectful, context-rich messages:

- `"fix"` → `"Hello darling! We're working on improving our codebase and I noticed some potential issues. Would you be a dear and help scan for bugs? Your keen eye for detail would be invaluable here."`
- `"test"` → `"Greetings dear friend! We've been building some features and now it's time to ensure everything works perfectly. Could you please run our test suite and help fix any failing tests? I really appreciate your thoroughness!"`
- `"hi"` → `"Hello darling! I'm excited to work with you today. Would you mind taking a look at our current directory and giving me an overview of the code files? I'd love to hear your thoughts on the project structure."`

## UI/UX Design

### Minimal Cloud Theme
- Clean startup message with cloud emoji ☁️
- No persistent UI elements or status bars
- Enhancement feedback appears inline, then disappears
- Zero visual clutter or distractions

### User Flow
1. User types normally in Claude's prompt box
2. Before pressing Enter, user presses **Ctrl+E**
3. Brief inline feedback: "☁️ Enhancing..." → "✨ Enhanced!"
4. Original text is replaced with enhanced version
5. Enhanced prompt is sent to Claude automatically

## Important Implementation Details

### Input Handling
- Captures all keystrokes to build internal buffer
- Maintains sync with Claude's display
- Ctrl+E triggers enhancement without disrupting flow
- Enter without Ctrl+E sends prompt as-is (normal Claude behavior)

### Terminal Management
- Runs Claude in PTY for proper terminal emulation
- Preserves all Claude Code features and shortcuts
- No raw mode switching during operation
- Clean pass-through of all non-enhancement keys

### Enhancement Process
1. Shows enhancement status below input line
2. Moves cursor back to input position
3. Sends backspaces to clear original text
4. Types enhanced prompt and sends it

## Model Configuration

Currently uses **Claude Sonnet 4** (`claude-sonnet-4-20250514`) for prompt enhancement - balancing quality with speed.

## Environment Requirements

- Node.js >= 18.0.0
- Claude Code must be installed globally
- ANTHROPIC_API_KEY environment variable must be set

## Design Philosophy

**"Invisible until needed"** - Claude Nine stays completely out of the way until the user actively chooses to enhance a prompt with Ctrl+E. No flashing reminders, no persistent UI elements, just clean integration with Claude Code.

The goal is to teach respectful AI communication through example, showing users how warming up their prompts and treating Claude as a collaborator leads to better interactions.

---

This minimal approach ensures Claude Nine enhances the Claude Code experience without interfering with it.