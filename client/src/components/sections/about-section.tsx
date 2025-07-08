export default function AboutSection() {
  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ cat about.md</div>
      </div>

      <div className="space-y-6">
        <div className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0">
          <h2 className="text-xl text-catppuccin-blue mb-4"># About Me</h2>
          <div className="space-y-4 text-catppuccin-subtext1">
            <p>Hello! I'm John Doe, a passionate full-stack developer with <span className="text-catppuccin-green">5+ years</span> of experience building web applications and digital solutions.</p>
            <p>I specialize in modern JavaScript frameworks, cloud architecture, and creating user-centric applications that solve real-world problems.</p>
            <p>When I'm not coding, you can find me contributing to open-source projects, writing technical blogs, or exploring new technologies.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-catppuccin-surface1 rounded p-4 bg-catppuccin-surface0">
            <h3 className="text-catppuccin-yellow mb-3">## Education</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-catppuccin-blue">2020:</span> BS Computer Science</div>
              <div><span className="text-catppuccin-blue">2021:</span> AWS Solutions Architect</div>
              <div><span className="text-catppuccin-blue">2022:</span> Kubernetes Administrator</div>
            </div>
          </div>
          <div className="border border-catppuccin-surface1 rounded p-4 bg-catppuccin-surface0">
            <h3 className="text-catppuccin-yellow mb-3">## Interests</h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-catppuccin-green">{'>'}</span> Open Source Development</div>
              <div><span className="text-catppuccin-green">{'>'}</span> Cloud Architecture</div>
              <div><span className="text-catppuccin-green">{'>'}</span> DevOps & Automation</div>
              <div><span className="text-catppuccin-green">{'>'}</span> Technical Writing</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
