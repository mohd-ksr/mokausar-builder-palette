// import { Trophy, Flame, Code2, Star, GraduationCap } from 'lucide-react';

// const Achievements = () => {
//   const achievements = [
//     {
//       icon: Trophy,
//       emoji: "🏆",
//       title: "1st Place – HACK-IOT",
//       org: "Lovely Professional University",
//       date: "Feb 2024",
//       description: "Secured winner position as Team Leader with an innovative web-based IoT solution at the HACK-IOT hackathon organized by the School of Electronics & Electrical Engineering.",
//       tags: ["Hackathon", "Team Leader", "Web Dev", "IoT"],
//       color: "text-warning",
//       bgColor: "bg-warning/10",
//       borderColor: "border-warning/30",
//       badgeColor: "bg-warning",
//     },
//     {
//       icon: Star,
//       emoji: "⚔️",
//       title: "Competitive Programming Ratings",
//       org: "LeetCode · Codeforces · CodeChef",
//       date: "Ongoing",
//       description: "Achieved Knight rank on LeetCode with a max rating of 1914, Pupil rank on Codeforces, and 3-Star rating on CodeChef — demonstrating consistent competitive programming performance.",
//       tags: ["Knight – LeetCode", "Pupil – Codeforces", "3★ – CodeChef"],
//       color: "text-primary",
//       bgColor: "bg-primary/10",
//       borderColor: "border-primary/30",
//       badgeColor: "bg-primary",
//     },
//     {
//       icon: Flame,
//       emoji: "🔥",
//       title: "100+ Day LeetCode Streak",
//       org: "LeetCode",
//       date: "March 2026",
//       description: "Maintained a 100+ day daily problem-solving streak on LeetCode, showcasing exceptional consistency, discipline, and dedication to sharpening coding skills every single day.",
//       tags: ["Consistency", "Daily Coding", "Problem Solving"],
//       color: "text-orange-500",
//       bgColor: "bg-orange-500/10",
//       borderColor: "border-orange-500/30",
//       badgeColor: "bg-orange-500",
//     },
//     {
//       icon: Code2,
//       emoji: "💻",
//       title: "800+ Problems Solved",
//       org: "LeetCode · Codeforces · CodeChef · AtCoder · GFG",
//       date: "Oct 2023 – Present",
//       description: "Solved over 800 coding problems across multiple competitive programming platforms including LeetCode, Codeforces, CodeChef, AtCoder, and GeeksForGeeks.",
//       tags: ["DSA", "Algorithms", "Multi-Platform", "800+"],
//       color: "text-success",
//       bgColor: "bg-success/10",
//       borderColor: "border-success/30",
//       badgeColor: "bg-success",
//     },
//     {
//       icon: GraduationCap,
//       emoji: "🎓",
//       title: "Dean's List – LPU",
//       org: "Lovely Professional University",
//       date: "Sep 2025",
//       description: "Achieved academic excellence and earned a place on the Dean's List at Lovely Professional University, recognizing the top 10% of students for outstanding performance.",
//       tags: ["Academic Excellence", "Top 10%", "Dean's List"],
//       color: "text-secondary",
//       bgColor: "bg-secondary/10",
//       borderColor: "border-secondary/30",
//       badgeColor: "bg-secondary",
//     },
//   ];

//   return (
//     <section id="achievements" className="section-padding bg-white/40 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto">

//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
//             Achievements
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
//             Milestones earned through consistency, competition, and curiosity
//           </p>
//         </div>

//         {/* Achievements Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {achievements.map((item, index) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={index}
//                 className={`card-project h-full flex flex-col hover:scale-[1.03] transition-transform duration-300 border ${item.borderColor}`}
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* Badge Header */}
//                 <div className="flex items-start justify-between mb-5">
//                   <div className={`p-3 ${item.bgColor} rounded-xl`}>
//                     <Icon className={`h-6 w-6 ${item.color}`} />
//                   </div>
//                   <span className="text-2xl">{item.emoji}</span>
//                 </div>

//                 {/* Content */}
//                 <div className="flex-1">
//                   <h3 className="text-lg font-heading font-bold text-foreground mb-1">
//                     {item.title}
//                   </h3>
//                   <p className={`text-sm font-medium ${item.color} mb-1`}>
//                     {item.org}
//                   </p>
//                   <p className="text-xs text-muted-foreground mb-3">
//                     {item.date}
//                   </p>
//                   <p className="text-sm text-muted-foreground leading-relaxed mb-4">
//                     {item.description}
//                   </p>

//                   {/* Tags */}
//                   <div className="flex flex-wrap gap-2">
//                     {item.tags.map((tag, i) => (
//                       <span
//                         key={i}
//                         className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Bottom accent bar */}
//                 <div className={`mt-5 h-1 w-full rounded-full ${item.badgeColor} opacity-30`} />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Achievements;





import { useState } from 'react';
import { Trophy, Flame, Code2, Star, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';

const Achievements = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const achievements = [
    {
      icon: Trophy,
      emoji: "🏆",
      title: "1st Place – HACK-IOT",
      org: "Lovely Professional University",
      date: "Feb 2024",
      description: "Secured winner position as Team Leader with an innovative web-based IoT solution at the HACK-IOT hackathon organized by the School of Electronics & Electrical Engineering.",
      tags: ["Hackathon", "Team Leader", "Web Dev", "IoT"],
      color: "text-warning",
      bgColor: "bg-warning/10",
      borderColor: "border-warning/30",
      badgeColor: "bg-warning",
    },
    {
      icon: Star,
      emoji: "⚔️",
      title: "Competitive Programming Ratings",
      org: "LeetCode · Codeforces · CodeChef",
      date: "Ongoing",
      description: "Achieved Knight rank on LeetCode with a max rating of 1914, Pupil rank on Codeforces, and 3-Star rating on CodeChef — demonstrating consistent competitive programming performance.",
      tags: ["Knight – LeetCode", "Pupil – Codeforces", "3★ – CodeChef"],
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
      badgeColor: "bg-primary",
    },
    {
      icon: Flame,
      emoji: "🔥",
      title: "100+ Day LeetCode Streak",
      org: "LeetCode",
      date: "March 2026",
      description: "Maintained a 100+ day daily problem-solving streak on LeetCode, showcasing exceptional consistency, discipline, and dedication to sharpening coding skills every single day.",
      tags: ["Consistency", "Daily Coding", "Problem Solving"],
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30",
      badgeColor: "bg-orange-500",
    },
    {
      icon: Code2,
      emoji: "💻",
      title: "800+ Problems Solved",
      org: "LeetCode · Codeforces · CodeChef · AtCoder · GFG",
      date: "Oct 2023 – Present",
      description: "Solved over 800 coding problems across multiple competitive programming platforms including LeetCode, Codeforces, CodeChef, AtCoder, and GeeksForGeeks.",
      tags: ["DSA", "Algorithms", "Multi-Platform", "800+"],
      color: "text-success",
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
      badgeColor: "bg-success",
    },
    {
      icon: GraduationCap,
      emoji: "🎓",
      title: "Dean's List – LPU",
      org: "Lovely Professional University",
      date: "Sep 2025",
      description: "Achieved academic excellence and earned a place on the Dean's List at Lovely Professional University, recognizing the top 10% of students for outstanding performance.",
      tags: ["Academic Excellence", "Top 10%", "Dean's List"],
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/30",
      badgeColor: "bg-secondary",
    },
  ];

  const total = achievements.length;
  const GAP = 32;

  const currentVisible = [0, 1, 2].map(o => ((startIndex + o) % total + total) % total);

  const getWindow = (start: number) => {
    return [-1, 0, 1, 2, 3].map(offset => {
      const i = ((start + offset) % total + total) % total;
      return achievements[i];
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

  const CardContent = ({ item }: { item: typeof achievements[0] }) => {
    const Icon = item.icon;
    return (
      <>
        <div className="flex items-start justify-between mb-5">
          <div className={`p-3 ${item.bgColor} rounded-xl`}>
            <Icon className={`h-6 w-6 ${item.color}`} />
          </div>
          <span className="text-2xl">{item.emoji}</span>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-heading font-bold text-foreground mb-1">
            {item.title}
          </h3>
          <p className={`text-sm font-medium ${item.color} mb-1`}>
            {item.org}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {item.date}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className={`mt-5 h-1 w-full rounded-full ${item.badgeColor} opacity-30`} />
      </>
    );
  };

  return (
    <section id="achievements" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="p-2 text-3xl lg:text-5xl font-heading font-bold text-gradient-primary mb-4">
            Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Milestones earned through consistency, competition, and curiosity
          </p>
        </div>

        {/* ── MOBILE: stacked cards ── */}
        <div className="md:hidden flex flex-col gap-6">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`card-project h-full flex flex-col border ${item.borderColor}`}
            >
              <CardContent item={item} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: sliding carousel ── */}
        <div className="hidden md:block relative mb-6">
          <button
            onClick={handlePrev}
            disabled={isAnimating}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-muted flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="p-4 overflow-hidden">
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
              {window5.map((item, pos) => (
                <div
                  key={`${pos}-${startIndex}`}
                  style={{
                    flex: `0 0 calc((100% - ${GAP * 5}px) / 4)`,
                    minWidth: 0,
                  }}
                  className={`card-project flex flex-col border ${item.borderColor} hover:scale-[1.02] transition-transform duration-300`}
                >
                  <CardContent item={item} />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={isAnimating}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-muted flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators — desktop only */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {achievements.map((_, i) => (
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
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Achievements;