import React from "react";
import ScoreGauge from "~/components/ScoreGauge";
import ScoreCircle from "~/components/ScoreCircle";

const Category = ({ title, score, icon }: { title: string, score: number, icon: React.ReactNode }) => {
    return (
        <div className="flex items-center justify-between p-5 transition-all bg-white border shadow-sm rounded-2xl border-slate-100 hover:shadow-md hover:-translate-y-1 group">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500">Score breakdown</p>
                </div>
            </div>
            <div className="scale-75 origin-right">
                <ScoreCircle score={score} />
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 w-full relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10 relative z-10">
                <div className="shrink-0 scale-110">
                    <ScoreGauge score={feedback.overallScore} />
                </div>
                <div className="flex flex-col gap-3 text-center md:text-left mt-2">
                    <h2 className="text-2xl font-bold text-slate-900">Your Overall Score</h2>
                    <p className="text-slate-600 leading-relaxed max-w-md">
                        This score reflects the general strength of your resume. A higher score indicates a better chance of passing ATS and impressing recruiters.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 relative z-10">
                <Category 
                    title="Tone & Style" 
                    score={feedback.toneAndStyle?.score || 0} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>}
                />
                <Category 
                    title="Content" 
                    score={feedback.content?.score || 0} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                />
                <Category 
                    title="Structure" 
                    score={feedback.structure?.score || 0} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
                />
                <Category 
                    title="Skills" 
                    score={feedback.skills?.score || 0} 
                    icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                />
            </div>
        </div>
    )
}

export default Summary;