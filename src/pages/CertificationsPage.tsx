import React, { useEffect, useState } from 'react';
import { ExternalLink, Award, Calendar, Building2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const CertificationsPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "All",
    "AI & ML",
    "Web Development",
    "Networking",
    "Programming",
    "Soft Skills",
    "Specialization",
    "Participation",
  ];

  const allCertifications = [
    // ── AI & ML ──────────────────────────────────────
    {
      title: "Master Generative AI & Generative AI Tools (ChatGPT & more)",
      issuer: "Udemy",
      date: "Aug 2025",
      description: "Comprehensive course on Generative AI including ChatGPT, image generation, and modern AI tools. 14 total hours.",
      skills: ["Generative AI", "ChatGPT", "AI Tools", "Prompt Engineering"],
      link: "https://ude.my/UC-080daaa2-c2cd-4a56-a6b9-f8bf18d7e774",
      category: "AI & ML",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "U",
      issuerBg: "bg-primary",
    },
    {
      title: "ChatGPT Made Easy: AI Essentials for Beginners",
      issuer: "Udemy",
      date: "Aug 2025",
      description: "Practical introduction to using ChatGPT and AI tools effectively for everyday tasks. 37 total minutes.",
      skills: ["ChatGPT", "AI Basics", "Prompt Engineering"],
      link: "https://ude.my/UC-690d16b1-d8e9-49b1-a761-5ecff4ea06b6",
      category: "AI & ML",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "U",
      issuerBg: "bg-primary",
    },
    {
      title: "Build Generative AI Apps and Solutions with No-Code Tools",
      issuer: "Udemy",
      date: "Aug 2025",
      description: "Learn to build AI-powered apps using no-code tools and platforms. 5.5 total hours.",
      skills: ["No-Code AI", "Generative AI", "AI Apps"],
      link: "https://ude.my/UC-3031a165-ced7-42fa-97d0-1d37fcc936e6",
      category: "AI & ML",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "U",
      issuerBg: "bg-primary",
    },
    {
      title: "Python for Data Science",
      issuer: "Board Infinity",
      date: "Feb 2024",
      description: "Microlearning certification in Python for Data Science covering data manipulation, analysis, and visualization.",
      skills: ["Python", "Data Science", "Pandas", "Visualization"],
      link: "https://drive.google.com/file/d/1n6ve2mALZVEhaEkag4P76go56Lv7kGmq/view?usp=sharing",
      category: "AI & ML",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderTop: "border-t-accent",
      issuerColor: "text-accent",
      issuerInitial: "B",
      issuerBg: "bg-accent",
    },
    {
      title: "Social Network Analysis",
      issuer: "NPTEL – IIT Madras",
      date: "Jul–Oct 2025",
      description: "Elite NPTEL certification on social network analysis, graph structures, community detection, and influence propagation. Scored 75% in 12-week proctored course.",
      skills: ["Graph Theory", "Network Analysis", "Data Science", "Python"],
      link: "https://drive.google.com/file/d/1dxzwwF7rpzYlow_ZxRI2SyAS2BZ5PFL7/view?usp=drive_link",
      category: "AI & ML",
      color: "text-success",
      bgColor: "bg-success/10",
      borderTop: "border-t-success",
      issuerColor: "text-success",
      issuerInitial: "N",
      issuerBg: "bg-success",
    },

    // ── Web Development ───────────────────────────────
    {
      title: "Introduction to Front-End Development",
      issuer: "Meta – Coursera",
      date: "Nov 2025",
      description: "Meta-authorized course covering front-end development fundamentals including HTML, CSS, UI frameworks, and React basics.",
      skills: ["HTML", "CSS", "React", "UI Frameworks"],
      link: "https://coursera.org/verify/WXWLO7MI73YT",
      category: "Web Development",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "M",
      issuerBg: "bg-primary",
    },
    {
      title: "GfG 160 – 160 Days of Problem Solving",
      issuer: "GeeksforGeeks",
      date: "2025",
      description: "Completed the GfG 160-day intensive problem solving challenge, demonstrating dedication, consistency, and strong DSA skills.",
      skills: ["DSA", "Problem Solving", "Algorithms", "Consistency"],
      link: "https://www.geeksforgeeks.org/certificate/6422f086af9325595ff46f94074977da",
      category: "Web Development",
      color: "text-success",
      bgColor: "bg-success/10",
      borderTop: "border-t-success",
      issuerColor: "text-success",
      issuerInitial: "G",
      issuerBg: "bg-success",
    },

    // ── Programming ───────────────────────────────────
    {
      title: "Data Structures & Algorithms",
      issuer: "CipherSchools",
      date: "July 2025",
      description: "Hands-on offline training in DSA at Lovely Professional University. Certificate ID: CS2025-14731.",
      skills: ["DSA", "Problem Solving", "Algorithms", "Data Structures"],
      link: "https://cipher-other-assets.s3.ap-south-1.amazonaws.com/certificates/TC_mohd.ksr2003%40gmail.com_CS2025-14731",
      category: "Programming",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderTop: "border-t-purple-500",
      issuerColor: "text-purple-500",
      issuerInitial: "C",
      issuerBg: "bg-purple-500",
    },
    {
      title: "Java Programming (72 Hours)",
      issuer: "iamneo – LPU",
      date: "Jan–May 2025",
      description: "Completed 72-hour Java Programming course on iamneo platform through Lovely Professional University.",
      skills: ["Java", "OOP", "Programming", "LPU"],
      link: "https://drive.google.com/file/d/1hB5D_VFbLqWVZIDrWGt0mIL19Q9CbYpP/view?usp=sharing",
      category: "Programming",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderTop: "border-t-warning",
      issuerColor: "text-warning",
      issuerInitial: "i",
      issuerBg: "bg-warning",
    },
    {
      title: "Data Structures and Algorithm (72 Hours)",
      issuer: "iamneo – LPU",
      date: "Aug–Dec 2024",
      description: "Completed 72-hour Data Structures and Algorithm course on iamneo platform through Lovely Professional University.",
      skills: ["DSA", "Algorithms", "Data Structures", "LPU"],
      link: "https://drive.google.com/file/d/1t8agbTKh62ydJCy4MjExJguwwv-Pgnww/view?usp=sharing",
      category: "Programming",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderTop: "border-t-warning",
      issuerColor: "text-warning",
      issuerInitial: "i",
      issuerBg: "bg-warning",
    },
    {
      title: "Object Oriented Programming (72 Hours)",
      issuer: "iamneo – LPU",
      date: "Aug–Dec 2024",
      description: "Completed 72-hour Object Oriented Programming course on iamneo platform through Lovely Professional University.",
      skills: ["OOP", "Java", "Design Patterns", "LPU"],
      link: "https://drive.google.com/file/d/1BS5QSVCloRTzQKNa2rQge522JQdkB-wb/view?usp=sharing",
      category: "Programming",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderTop: "border-t-warning",
      issuerColor: "text-warning",
      issuerInitial: "i",
      issuerBg: "bg-warning",
    },
    {
      title: "Python in Hindi",
      issuer: "MindLuster",
      date: "Feb 2024",
      description: "Certificate of Achievement for completing a 27-hour Python programming course in Hindi. Certificate No. 13290169433.",
      skills: ["Python", "Programming", "Basics"],
      link: "https://www.mindluster.com/student/certificate/13290169433",
      category: "Programming",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderTop: "border-t-secondary",
      issuerColor: "text-secondary",
      issuerInitial: "ML",
      issuerBg: "bg-secondary",
    },
    {
      title: "Computational Theory: Language Principle & Finite Automata Theory",
      issuer: "Infosys Springboard",
      date: "Aug 2025",
      description: "Course from Infosys Springboard covering computational theory, language principles, and finite automata theory.",
      skills: ["Computational Theory", "Automata", "Formal Languages", "Theory of Computation"],
      link: "https://verify.onwingspan.com",
      category: "Programming",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "IS",
      issuerBg: "bg-primary",
    },

    // ── Specialization ────────────────────────────────
    {
      title: "Computer Communications Specialization",
      issuer: "University of Colorado – Coursera",
      date: "Nov 2024",
      description: "4-course specialization covering network fundamentals, P2P protocols, packet switching, and TCP/IP advanced topics.",
      skills: ["TCP/IP", "Networking", "Protocols", "Network Architecture"],
      link: "https://coursera.org/verify/specialization/QOITKOX7RE1T",
      category: "Specialization",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderTop: "border-t-accent",
      issuerColor: "text-accent",
      issuerInitial: "CU",
      issuerBg: "bg-accent",
    },

    // ── Networking ────────────────────────────────────
    {
      title: "The Bits and Bytes of Computer Networking",
      issuer: "Google – Coursera",
      date: "Sep 2024",
      description: "Google-authorized course covering computer networking fundamentals including TCP/IP, DNS, and network troubleshooting.",
      skills: ["Networking", "TCP/IP", "DNS", "Google IT"],
      link: "https://coursera.org/verify/01PN0EOEKB9H",
      category: "Networking",
      color: "text-success",
      bgColor: "bg-success/10",
      borderTop: "border-t-success",
      issuerColor: "text-success",
      issuerInitial: "G",
      issuerBg: "bg-success",
    },
    {
      title: "Fundamentals of Network Communication",
      issuer: "University of Colorado – Coursera",
      date: "Oct 2024",
      description: "Foundational networking course covering communication protocols, network layers, and data transmission concepts.",
      skills: ["Network Protocols", "OSI Model", "Data Transmission"],
      link: "https://coursera.org/verify/81PVVEU9RFFB",
      category: "Networking",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "CU",
      issuerBg: "bg-primary",
    },
    {
      title: "Introduction to Hardware and Operating Systems",
      issuer: "IBM – Coursera",
      date: "Sep 2024",
      description: "IBM-authorized course covering computer hardware components, operating systems, and system fundamentals.",
      skills: ["Hardware", "Operating Systems", "IBM", "Systems"],
      link: "https://coursera.org/verify/OAUMAGPBJD7T",
      category: "Networking",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderTop: "border-t-secondary",
      issuerColor: "text-secondary",
      issuerInitial: "IBM",
      issuerBg: "bg-secondary",
    },
    {
      title: "Digital Systems: From Logic Gates to Processors",
      issuer: "UAB – Coursera",
      date: "Sep 2024",
      description: "Course from Universitat Autònoma de Barcelona covering digital systems, logic gates, circuits, and processor design.",
      skills: ["Digital Systems", "Logic Gates", "Processors", "Hardware"],
      link: "https://coursera.org/verify/VJRPRUGM9SCC",
      category: "Networking",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderTop: "border-t-warning",
      issuerColor: "text-warning",
      issuerInitial: "UAB",
      issuerBg: "bg-warning",
    },
    {
      title: "Computer Architecture",
      issuer: "Princeton University – Coursera",
      date: "2025",
      description: "Princeton University course covering computer architecture, memory hierarchy, instruction sets, and performance optimization.",
      skills: ["Computer Architecture", "Memory Systems", "ISA", "Performance"],
      link: "#",
      category: "Networking",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "PU",
      issuerBg: "bg-primary",
    },

    // ── Soft Skills ───────────────────────────────────
    {
      title: "Critical Thinking Skills for the Professional",
      issuer: "UC Davis – Coursera",
      date: "Nov 2025",
      description: "University of California Davis course on professional critical thinking, problem analysis, and decision-making skills.",
      skills: ["Critical Thinking", "Problem Solving", "Decision Making"],
      link: "https://coursera.org/verify/1C540BPPWG84",
      category: "Soft Skills",
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderTop: "border-t-warning",
      issuerColor: "text-warning",
      issuerInitial: "UC",
      issuerBg: "bg-warning",
    },
    {
      title: "Delivering Quality Work with Agility",
      issuer: "IBM – Coursera",
      date: "Nov 2025",
      description: "IBM course on delivering high-quality work using agile methodologies, iterative development, and continuous improvement.",
      skills: ["Agile", "Quality Assurance", "IBM", "Work Management"],
      link: "https://coursera.org/verify/9WD73IXIGDX8",
      category: "Soft Skills",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderTop: "border-t-secondary",
      issuerColor: "text-secondary",
      issuerInitial: "IBM",
      issuerBg: "bg-secondary",
    },
    {
      title: "Communication in the 21st Century Workplace",
      issuer: "UC Irvine – Coursera",
      date: "Mar 2026",
      description: "University of California Irvine course on modern workplace communication strategies and professional collaboration.",
      skills: ["Communication", "Workplace Skills", "Professional Writing"],
      link: "https://coursera.org/verify/09XEEDN15WKU",
      category: "Soft Skills",
      color: "text-accent",
      bgColor: "bg-accent/10",
      borderTop: "border-t-accent",
      issuerColor: "text-accent",
      issuerInitial: "UCI",
      issuerBg: "bg-accent",
    },
    {
      title: "Word Forms and Simple Present Tense",
      issuer: "UC Irvine – Coursera",
      date: "May 2024",
      description: "English language course from UC Irvine covering word forms, grammar, and simple present tense for professional communication.",
      skills: ["English", "Grammar", "Communication", "Language"],
      link: "https://coursera.org/verify/2WPWBAWZJVFG",
      category: "Soft Skills",
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderTop: "border-t-primary",
      issuerColor: "text-primary",
      issuerInitial: "UCI",
      issuerBg: "bg-primary",
    },
    {
      title: "The English Master Course: Grammar & Speaking",
      issuer: "Udemy",
      date: "Apr 2024",
      description: "Comprehensive 43-hour English mastery course covering grammar, speaking, and professional communication skills.",
      skills: ["English Grammar", "Speaking", "Communication", "Language"],
      link: "https://ude.my/UC-defd4294-ac73-468a-a24e-9158d5a96136",
      category: "Soft Skills",
      color: "text-success",
      bgColor: "bg-success/10",
      borderTop: "border-t-success",
      issuerColor: "text-success",
      issuerInitial: "U",
      issuerBg: "bg-success",
    },

    // ── Participation ─────────────────────────────────
    {
      title: "Prototype Marathon: Gateway to AIU's Anveshan 2025-26",
      issuer: "LPU – Student Welfare Wing",
      date: "Nov 2025",
      description: "Certificate of Participation in the Prototype Marathon competition under Social Sciences category, organized by LPU's Department of Student Research and Project.",
      skills: ["Research", "Prototype", "Innovation", "Competition"],
      link: "https://drive.google.com/file/d/1-UTjCMR9oUzcLF9Q2muI4eGLze-1HIe_/view?usp=sharing",
      category: "Participation",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderTop: "border-t-purple-500",
      issuerColor: "text-purple-500",
      issuerInitial: "LPU",
      issuerBg: "bg-purple-500",
    },
  ];

  const filtered = activeCategory === "All"
    ? allCertifications
    : allCertifications.filter(c => c.category === activeCategory);

  return (
    <div className="min-h-screen bg-white/40">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="text-center mb-12">
          {/* <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </button> */}
          <h1 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            All Certificates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learning never stops — here's the proof
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{allCertifications.length} Certificates Earned</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? 'bg-gradient-primary text-white shadow-md scale-105'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-2 text-xs opacity-70">
                  ({allCertifications.filter(c => c.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-center text-sm text-muted-foreground mb-8">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> certificates
        </p>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((cert, index) => (
            <div
              key={index}
              className={`card-project h-full flex flex-col border-t-4 ${cert.borderTop} hover:scale-[1.02] transition-transform duration-300`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Issuer Badge + Category */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 ${cert.issuerBg} rounded-xl flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{cert.issuerInitial}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${cert.bgColor} ${cert.color}`}>
                  {cert.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-base font-heading font-semibold mb-2 text-foreground line-clamp-2">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className={`text-sm font-medium ${cert.issuerColor} line-clamp-1`}>{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{cert.date}</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-0.5 bg-gradient-primary text-white text-xs rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-4">
                <Button
                  onClick={() => cert.link !== '#' && window.open(cert.link, '_blank')}
                  variant="outline"
                  size="sm"
                  disabled={cert.link === '#'}
                  className="w-full group hover:bg-primary hover:text-white transition-all duration-300 disabled:opacity-50"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {cert.link === '#' ? 'Link Coming Soon' : 'View Certificate'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Back button bottom */}
        <div className="text-center mt-16">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="btn-hero px-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CertificationsPage;