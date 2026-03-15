import { ExternalLink, Award, Calendar, Building2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import snaImg from "@/assets/social-network-analysis.png"
import frontendImg from "@/assets/intro-frontend.png"
import dsaImg from "@/assets/data-structures.png"

const Certifications = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      title: "Data Structures & Algorithms",
      image: dsaImg,
      issuer: "CipherSchools",
      date: "July 2025",
      description: "Hands-on offline training in Data Structures & Algorithms at Lovely Professional University, conducted by CipherSchools. Certificate ID: CS2025-14731.",
      skills: ["DSA", "Problem Solving", "Algorithms", "Data Structures"],
      link: "https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_mohd.ksr2003%40gmail.com_CS2025-14731",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      issuerColor: "text-purple-500",
    },
    {
      title: "Social Network Analysis",
      image: snaImg,
      issuer: "NPTEL – IIT Madras",
      date: "Jul–Oct 2025",
      description: "Elite certification from IIT Madras on analysing social networks, graph structures, community detection, and influence propagation. Scored 75% with a 12-week proctored course.",
      skills: ["Graph Theory", "Network Analysis", "Data Science", "Python"],
      link: "https://drive.google.com/file/d/1dxzwwF7rpzYlow_ZxRI2SyAS2BZ5PFL7/view?usp=drive_link",
      color: "text-success",
      bgColor: "bg-success/10",
      issuerColor: "text-success",
    },
    {
      title: "Introduction to Front-End Development",
      image: frontendImg,
      issuer: "Meta – Coursera",
      date: "Nov 2025",
      description: "Meta-authorized course covering front-end development fundamentals including HTML, CSS, UI frameworks, and React basics. Offered through Coursera.",
      skills: ["HTML", "CSS", "React", "UI Frameworks"],
      link: "https://coursera.org/verify/WXWLO7MI73YT",
      color: "text-primary",
      bgColor: "bg-primary/10",
      issuerColor: "text-primary",
    },
  ];

  return (
    <section id="certifications" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Certifications
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learning never stops — here's the proof
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="card-project h-full flex flex-col"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 ${cert.bgColor} rounded-xl`}>
                  <Award className={`h-6 w-6 ${cert.color}`} />
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                  Certified
                </div>
              </div>

              <div className="flex-1" style={{ perspective: '1000px' }}>
                <div
                  className="relative transition-transform duration-700"
                  style={{ transformStyle: 'preserve-3d', height: '280px' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'rotateY(180deg)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'rotateY(0deg)')}
                >
                  <div className="absolute inset-0 overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                    <div className="w-full h-32 rounded-xl mb-4 overflow-hidden">
                      <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-base font-heading font-semibold mb-2 text-foreground line-clamp-2">{cert.title}</h3>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className={`text-sm font-medium ${cert.issuerColor}`}>{cert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{cert.date}</span>
                    </div>
                  </div>

                  <div
                    className="absolute inset-0 rounded-xl overflow-hidden flex flex-col justify-between p-4"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(135deg, hsl(var(--primary)/0.08), hsl(var(--accent)/0.12))',
                      border: '1px solid hsl(var(--primary)/0.15)',
                    }}
                  >
                    <div>
                      <h3 className="text-sm font-heading font-bold text-foreground mb-2 line-clamp-2">{cert.title}</h3>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-4">{cert.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {cert.skills.map((skill, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gradient-primary text-white text-xs rounded-full font-medium">{skill}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Building2 className="h-3 w-3" />
                      <span className={`font-semibold ${cert.issuerColor}`}>{cert.issuer}</span>
                      <span>·</span>
                      <Calendar className="h-3 w-3" />
                      <span>{cert.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => window.open(cert.link, '_blank')}
                  variant="outline"
                  size="sm"
                  className="w-full group hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing 3 of <span className="font-semibold text-foreground">25 certifications</span>
          </p>
          <Button
            onClick={() => navigate('/certifications')}
            className="btn-hero px-8"
          >
            <Award className="h-4 w-4 mr-2" />
            View All Certificates
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Certifications;