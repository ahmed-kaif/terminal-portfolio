import { useState, useEffect, useRef } from "react";
import type { Section } from "./terminal-window";

interface CommandInputProps {
  currentSection: Section;
  commandHook: {
    command: string;
    setCommand: (cmd: string) => void;
    commandHistory: string[];
    executeCommand: (cmd: string) => void;
    handleCommandKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setIsInputFocused: (focused: boolean) => void;
    availableCommands: string[];
  };
}

export default function CommandInput({ currentSection, commandHook }: CommandInputProps) {
  const [showHelp, setShowHelp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { command, setCommand, handleCommandKeyDown, setIsInputFocused, availableCommands } = commandHook;

  useEffect(() => {
    // Auto-focus the input when component mounts
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  const commands = [
    { cmd: "home", desc: "Navigate to home section", alias: "ls, cd" },
    { cmd: "about", desc: "View about information", alias: "cat" },
    { cmd: "projects", desc: "List projects", alias: "vim" },
    { cmd: "skills", desc: "Show skills and certifications", alias: "top" },
    { cmd: "contact", desc: "Contact information", alias: "mail" },
    { cmd: "clear", desc: "Clear the terminal (coming soon)" },
    { cmd: "help", desc: "Show this help message" },
  ];

  const shortcuts = [
    { key: "Ctrl/Cmd + 1", desc: "Go to Home" },
    { key: "Ctrl/Cmd + 2", desc: "Go to About" },
    { key: "Ctrl/Cmd + 3", desc: "Go to Projects" },
    { key: "Ctrl/Cmd + 4", desc: "Go to Skills" },
    { key: "Ctrl/Cmd + 5", desc: "Go to Contact" },
    { key: "Tab", desc: "Auto-complete command" },
    { key: "↑/↓", desc: "Command history" },
  ];

  return (
    <div className="mt-12">
      {/* Help Panel */}
      {showHelp && (
        <div className="mb-6 p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-catppuccin-yellow mb-3 font-semibold">Available Commands:</h4>
              <div className="space-y-2 text-sm">
                {commands.map((cmd, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">{cmd.cmd}</span>
                      <span className="text-catppuccin-subtext1 ml-2">{cmd.desc}</span>
                    </div>
                    {cmd.alias && (
                      <div className="text-catppuccin-overlay0 text-xs ml-16">
                        Aliases: {cmd.alias}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-catppuccin-yellow mb-3 font-semibold">Keyboard Shortcuts:</h4>
              <div className="space-y-2 text-sm">
                {shortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">{shortcut.key}</span>
                    <span className="text-catppuccin-subtext1 ml-2">{shortcut.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Command Input */}
      <div className="flex items-center">
        <span className="text-catppuccin-green mr-2">portfolio@terminal:~$</span>
        <input
          ref={inputRef}
          id="command-input"
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleCommandKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="bg-transparent border-none outline-none text-catppuccin-text font-mono flex-1 caret-catppuccin-blue"
          placeholder="Type a command... (try 'help')"
          autoComplete="off"
          spellCheck={false}
        />
        <span className="terminal-cursor ml-1"></span>
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-xs text-catppuccin-overlay0">
        <div className="flex items-center space-x-4">
          <span>Current: <span className="text-catppuccin-blue">{currentSection}</span></span>
          <button
            onClick={toggleHelp}
            className="text-catppuccin-green hover:text-catppuccin-lavender transition-colors"
          >
            {showHelp ? 'Hide Help' : 'Show Help'}
          </button>
        </div>
        <div className="hidden md:block">
          <span>Tip: Start typing or use Ctrl+1-5 for quick navigation</span>
        </div>
      </div>
    </div>
  );
}