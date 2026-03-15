import { Github, Linkedin, Mail, Heart, ArrowUp, Code, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/mohd-ksr',
      color: 'hover:text-accent'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/mo-kausar',
      color: 'hover:text-secondary'
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:mohd.ksr2003@gmail.com',
      color: 'hover:text-primary'
    },
    {
      name: 'Email',
      icon: Code,
      href: 'https://leetcode.com/u/Mo_Kausar/',
      color: 'hover:text-secondary'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/mohd.ksr',
      color: 'hover:text-accent'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // <section id="home" className="min-h-screen flex items-center justify-center bg-white/50 section-padding"></section>
    <footer className="bg-gradient-to-br from-card to-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="text-3xl font-heading font-bold text-gradient-primary mb-4">
                Mo Kausar
              </div>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                Passionate about turning ideas into practical solutions through AI, Machine Learning, 
                and Web Development. Always excited to work on innovative projects.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 bg-muted/20 rounded-xl text-muted-foreground ${social.color} transition-all duration-300 hover:scale-110 hover:bg-muted/30`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'About', href: '#about' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Portfolio', href: '#portfolio' },
                  { name: 'Certifications', href: '#certifications' },
                  { name: 'Contact', href: '#contact' }
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300 animated-underline"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-3">
                {[
                  'Web Development',
                  'AI/ML Solutions',
                  'Chatbot Development',
                  'Automation Tools'
                ].map((service, index) => (
                  <li key={index}>
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/30 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>© {currentYear} Mo Kausar. Made with lots of coffee.</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Back to top</span>
              <Button
                onClick={scrollToTop}
                size="sm"
                variant="outline"
                className="rounded-full w-10 h-10 p-0 hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tech Stack Credits */}
        <div className="border-t border-border/20 py-4">
          <div className="text-center text-sm text-muted-foreground">
            <p>Built with React, TypeScript, Tailwind CSS, and deployed with Netlify</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;