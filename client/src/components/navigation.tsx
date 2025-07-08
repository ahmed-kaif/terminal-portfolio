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

  return (
    <div className="mb-8">
      <div className="text-catppuccin-subtext1 text-sm mb-4">
        Available commands:{" "}
        {sections.map((section, index) => (
          <span key={section}>
            <span
              className="text-catppuccin-blue cursor-pointer hover:text-catppuccin-lavender transition-colors"
              onClick={() => handleSectionClick(section)}
            >
              {section}
            </span>
            {index < sections.length - 1 && " | "}
          </span>
        ))}
      </div>
    </div>
  );
}
