import { Globe, Bot, Brain, Zap, Palette, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Development",
      description: "Responsive, user-friendly applications built with modern technologies and best practices.",
      features: ["React & JavaScript", "Responsive Design", "Modern UI/UX", "Performance Optimization"],
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20"
    },
    {
      icon: Bot,
      title: "Chatbot Development",
      description: "Intelligent bots with offline/CSV integration or API connectivity for enhanced user experience.",
      features: ["AI-Powered Responses", "Custom Training", "Multi-platform Support", "Analytics Dashboard"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20"
    },
    {
      icon: Brain,
      title: "AI & Machine Learning Solutions",
      description: "Forecasting, optimization, and predictive analytics to solve complex business problems.",
      features: ["Predictive Modeling", "Data Analysis", "Time Series Forecasting", "Optimization Algorithms"],
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderColor: "border-accent/20"
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Custom scripts for workflow automation and intelligent reporting systems.",
      features: ["Process Automation", "Report Generation", "Workflow Optimization", "Integration Solutions"],
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/20"
    },
    {
      icon: Palette,
      title: "UI/UX Enhancements",
      description: "Clean, modern, and engaging interfaces that provide exceptional user experiences.",
      features: ["Modern Design", "User Research", "Interactive Prototypes", "Accessibility Focus"],
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/20"
    }
  ];

  const handleContactClick = () => {
    const element = document.querySelector('#portfolio');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="section-padding bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="p-3 text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            What I’m Building & Exploring
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of technologies and domains where I actively build projects and deepen my expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className={`card-project ${service.borderColor} h-full`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${service.color}`} />
                </div>

                <h3 className="text-xl font-heading font-semibold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className={`w-2 h-2 ${service.bgColor} rounded-full`}></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    onClick={handleContactClick}
                    variant="outline"
                    className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Explore Projects
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Process Overview */}
        <div className="card-gradient">
          <h3 className="text-2xl font-heading font-semibold text-center mb-12 text-gradient-accent">
            My Development Process
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description: "Understanding your needs and defining project scope"
              },
              {
                step: "02",
                title: "Planning",
                description: "Creating detailed roadmap and technical architecture"
              },
              {
                step: "03",
                title: "Development",
                description: "Building solution with regular updates and feedback"
              },
              {
                step: "04",
                title: "Maintenance",
                description: "Ensuring stability with monitoring, updates, and ongoing improvements"
              }
            ].map((phase, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2 text-foreground">{phase.title}</h4>
                <p className="text-sm text-muted-foreground">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-heading font-semibold mb-4 text-foreground">
             Open to Collaboration & Opportunities
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            I'm always excited to collaborate with teams, contribute to impactful projects, and continue learning while building innovative solutions.
          </p>
          <Button
            onClick={handleContactClick}
            className="btn-hero"
          >
            Connect With Me
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;