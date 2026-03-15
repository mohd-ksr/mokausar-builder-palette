import { ExternalLink, Github, Eye, Star, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from "@/assets/game-logo.png";
import trackerImg from "@/assets/website-time-tracker.png"
import foodImg from "@/assets/food-donation.jpeg"
import chatbotImg from "@/assets/chat-bot.png"
import preorderImg from "@/assets/preorder-food.png"
import resqnetImg from "@/assets/resqnet.png"
import snakeImg from "@/assets/snake-game.png"
const Portfolio = () => {
  const projects = [
    {
      title: "Website Activity Tracker Extension",
      link: "https://github.com/mohd-ksr/web-time-tracker",
      image: trackerImg,
      description: "Browser extension that tracks time spent on websites and visualizes usage through interactive pie charts with CSV export functionality.",
      tech: ["JavaScript", "HTML/CSS", "Chrome Extension API", "Chart.js"],
      category: "Browser Extension",
      status: "Completed",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Website Time Tracking",
        "Pie Chart Visualization",
        "CSV Data Export",
        "Automatic Daily Reports"
      ]
    },
    {
      title: "Food Distribution Optimization (ML)",
      link: "https://github.com/mohd-ksr/food-demand-predictor",
      image: foodImg,
      description: "Machine learning model for predicting food demand to minimize waste and optimize distribution logistics.",
      tech: ["Python", "Machine Learning", "Data Analysis", "Optimization"],
      category: "AI/ML",
      status: "Live",
      liveLink: "https://huggingface.co/spaces/mohd-ksr/food-demand-predictor",
      color: "text-success",
      bgColor: "bg-success/10",
      features: ["Demand Prediction", "Waste Reduction", "Data Visualization", "ML Algorithms"]
    },
    {
      title: "Career Chatbot (Oracle Career Pathway)",
      link: "https://github.com/mohd-ksr/CareerMate-chatbot",
      image: chatbotImg,
      description: "Intelligent career guidance assistant providing personalized recommendations and pathway suggestions.",
      tech: ["Chatbot Development", "AI", "Natural Language Processing", "Career Guidance"],
      category: "AI/Chatbot",
      status: "Live",
      liveLink: "https://careermate-chatbot-gmkgqomcfeh5zkqu3huxue.streamlit.app/",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      features: ["Personalized Guidance", "AI-Powered", "Career Pathways", "Interactive Interface"]
    },
    {
      title: "Smart Food Pre-Ordering System",
      link: "https://github.com/mohd-ksr/pre-food-order",
      image: preorderImg,
      description: "Full-stack food pre-ordering platform that allows students to order meals in advance using time slots, reducing queues and enabling admins to manage demand efficiently.",
      tech: ["FastAPI", "PostgreSQL", "React", "JWT Auth", "SQLAlchemy"],
      category: "Full Stack Application",
      status: "Live",
      liveLink: "https://pre-food-order.netlify.app/",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "JWT Authentication",
        "Time-Slot Based Ordering",
        "Bill-Style Order Summary",
        "Admin Order Management"
      ]
    },
    {
      title: "ResQNet – Disaster Management & Volunteer Coordination Platform",
      link: "https://github.com/mohd-ksr/resqnet",
      image: resqnetImg,
      description: "Full-stack MERN platform for real-time disaster response that connects victims, volunteers, and authorities, enabling incident reporting, geolocation tracking, and efficient task coordination.",
      tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT Auth", "Framer Motion"],
      category: "AI Application",
      status: "Live",
      liveLink: "https://resqnet-frontend.netlify.app/",
      color: "text-primary",
      bgColor: "bg-primary/10",
      features: [
        "Role-Based Auth",
        "Geolocation Reporting",
        "Volunteer Verification",
        "Task Assignment"
      ]
    },
    {
      title: "Snake Game (Desktop Application)",
      link: "https://github.com/mohd-ksr/snake-game",
      image: snakeImg,
      description: "Classic Snake game reimagined with modern styling, high-score tracking, and enhanced user interface.",
      tech: ["Game Development", "JavaScript", "UI/UX", "Local Storage"],
      category: "Game Development",
      status: "Completed",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      features: ["High Score System", "Modern UI", "Smooth Animations", "Local Storage"]
    }
  ];

  const categories = ["All", "Web Development", "AI/ML", "AI/Chatbot", "AI Application", "Automation", "Game Development"];

  const handleViewProject = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section id="portfolio" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A showcase of innovative projects solving real-world problems
          </p>
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">10+</div>
            <div className="text-sm text-muted-foreground">Projects Built</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">3</div>
            <div className="text-sm text-muted-foreground">AI/ML Solutions</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-primary mb-2">5+</div>
            <div className="text-sm text-muted-foreground">Technologies Used</div>
          </div>
          <div className="card-gradient text-center">
            <div className="text-3xl font-bold text-gradient-accent mb-2">∞</div>
            <div className="text-sm text-muted-foreground">Learning Mindset</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="card-project h-full flex flex-col hover:scale-[1.03] transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >

              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${project.bgColor} rounded-xl`}>
                  <Code className={`h-6 w-6 ${project.color}`} />
                </div>
                <div className="flex gap-2">
                  {project.status === 'Live' ? (
                    <button
                      onClick={() => handleViewProject(project.liveLink)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-success text-white hover:bg-success/80 transition-all duration-300 flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Live
                    </button>
                  ) : (
                    <div className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                      {project.status}
                    </div>
                  )}
                </div>
              </div>




              {/* Project Info - Flip Card */}
              <div className="p-2 flex-1" style={{ perspective: '1000px' }}>
                <div
                  className="relative transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    height: '280px',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(0deg)')}
                >
                  {/* FRONT SIDE - Project Theme Image */}
                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <div>
                        <span className="text-white font-bold text-base block">{project.title}</span>
                        <span className="text-white/70 text-xs">{project.category}</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE - Project Info */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <h3 className="text-lg font-heading font-semibold mb-2 text-foreground transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground mb-3 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-gradient-primary text-white text-xs rounded-full font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>




              {/* Project Actions */}
              <div className="flex gap-3 mt-auto">
                <Button
                  onClick={() => handleViewProject(project.link)}
                  variant="outline"
                  size="sm"
                  className="flex-1 group hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button
                  onClick={() => handleViewProject(project.link)}
                  variant="outline"
                  size="sm"
                  className="group hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Project Spotlight */}
        <div className="mt-20">
          <h3 className="text-2xl font-heading font-semibold text-center mb-12 text-gradient-accent">
            Featured Project Spotlight
          </h3>

          <div className="card-gradient lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-2 bg-accent/10 rounded-2xl flex items-center justify-center">
                  <img
                    src={logo}
                    alt="Word Battle Logo"
                    className="h-20 w-20 rounded-2xl object-contain hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-foreground">Word Battle</h4>
                  <p className="text-muted-foreground">Real-Time Multiplayer Word Game</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Word Battle is a real-time multiplayer word strategy game where players compete to create valid
                English words on a shared grid. The game features turn-based gameplay, a life system, animated
                leaderboard ranking, and live chat. Built using WebSockets with Socket.IO to ensure instant
                synchronization between all connected players.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-warning" />
                  <span className="text-foreground">Real-time multiplayer gameplay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <span className="text-foreground">WebSocket-based live synchronization</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-primary" />
                  <span className="text-foreground">Custom Node.js game engine</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  className="btn-hero"
                  onClick={() => window.open("https://wordxbattle.netlify.app/", "_blank")}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Play Now
                </Button>

                <Button
                  variant="outline"
                  className="btn-hero-outline"
                  onClick={() => window.open("https://github.com/mohd-ksr/word-battle", "_blank")}
                >
                  <Github className="h-4 w-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="relative">
                <div className="bg-gradient-accent rounded-2xl p-8 text-white">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-80">Turn Timer</span>
                      <span className="text-sm font-bold">40s ⏱️</span>
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full w-3/4"></div>
                    </div>

                    <div className="space-y-2 mt-6">
                      <div className="text-sm opacity-80">Game Highlights:</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">⚔️ Multiplayer word battles</div>
                        <div className="flex items-center gap-2 text-sm">🏆 Animated leaderboard</div>
                        <div className="flex items-center gap-2 text-sm">💬 Live in-game chat</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-warning text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                  Live Multiplayer Game
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;