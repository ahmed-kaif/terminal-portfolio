import type { Section } from "./terminal-window";

interface NavigationProps {
  currentSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function Navigation({ currentSection, onSectionChange }: NavigationProps) {
  const sections: Section[] = ["home", "about", "projects", "skills", "contact"];

  const handleSectionClick = (section: Section) => {
    onSectionChange(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getShortcutKey = (index: number) => {
    return `Ctrl+${index + 1}`;
  };

  return (
    <div className="mb-8">
      <div className="text-catppuccin-subtext1 text-sm mb-4">
        Quick navigation:{" "}
        {sections.map((section, index) => (
          <span key={section}>
            <span
              className={`cursor-pointer transition-colors ${
                currentSection === section 
                  ? 'text-catppuccin-green font-semibold' 
                  : 'text-catppuccin-blue hover:text-catppuccin-lavender'
              }`}
              onClick={() => handleSectionClick(section)}
              title={`Click or press ${getShortcutKey(index)}`}
            >
              {section}
            </span>
            {index < sections.length - 1 && " | "}
          </span>
        ))}
      </div>
      
      <div className="text-catppuccin-overlay0 text-xs mb-2">
        💡 Type commands below or use keyboard shortcuts (Ctrl+1-5) • Start typing for command input
      </div>
    </div>
  );
}
