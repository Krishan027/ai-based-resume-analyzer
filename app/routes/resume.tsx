import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import ScoreCircle from "~/components/ScoreCircle";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
// import Details from "~/components/details";


export const meta = () => ([
    { title: "Resume Analyzer | Review" },
    { name: "description", content: "Detailed review of your resume" },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();

    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) navigate("/auth?next=/resume/${id}");
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume: any = await kv.get(`resume:${id}`);
            if (!resume) return;
            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if (!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if (!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({ resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="min-h-screen bg-slate-50/50 selection:bg-indigo-100 selection:text-indigo-900 pb-20">
            <nav className="sticky top-0 z-50 flex items-center justify-between p-4 px-6 lg:px-12 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm transition-all">
                <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 transition-all bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:text-indigo-600">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Homepage
                </Link>
                {feedback && (
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-slate-500 hidden sm:block">Overall Score</span>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/30 text-lg">
                            {feedback.overallScore}
                        </div>
                    </div>
                )}
            </nav>

            <div className="max-w-[1600px] mx-auto p-4 sm:p-8 lg:p-12 mt-4 lg:mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    
                    {/* Feedback Column - Left */}
                    <section className="lg:col-span-7 flex flex-col gap-10">
                        <div className="space-y-3 animate-in slide-in-from-left-4 duration-700">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900">
                                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Resume Review</span>
                            </h1>
                            <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
                                We've analyzed your resume against top industry standards. Here is your comprehensive feedback and actionable insights.
                            </p>
                        </div>

                        {feedback ? (
                            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150 fill-mode-both">
                                <Summary feedback={feedback} />
                                <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                                <img src="/images/resume-scan-2.gif" className="w-64 opacity-80 mix-blend-multiply" alt="Scanning..." />
                                <h3 className="mt-6 text-xl font-medium text-slate-600 animate-pulse">Analyzing your document...</h3>
                            </div>
                        )}
                    </section>

                    {/* Resume Preview Column - Right (Sticky) */}
                    <section className="lg:col-span-5 relative">
                        <div className="sticky top-32 animate-in slide-in-from-right-8 duration-1000">
                            {imageUrl && resumeUrl ? (
                                <div className="group relative w-full aspect-[8.5/11] bg-white rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(79,70,229,0.15)] ring-1 ring-black/5">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
                                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block w-full h-full p-2 bg-slate-50">
                                        <img
                                            src={imageUrl}
                                            className="w-full h-full object-contain bg-white rounded-2xl shadow-sm transition-transform duration-700 group-hover:scale-[1.01]"
                                            alt="Resume Preview"
                                        />
                                    </a>
                                </div>
                            ) : (
                                <div className="w-full aspect-[8.5/11] bg-white rounded-3xl border-2 border-slate-200 border-dashed flex flex-col items-center justify-center gap-4 animate-pulse">
                                    <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                                    <span className="text-slate-400 font-medium">Preparing preview...</span>
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    )
}
export default Resume