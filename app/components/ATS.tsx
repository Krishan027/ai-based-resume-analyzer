import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine premium styling based on score
  const isGood = score > 69;
  const isWarning = score > 49 && score <= 69;

  const bgGradient = isGood 
    ? 'bg-gradient-to-br from-teal-50 to-emerald-50/50 border-teal-100/60'
    : isWarning
      ? 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-100/60'
      : 'bg-gradient-to-br from-rose-50 to-red-50/50 border-rose-100/60';

  const iconSrc = isGood ? '/icons/ats-good.svg' : isWarning ? '/icons/ats-warning.svg' : '/icons/ats-bad.svg';
  const subtitle = isGood ? 'Great Job!' : isWarning ? 'Good Start' : 'Needs Improvement';
  
  const scoreColor = isGood ? 'text-emerald-600' : isWarning ? 'text-amber-600' : 'text-rose-600';

  return (
    <div className={`${bgGradient} border rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full p-8 transition-all hover:shadow-md`}>
      {/* Top section with icon and headline */}
      <div className="flex items-center gap-5 mb-6">
        <div className="p-3 bg-white rounded-2xl shadow-sm">
          <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 flex items-baseline gap-2">
            ATS Score 
            <span className={`text-4xl ${scoreColor}`}>{score}</span>
            <span className="text-lg text-slate-400 font-medium">/100</span>
          </h2>
        </div>
      </div>

      {/* Description section */}
      <div className="mb-8 bg-white/60 p-5 rounded-2xl border border-white/50 shadow-sm">
        <h3 className={`text-xl font-bold mb-2 ${scoreColor}`}>{subtitle}</h3>
        <p className="text-slate-600 leading-relaxed">
          This score represents how well your resume is likely to perform in Applicant Tracking Systems (ATS) used by top employers. 
        </p>
      </div>

      {/* Suggestions list */}
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100/50 group hover:border-slate-200 transition-colors">
            <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${suggestion.type === "good" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
              {suggestion.type === "good" ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              )}
            </div>
            <p className={`text-base leading-snug ${suggestion.type === "good" ? "text-slate-700" : "text-slate-800 font-medium"}`}>
              {suggestion.tip}
            </p>
          </div>
        ))}
      </div>

      {/* Closing encouragement */}
      <div className="mt-8 text-center">
        <p className="text-slate-500 italic text-sm font-medium">
          Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
        </p>
      </div>
    </div>
  )
}

export default ATS