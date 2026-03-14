import { Code, Brain, Palette, Settings, Database, Globe } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      color: "text-primary",
      bgColor: "bg-primary/10",
      skills: ["C++", "Python", "Java", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "AI & Machine Learning",
      icon: Brain,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      skills: ["Time Series Forecasting", "Data Analysis", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "PyTorch"]
    },
    {
      title: "Web Development",
      icon: Globe,
      color: "text-accent",
      bgColor: "bg-accent/10",
      skills: ["React", "Node", "Flutter", "Streamlit", "Gradio", "Responsive Design", "UI/UX"]
    },
    {
      title: "Tools & Platforms",
      icon: Settings,
      color: "text-success",
      bgColor: "bg-success/10",
      skills: ["GitHub", "Jupyter", "VS Code,", "Hugging Face", "OpenAI", "Anaconda"]
    },
    {
      title: "AI Services",
      icon: Database,
      color: "text-warning",
      bgColor: "bg-warning/10",
      skills: ["OpenAI API", "DeepSeek", "Gemini", "Chatbot Development", "AI Integration"]
    },
    {
      title: "Specializations",
      icon: Palette,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      skills: ["Machine Learning", "Optimization Models", "Education Tech", "Automation", "Data Visualization"]
    }
  ];

  const interests = [
    "AI-powered Applications",
    "Optimization Models", 
    "Education-focused Solutions",
    "Open Source Contribution",
    "Real-world Problem Solving"
  ];

  return (
    <section id="skills" className="section-padding bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building innovative solutions
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={index}
                className="card-gradient group hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${category.color}`} />
                </div>
                
                <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
                  {category.title}
                </h3>
                
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                    >
                      <span className="text-sm font-medium text-foreground">{skill}</span>
                      <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Special Interests */}
        <div className="text-center">
          <h3 className="text-2xl font-heading font-semibold mb-8 text-gradient-accent">
            Special Interests
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {interests.map((interest, index) => (
              <div 
                key={index}
                className="px-6 py-3 bg-gradient-primary text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-default animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {interest}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Progress Visualization */}
        <div className="mt-16 card-gradient">
          <h3 className="text-2xl font-heading font-semibold mb-8 text-center text-gradient-accent">
            Proficiency Overview
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">Programming & Development</h4>
              <div className="space-y-4">
                {[
                  { skill: "Python", level: 90 },
                  { skill: "C++", level: 85 },
                  { skill: "JavaScript", level: 89 },
                  { skill: "Web Development", level: 88 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{item.skill}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-foreground">AI & Machine Learning</h4>
              <div className="space-y-4">
                {[
                  { skill: "ML Algorithms", level: 82 },
                  { skill: "AI Integration", level: 88 },
                  { skill: "Data Analysis", level: 85 },
                  { skill: "Chatbot Development", level: 90 }
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-foreground">{item.skill}</span>
                      <span className="text-muted-foreground">{item.level}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-accent h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${item.level}%`, animationDelay: `${index * 200}ms` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;