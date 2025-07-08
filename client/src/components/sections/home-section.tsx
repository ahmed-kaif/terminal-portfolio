import { useEffect, useState } from "react";
import TypingText from "../ui/typing-text";
import AsciiArt from "../ui/ascii-art";

export default function HomeSection() {
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const asciiArt = `     ██╗ ██████╗ ██╗  ██╗███╗   ██╗    ██████╗  ██████╗ ███████╗
     ██║██╔═══██╗██║  ██║████╗  ██║    ██╔══██╗██╔═══██╗██╔════╝
     ██║██║   ██║███████║██╔██╗ ██║    ██║  ██║██║   ██║█████╗  
██   ██║██║   ██║██╔══██║██║╚██╗██║    ██║  ██║██║   ██║██╔══╝  
╚█████╔╝╚██████╔╝██║  ██║██║ ╚████║    ██████╔╝╚██████╔╝███████╗
 ╚════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═════╝  ╚═════╝ ╚══════╝`;

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ ./welcome.sh</div>
      </div>
      
      <div className="mb-8">
        <AsciiArt art={asciiArt} className="text-catppuccin-blue" />
      </div>

      <div className="space-y-4 text-lg">
        <div className="flex items-start">
          <span className="text-catppuccin-green mr-2">{'>'}</span>
          <TypingText text="Welcome to my terminal portfolio!" />
        </div>
        <div className="flex items-start animate-slideUp" style={{ animationDelay: '2s', animationFillMode: 'both' }}>
          <span className="text-catppuccin-green mr-2">{'>'}</span>
          <span>I'm a <span className="text-catppuccin-blue">Full Stack Developer</span> passionate about creating amazing digital experiences.</span>
        </div>
        <div className="flex items-start animate-slideUp" style={{ animationDelay: '3s', animationFillMode: 'both' }}>
          <span className="text-catppuccin-green mr-2">{'>'}</span>
          <span>Navigate through my portfolio using the commands above or scroll to explore.</span>
        </div>
      </div>

      {showStats && (
        <div className="mt-8 p-4 bg-catppuccin-surface0 rounded border border-catppuccin-surface1 animate-slideUp">
          <div className="text-catppuccin-yellow">⚡ Quick Stats:</div>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-catppuccin-blue">Years Coding:</span> 5+</div>
            <div><span className="text-catppuccin-blue">Projects Built:</span> 50+</div>
            <div><span className="text-catppuccin-blue">Technologies:</span> 15+</div>
          </div>
        </div>
      )}
    </section>
  );
}
