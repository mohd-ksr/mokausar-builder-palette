import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/kausar.png';

const Hero = () => {
  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePortfolioClick = () => {
     window.open("https://drive.google.com/file/d/1fzNNVrCw7U0RE6FEUVeDEi6pQKCPdmak/view?usp=sharing", "_blank");
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white/50 section-padding">
      {/* <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-100 via-white to-sky-100"></div> */}
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold mb-4">
                <span className="text-gradient-primary">Mo Kausar</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4">
                AI | Machine Learning | Web Development | Competitive Programming
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                Turning ideas into practical solutions with AI, ML, and modern web applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                onClick={handlePortfolioClick}
                className="btn-hero group"
              >
                View Resume
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                onClick={handleContactClick}
                variant="outline"
                className="btn-hero-outline"
              >
                Contact Me
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-accent">10+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-accent">3+</div>
                <div className="text-sm text-muted-foreground">Years Learning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient-accent">B.Tech</div>
                <div className="text-sm text-muted-foreground">CSE (ML)</div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 scale-110 animate-pulse"></div>
              
              {/* Main image container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-gradient-primary p-1 bg-gradient-primary">
                <div className="w-full h-full rounded-full overflow-hidden bg-card">
                  <img
                    src={profileImage}
                    alt="Mo Kausar - AI & ML Developer"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-gradient-accent text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce">
                AI Enthusiast
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold animate-bounce delay-300">
                Problem Solver
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;