import { useState, useEffect, useRef, useCallback } from "react";
import TerminalHeader from "./terminal-header";
import Navigation from "./navigation";
import HomeSection from "./sections/home-section";
import AboutSection from "./sections/about-section";
import ProjectsSection from "./sections/projects-section";
import SkillsSection from "./sections/skills-section";
import ContactSection from "./sections/contact-section";

export type Section = "home" | "about" | "projects" | "skills" | "contact";

export default function TerminalWindow() {
  const [currentSection, setCurrentSection] = useState<Section>("home");
  const [command, setCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showHelp, setShowHelp] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Record<string, Section> = {
    home: "home",
    about: "about", 
    projects: "projects",
    skills: "skills",
    contact: "contact",
    ls: "home",
    cd: "home", 
    cat: "about",
    vim: "projects",
    top: "skills",
    mail: "contact",
  };

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === "clear") {
      setCommandHistory([]);
      return;
    }
    
    if (trimmedCmd === "help") {
      setShowHelp(!showHelp);
      setCommandHistory(prev => [...prev, cmd]);
      setCommand("");
      setHistoryIndex(-1);
      return;
    }

    if (commands[trimmedCmd]) {
      setCurrentSection(commands[trimmedCmd]);
      setCommandHistory(prev => [...prev, cmd]);
      setCommand("");
      setHistoryIndex(-1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (trimmedCmd !== "") {
      setCommandHistory(prev => [...prev, cmd]);
      setCommand("");
      setHistoryIndex(-1);
    }
  }, [commands, showHelp]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case "1":
          e.preventDefault();
          setCurrentSection("home");
          break;
        case "2":
          e.preventDefault();
          setCurrentSection("about");
          break;
        case "3":
          e.preventDefault();
          setCurrentSection("projects");
          break;
        case "4":
          e.preventDefault();
          setCurrentSection("skills");
          break;
        case "5":
          e.preventDefault();
          setCurrentSection("contact");
          break;
      }
    }

    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      inputRef.current?.focus();
    }
  }, []);

  const handleCommandKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
      const availableCommands = Object.keys(commands);
      const matches = availableCommands.filter(cmd => cmd.startsWith(command.toLowerCase()));
      if (matches.length === 1) {
        setCommand(matches[0]);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case "home":
        return <HomeSection />;
      case "about":
        return <AboutSection />;
      case "projects":
        return <ProjectsSection />;
      case "skills":
        return <SkillsSection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-catppuccin-base text-catppuccin-text">
      <TerminalHeader />
      
      <div className="flex-1 p-6 max-w-6xl mx-auto w-full">
        <Navigation currentSection={currentSection} onSectionChange={setCurrentSection} />
        
        <div className="section-visible">
          {renderSection()}
        </div>

        {/* Help Panel */}
        {showHelp && (
          <div className="mb-6 p-4 bg-catppuccin-surface0 border border-catppuccin-surface1 rounded help-panel">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-catppuccin-yellow mb-3 font-semibold">Available Commands:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">home</span>
                      <span className="text-catppuccin-subtext1 ml-2">Navigate to home section</span>
                    </div>
                    <div className="text-catppuccin-overlay0 text-xs ml-16">Aliases: ls, cd</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">about</span>
                      <span className="text-catppuccin-subtext1 ml-2">View about information</span>
                    </div>
                    <div className="text-catppuccin-overlay0 text-xs ml-16">Aliases: cat</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">projects</span>
                      <span className="text-catppuccin-subtext1 ml-2">List projects</span>
                    </div>
                    <div className="text-catppuccin-overlay0 text-xs ml-16">Aliases: vim</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">skills</span>
                      <span className="text-catppuccin-subtext1 ml-2">Show skills and certifications</span>
                    </div>
                    <div className="text-catppuccin-overlay0 text-xs ml-16">Aliases: top</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <span className="text-catppuccin-blue font-mono w-16">contact</span>
                      <span className="text-catppuccin-subtext1 ml-2">Contact information</span>
                    </div>
                    <div className="text-catppuccin-overlay0 text-xs ml-16">Aliases: mail</div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-blue font-mono w-16">clear</span>
                    <span className="text-catppuccin-subtext1 ml-2">Clear command history</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-blue font-mono w-16">help</span>
                    <span className="text-catppuccin-subtext1 ml-2">Show this help message</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-catppuccin-yellow mb-3 font-semibold">Keyboard Shortcuts:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Ctrl+1</span>
                    <span className="text-catppuccin-subtext1 ml-2">Go to Home</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Ctrl+2</span>
                    <span className="text-catppuccin-subtext1 ml-2">Go to About</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Ctrl+3</span>
                    <span className="text-catppuccin-subtext1 ml-2">Go to Projects</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Ctrl+4</span>
                    <span className="text-catppuccin-subtext1 ml-2">Go to Skills</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Ctrl+5</span>
                    <span className="text-catppuccin-subtext1 ml-2">Go to Contact</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">Tab</span>
                    <span className="text-catppuccin-subtext1 ml-2">Auto-complete command</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-catppuccin-green font-mono w-20 text-xs">↑/↓</span>
                    <span className="text-catppuccin-subtext1 ml-2">Command history</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terminal Command Input */}
        <div className="mt-12">
          <div className="flex items-center">
            <span className="text-catppuccin-green mr-2">portfolio@terminal:~$</span>
            <input
              ref={inputRef}
              id="command-input"
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleCommandKeyDown}
              className="command-input flex-1"
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
                onClick={() => setShowHelp(!showHelp)}
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
      </div>
    </div>
  );
}
