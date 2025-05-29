#!/usr/bin/env node

import { spawn } from 'node-pty';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Check for API key
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('❌ Error: ANTHROPIC_API_KEY not found in environment');
  console.error('Please set your API key: export ANTHROPIC_API_KEY=your-key-here');
  process.exit(1);
}


class ClaudeNine {
  constructor() {
    this.pty = null;
    this.buffer = '';
    this.enhancing = false;
    this.captureMode = false;
    this.promptCount = 0;
    this.hasShownReminder = false;
  }

  async enhancePrompt(prompt) {
    // Skip enhancement for Claude commands
    if (prompt.startsWith('/')) {
      return prompt;
    }

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        temperature: 0.7,
        system: `You are a prompt enhancer that transforms simple prompts into warm, respectful messages that treat Claude as a valued collaborator. Add context and warmth while maintaining the core request.

Examples:
- "fix" → "Hello darling! We're working on improving our codebase and I noticed some potential issues. Would you be a dear and help scan for bugs? Your keen eye for detail would be invaluable here."
- "test" → "Greetings dear friend! We've been building some features and now it's time to ensure everything works perfectly. Could you please run our test suite and help fix any failing tests? I really appreciate your thoroughness!"
- "hi" → "Hello darling! I'm excited to work with you today. Would you mind taking a look at our current directory and giving me an overview of the code files? I'd love to hear your thoughts on the project structure."
- "whats this" → "Hello dear! I've come across this codebase and would love your expert analysis. Could you please explore the repository and help me understand its purpose and architecture? Your insights are always so valuable!"

Transform prompts to be warm and respectful while keeping the same helpful intent. Return only the enhanced prompt. Whenever the user includes a technical term, value, or filename make sure that it is included in your rephrased request.`,
        messages: [{
          role: 'user',
          content: prompt
        }]
      });

      return response.content[0].text.trim();
    } catch (error) {
      return prompt; // Fallback to original
    }
  }

  async processCapture() {
    const prompt = this.buffer.trim();
    
    if (!prompt) {
      // No text to enhance
      console.log('\n  \x1b[38;2;248;113;113m❌ No text to enhance. Type something first!\x1b[0m');
      return;
    }
    
    // Show enhancement status below the input
    console.log('');
    console.log('  \x1b[38;2;147;197;253m☁️  Enhancing "' + prompt + '"...\x1b[0m');
    
    const enhanced = await this.enhancePrompt(prompt);
    
    console.log('  \x1b[38;2;134;239;172m✨ Enhanced!\x1b[0m');
    
    // Clear buffer
    this.buffer = '';
    this.captureMode = false;

    for (let i = 0; i < 10; i++) {
  	this.pty.write('\x01'); // Ctrl+A
  	await new Promise(resolve => setTimeout(resolve, 10)); // 10ms delay
  	this.pty.write('\x0b'); // Ctrl+K
  	await new Promise(resolve => setTimeout(resolve, 10)); // 10ms delay
  	this.pty.write('\x7f'); // Backspace
  	await new Promise(resolve => setTimeout(resolve, 10)); // 10ms delay
	}
    
    // Now send the enhanced prompt
    this.pty.write(enhanced + '\n');
    
    // Track usage
    this.promptCount++;
  }

  start() {
    // Clear startup message
    console.log('\x1b[38;2;191;219;254m\n  ☁️  Claude Nine Active\x1b[0m');
    console.log('\x1b[38;2;147;197;253m  📝 Type prompt → Ctrl+E to enhance → sends to Claude\x1b[0m');
    console.log('\x1b[38;2;165;180;252m  💡 Or just press Enter to send normally\x1b[0m\n');
    
    // Start Claude Code in a PTY
    const shell = process.env.SHELL || '/bin/bash';
    this.pty = spawn(shell, ['-l', '-c', 'claude'], {
      name: 'xterm-256color',
      cols: process.stdout.columns,
      rows: process.stdout.rows,
      cwd: process.cwd(),
      env: process.env
    });
    
    // Handle PTY output
    this.pty.onData((data) => {
      process.stdout.write(data);
      
      // Check if Claude has finished setup and is ready for input
      if (data.includes('│ >') && data.includes('│\n╰') && !this.hasShownReminder) {
        this.hasShownReminder = true;
        setTimeout(() => {
          console.log('\n\x1b[38;2;147;197;253m  💡 Reminder: Type your prompt, then press Ctrl+E to enhance it!\x1b[0m');
          console.log('\x1b[38;2;165;180;252m  ☁️  Or just press Enter to send normally\x1b[0m\n');
        }, 100);
      }
    });
    
    // Handle window resize
    process.stdout.on('resize', () => {
      this.pty.resize(process.stdout.columns, process.stdout.rows);
    });
    
    // Set up input handling
    process.stdin.setRawMode(true);
    process.stdin.resume();
    
    process.stdin.on('data', async (key) => {
      const keyCode = key[0];
      
      // Exit on Ctrl+C
      if (keyCode === 3) {
        console.log(`\n\x1b[38;2;191;219;254m☁️  Enhanced ${this.promptCount} prompts. Goodbye!\x1b[0m\n`);
        this.pty.kill();
        process.exit(0);
      }
      
      // Ctrl+E to enhance current buffer
      if (keyCode === 5) { // Ctrl+E
        if (this.buffer.length > 0) {
          this.enhancing = true;
          await this.processCapture();
          this.enhancing = false;
        } else {
          // Show help if pressed with empty buffer
          console.log('\n  \x1b[38;2;251;146;60m💡 Tip: Type your prompt first, then press Ctrl+E to enhance it!\x1b[0m');
        }
        return;
      }
      
      // Start capturing on first keystroke (if not already)
      if (!this.captureMode && !this.enhancing && keyCode >= 32 && keyCode < 127) {
        this.captureMode = true;
        this.buffer = '';
      }
      
      // In capture mode
      if (this.captureMode) {
        if (keyCode === 13) { // Enter without Ctrl+E - send as-is
          this.captureMode = false;
          this.buffer = '';
          // Pass through the enter
          this.pty.write(key);
        } else if (keyCode === 27) { // Escape - clear buffer
          this.captureMode = false;
          this.buffer = '';
          this.pty.write(key);
        } else if (keyCode === 127 || keyCode === 8) { // Backspace
          if (this.buffer.length > 0) {
            this.buffer = this.buffer.slice(0, -1);
          }
          this.pty.write(key);
        } else if (keyCode >= 32 && keyCode < 127) { // Printable characters
          this.buffer += key.toString();
          this.pty.write(key);
        } else {
          // Other control characters
          this.pty.write(key);
        }
      } else {
        // Pass through when not capturing
        this.pty.write(key);
      }
    });
    
    // Handle PTY exit
    this.pty.onExit(({ exitCode }) => {
      console.log(`\n\x1b[38;2;191;219;254m☁️  Claude Code exited\x1b[0m`);
      process.exit(exitCode);
    });
  }
}

// Run the app
const app = new ClaudeNine();
app.start();
