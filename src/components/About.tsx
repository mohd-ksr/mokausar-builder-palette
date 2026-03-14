import { GraduationCap, MapPin, Calendar } from 'lucide-react';

const About = () => {
  const educationData = [
    {
      degree: "B.Tech in Computer Science (Machine Learning)",
      school: "Lovely Professional University",
      year: "Batch of 2027",
      status: "Currently Pursuing",
      description: "Specializing in Machine Learning, AI algorithms, and software development."
    },
    {
      degree: "Senior Secondary (12th)",
      school: "Jai Prakash Narayan Sr. Sec. School",
      year: "Completed",
      status: "Graduated",
      description: "Strong foundation in Mathematics and Science."
    }
  ];

  return (
    <section id="about" className="section-padding bg-white/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get to know the person behind the code
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Personal Bio */}
          <div className="animate-slide-in-left">
            <div className="card-gradient h-full">
              <h3 className="text-2xl font-heading font-semibold mb-6 text-gradient-accent">
                My Story
              </h3>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  I'm <strong className="text-primary">Mo Kausar</strong>, a passionate learner and builder in the fields of AI, machine learning, and web development. I enjoy turning ideas into practical solutions—whether that's optimizing processes with intelligent models, designing interactive web applications, or exploring innovative technologies.
                </p>
                <p>
                  What drives me is the curiosity to solve real-world problems and create meaningful impact through technology. From developing chatbots that provide career guidance to building optimization models that minimize food waste, I'm always looking for ways to make technology work for people.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new AI tools, contributing to open-source projects, or learning about the latest developments in machine learning. I believe in continuous learning and sharing knowledge with the community.
                </p>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>India</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>Available for contributions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="animate-slide-in-right">
            <h3 className="text-2xl font-heading font-semibold mb-8 text-gradient-accent">
              Education Journey
            </h3>
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <div 
                  key={index}
                  className="card-gradient relative pl-8 border-l-4 border-primary ml-4"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-6 w-6 h-6 bg-primary rounded-full border-4 border-background animate-pulse"></div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-foreground">
                        {edu.degree}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{edu.school}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      edu.status === 'Currently Pursuing' 
                        ? 'bg-gradient-accent text-white' 
                        : 'bg-gradient-primary text-white'
                    }`}>
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Achievement Badges */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-primary text-white p-4 rounded-xl text-center">
                <div className="text-2xl font-bold">3.5+</div>
                <div className="text-sm opacity-90">Years of Learning</div>
              </div>
              <div className="bg-gradient-accent text-white p-4 rounded-xl text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm opacity-90">Passion for Tech</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;