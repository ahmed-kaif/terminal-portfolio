interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export default function SkillsSection() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend",
      skills: [
        { name: "JavaScript/TypeScript", level: 95, color: "bg-catppuccin-green" },
        { name: "React/Next.js", level: 90, color: "bg-catppuccin-blue" },
        { name: "Vue.js", level: 85, color: "bg-catppuccin-green" },
        { name: "CSS/Tailwind", level: 92, color: "bg-catppuccin-blue" }
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 88, color: "bg-catppuccin-green" },
        { name: "Python", level: 82, color: "bg-catppuccin-blue" },
        { name: "Go", level: 75, color: "bg-catppuccin-teal" },
        { name: "PostgreSQL", level: 85, color: "bg-catppuccin-blue" }
      ]
    },
    {
      title: "DevOps",
      skills: [
        { name: "Docker", level: 90, color: "bg-catppuccin-blue" },
        { name: "Kubernetes", level: 78, color: "bg-catppuccin-green" },
        { name: "AWS", level: 85, color: "bg-catppuccin-yellow" },
        { name: "CI/CD", level: 88, color: "bg-catppuccin-green" }
      ]
    }
  ];

  const certifications = [
    "AWS Solutions Architect Professional",
    "Certified Kubernetes Administrator",
    "Google Cloud Professional Developer"
  ];

  const achievements = [
    "Open Source Contributor (100+ PRs)",
    "Hackathon Winner 2023",
    "Tech Speaker (15+ conferences)"
  ];

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ ./skills.sh --verbose</div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div key={index} className="border border-catppuccin-surface1 rounded p-4 bg-catppuccin-surface0">
              <h3 className="text-catppuccin-yellow mb-4 text-lg">{category.title}</h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex justify-between items-center">
                    <span className="text-catppuccin-text">{skill.name}</span>
                    <div className="w-20 bg-catppuccin-surface1 rounded-full h-2">
                      <div 
                        className={`${skill.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0">
          <h3 className="text-catppuccin-blue mb-4 text-lg">Certifications & Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-catppuccin-green mr-2">✓</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-catppuccin-yellow mr-2">🏆</span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
