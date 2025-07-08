import { useState, useEffect, useCallback } from "react";
import type { Section } from "../components/terminal-window";

export function useCommand(onSectionChange: (section: Section) => void) {
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const commands: Record<string, Section> = {
    home: "home",
    about: "about",
    projects: "projects",
    skills: "skills",
    publications: "publications",
    contact: "contact",
    ls: "home", // alias for home
    cd: "home", // alias for home
    cat: "about", // alias for about
    vim: "projects", // alias for projects
    top: "skills", // alias for skills
    papers: "publications", // alias for publications
    research: "publications", // alias for publications
    mail: "contact", // alias for contact
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      // Clear functionality could be added here
      return;
    }
    
    if (trimmedCmd === "help") {
      // Help functionality could be added here
      return;
    }

    if (commands[trimmedCmd]) {
      onSectionChange(commands[trimmedCmd]);
      setCommandHistory(prev => [...prev, cmd]);
      setCommand("");
      setHistoryIndex(-1);
    } else if (trimmedCmd !== "") {
      // Invalid command - could show error message
      setCommandHistory(prev => [...prev, cmd]);
      setCommand("");
      setHistoryIndex(-1);
    }
  }, [onSectionChange, commands]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Handle global keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault();
          onSectionChange("home");
          break;
        case "2":
          e.preventDefault();
          onSectionChange("about");
          break;
        case "3":
          e.preventDefault();
          onSectionChange("projects");
          break;
        case "4":
          e.preventDefault();
          onSectionChange("skills");
          break;
        case "5":
          e.preventDefault();
          onSectionChange("publications");
          break;
        case "6":
          e.preventDefault();
          onSectionChange("contact");
          break;
      }
    }

    // Handle input focus when typing
    if (!isInputFocused && e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const commandInput = document.getElementById("command-input") as HTMLInputElement;
      if (commandInput) {
        commandInput.focus();
        setIsInputFocused(true);
      }
    }
  }, [onSectionChange, isInputFocused]);

  const handleCommandKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      executeCommand(command);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Auto-complete functionality could be added here
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(command.toLowerCase()));
      if (matches.length === 1) {
        setCommand(matches[0]);
      }
    }
  }, [command, commandHistory, historyIndex, executeCommand, commands]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return {
    command,
    setCommand,
    commandHistory,
    executeCommand,
    handleCommandKeyDown,
    setIsInputFocused,
    availableCommands: Object.keys(commands),
  };
}