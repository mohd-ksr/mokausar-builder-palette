// import { Code, Brain, Palette, Settings, Database, Globe } from 'lucide-react';

// const Skills = () => {
//   const skillCategories = [
//     {
//       title: "Programming Languages",
//       icon: Code,
//       color: "text-primary",
//       bgColor: "bg-primary/10",
//       skills: ["C++", "Python", "Java", "JavaScript", "HTML", "CSS"]
//     },
//     {
//       title: "AI & Machine Learning",
//       icon: Brain,
//       color: "text-secondary",
//       bgColor: "bg-secondary/10",
//       skills: ["Time Series Forecasting", "Data Analysis", "NumPy", "Pandas", "Matplotlib", "Scikit-learn", "TensorFlow", "PyTorch"]
//     },
//     {
//       title: "Web Development",
//       icon: Globe,
//       color: "text-accent",
//       bgColor: "bg-accent/10",
//       skills: ["React", "Node", "Flutter", "Streamlit", "Gradio", "Responsive Design", "UI/UX"]
//     },
//     {
//       title: "Tools & Platforms",
//       icon: Settings,
//       color: "text-success",
//       bgColor: "bg-success/10",
//       skills: ["GitHub", "Jupyter", "VS Code,", "Hugging Face", "OpenAI", "Anaconda"]
//     },
//     {
//       title: "AI Services",
//       icon: Database,
//       color: "text-warning",
//       bgColor: "bg-warning/10",
//       skills: ["OpenAI API", "DeepSeek", "Gemini", "Chatbot Development", "AI Integration"]
//     },
//     {
//       title: "Specializations",
//       icon: Palette,
//       color: "text-purple-500",
//       bgColor: "bg-purple-500/10",
//       skills: ["Machine Learning", "Optimization Models", "Education Tech", "Automation", "Data Visualization"]
//     }
//   ];

//   const interests = [
//     "AI-powered Applications",
//     "Optimization Models", 
//     "Education-focused Solutions",
//     "Open Source Contribution",
//     "Real-world Problem Solving"
//   ];

//   return (
//     <section id="skills" className="section-padding bg-white/40 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
//             Skills & Expertise
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             A comprehensive toolkit for building innovative solutions
//           </p>
//         </div>

//         {/* Skills Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           {skillCategories.map((category, index) => {
//             const Icon = category.icon;
//             return (
//               <div 
//                 key={index}
//                 className="card-gradient group hover:scale-105 transition-all duration-300"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
//                   <Icon className={`h-8 w-8 ${category.color}`} />
//                 </div>
                
//                 <h3 className="text-xl font-heading font-semibold mb-4 text-foreground">
//                   {category.title}
//                 </h3>
                
//                 <div className="space-y-2">
//                   {category.skills.map((skill, skillIndex) => (
//                     <div 
//                       key={skillIndex}
//                       className="flex items-center justify-between p-2 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
//                     >
//                       <span className="text-sm font-medium text-foreground">{skill}</span>
//                       <div className="w-2 h-2 bg-gradient-primary rounded-full animate-pulse"></div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Special Interests */}
//         <div className="text-center">
//           <h3 className="text-2xl font-heading font-semibold mb-8 text-gradient-accent">
//             Special Interests
//           </h3>
//           <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
//             {interests.map((interest, index) => (
//               <div 
//                 key={index}
//                 className="px-6 py-3 bg-gradient-primary text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 cursor-default animate-fade-in"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {interest}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Skills Progress Visualization */}
//         <div className="mt-16 card-gradient">
//           <h3 className="text-2xl font-heading font-semibold mb-8 text-center text-gradient-accent">
//             Proficiency Overview
//           </h3>
//           <div className="grid md:grid-cols-2 gap-8">
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-foreground">Programming & Development</h4>
//               <div className="space-y-4">
//                 {[
//                   { skill: "Python", level: 90 },
//                   { skill: "C++", level: 85 },
//                   { skill: "JavaScript", level: 89 },
//                   { skill: "Web Development", level: 88 }
//                 ].map((item, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="font-medium text-foreground">{item.skill}</span>
//                       <span className="text-muted-foreground">{item.level}%</span>
//                     </div>
//                     <div className="w-full bg-muted/30 rounded-full h-2">
//                       <div 
//                         className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out"
//                         style={{ width: `${item.level}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-lg font-semibold mb-4 text-foreground">AI & Machine Learning</h4>
//               <div className="space-y-4">
//                 {[
//                   { skill: "ML Algorithms", level: 82 },
//                   { skill: "AI Integration", level: 88 },
//                   { skill: "Data Analysis", level: 85 },
//                   { skill: "Chatbot Development", level: 90 }
//                 ].map((item, index) => (
//                   <div key={index} className="space-y-2">
//                     <div className="flex justify-between text-sm">
//                       <span className="font-medium text-foreground">{item.skill}</span>
//                       <span className="text-muted-foreground">{item.level}%</span>
//                     </div>
//                     <div className="w-full bg-muted/30 rounded-full h-2">
//                       <div 
//                         className="bg-gradient-accent h-2 rounded-full transition-all duration-1000 ease-out"
//                         style={{ width: `${item.level}%`, animationDelay: `${index * 200}ms` }}
//                       ></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Skills;


import { useState } from 'react';
import { Code, Brain, Palette, Settings, Database, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const Skills = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);

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
      skills: ["GitHub", "Jupyter", "VS Code", "Hugging Face", "OpenAI", "Anaconda"]
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

  const total = skillCategories.length;
  const GAP = 32;

  const currentVisible = [0, 1, 2].map(o => ((startIndex + o) % total + total) % total);

  const getWindow = (start: number) => {
    return [-1, 0, 1, 2, 3].map(offset => {
      const i = ((start + offset) % total + total) % total;
      return skillCategories[i];
    });
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTranslateX(-1);
    setTimeout(() => {
      setStartIndex(prev => (prev + 1) % total);
      setTranslateX(0);
      setIsAnimating(false);
    }, 450);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTranslateX(1);
    setTimeout(() => {
      setStartIndex(prev => (prev - 1 + total) % total);
      setTranslateX(0);
      setIsAnimating(false);
    }, 450);
  };

  const window5 = getWindow(startIndex);

  const interests = [
    "AI-powered Applications",
    "Optimization Models",
    "Education-focused Solutions",
    "Open Source Contribution",
    "Real-world Problem Solving"
  ];

  const CardContent = ({ category }: { category: typeof skillCategories[0] }) => {
    const Icon = category.icon;
    return (
      <>
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
      </>
    );
  };

  return (
    <section id="skills" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive toolkit for building innovative solutions
          </p>
        </div>

        {/* ── MOBILE: stacked cards ── */}
        <div className="md:hidden flex flex-col gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div key={index} className="card-gradient group">
              <CardContent category={category} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: sliding carousel ── */}
        <div className="hidden md:block relative mb-6">
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-muted flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden">
            <div
              style={{
                display: 'flex',
                gap: `${GAP}px`,
                transform: `translateX(calc(${translateX} * (calc((100% - ${GAP * 5}px) / 4) + ${GAP}px)))`,
                transition: isAnimating
                  ? 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)'
                  : 'none',
                marginLeft: `calc(-1 * (calc((100% - ${GAP * 5}px) / 4) + ${GAP}px))`,
              }}
            >
              {window5.map((category, pos) => (
                <div
                  key={`${pos}-${startIndex}`}
                  style={{
                    flex: `0 0 calc((100% - ${GAP * 5}px) / 4)`,
                    minWidth: 0,
                  }}
                  className="card-gradient group hover:scale-[1.02] transition-transform duration-300"
                >
                  <CardContent category={category} />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-muted flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators — desktop only */}
        <div className="hidden md:flex justify-center gap-2 mb-16">
          {skillCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (isAnimating) return;
                if (currentVisible.includes(i)) return;
                const diff = ((i - startIndex) % total + total) % total;
                const goForward = diff <= total / 2;
                setIsAnimating(true);
                setTranslateX(goForward ? -1 : 1);
                setTimeout(() => {
                  setStartIndex(goForward
                    ? (startIndex + diff) % total
                    : ((startIndex - (total - diff)) % total + total) % total
                  );
                  setTranslateX(0);
                  setIsAnimating(false);
                }, 450);
              }}
              // className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              //   currentVisible.includes(i)
              //     ? 'bg-primary scale-125'
              //     : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              // }`}
            />
          ))}
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
                      />
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
                        style={{ width: `${item.level}%` }}
                      />
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