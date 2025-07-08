import { useState } from "react";
import { Mail, Linkedin, Github, Twitter, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send the message
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    // Clear form
    setFormData({ name: "", email: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactLinks = [
    { icon: Mail, label: "john@example.com", href: "mailto:john@example.com" },
    { icon: Linkedin, label: "linkedin.com/in/johndoe", href: "https://linkedin.com/in/johndoe" },
    { icon: Github, label: "github.com/johndoe", href: "https://github.com/johndoe" },
    { icon: Twitter, label: "twitter.com/johndoe", href: "https://twitter.com/johndoe" }
  ];

  return (
    <section>
      <div className="mb-6">
        <div className="text-catppuccin-green">$ cat contact.info</div>
      </div>

      <div className="space-y-6">
        <div className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0">
          <h2 className="text-xl text-catppuccin-blue mb-6"># Get In Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-catppuccin-yellow mb-4">## Contact Information</h3>
              <div className="space-y-3">
                {contactLinks.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <link.icon className="text-catppuccin-green mr-3" size={16} />
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-catppuccin-blue hover:text-catppuccin-lavender transition-colors"
                    >
                      {link.label}
                    </a>
                  </div>
                ))}
                <div className="flex items-center">
                  <MapPin className="text-catppuccin-green mr-3" size={16} />
                  <span className="text-catppuccin-subtext1">San Francisco, CA</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-catppuccin-yellow mb-4">## Quick Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-catppuccin-surface1 border-catppuccin-surface2 text-catppuccin-text focus:border-catppuccin-blue"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-catppuccin-surface1 border-catppuccin-surface2 text-catppuccin-text focus:border-catppuccin-blue"
                />
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-catppuccin-surface1 border-catppuccin-surface2 text-catppuccin-text focus:border-catppuccin-blue resize-none"
                />
                <Button 
                  type="submit"
                  className="w-full bg-catppuccin-blue hover:bg-catppuccin-lavender text-catppuccin-base font-medium"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="border border-catppuccin-surface1 rounded p-6 bg-catppuccin-surface0">
          <h3 className="text-catppuccin-blue mb-4">## Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-catppuccin-green rounded-full mr-2 animate-pulse"></div>
              <span>Available for new opportunities</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-catppuccin-blue rounded-full mr-2"></div>
              <span>PST (UTC-8)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-catppuccin-yellow rounded-full mr-2"></div>
              <span>Usually responds within 24h</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
