import { useState } from "react";
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

        {/* Terminal Prompt */}
        <div className="mt-12 flex items-center">
          <span className="text-catppuccin-green mr-2">portfolio@terminal:~$</span>
          <span className="terminal-cursor"></span>
        </div>
      </div>
    </div>
  );
}
