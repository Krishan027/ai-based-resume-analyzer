import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/components/Navbar";

const WipeApp = () => {
    const { auth, isLoading, error, fs, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isWiping, setIsWiping] = useState(false);

    const loadFiles = async () => {
        try {
            const files = (await fs.readDir("./")) as FSItem[];
            setFiles(files || []);
        } catch (e) {
            console.error("Error loading files", e);
        }
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading, auth.isAuthenticated, navigate]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to permanently delete all your resumes and analysis data? This action cannot be undone.")) return;
        
        setIsWiping(true);
        try {
            for (const file of files) {
                if (file.path) {
                     await fs.delete(file.path);
                }
            }
            await kv.flush();
            await loadFiles();
        } catch (e) {
            console.error("Error during wipe:", e);
        } finally {
            setIsWiping(false);
            alert("All app data has been successfully wiped!");
            navigate("/");
        }
    };

    if (isLoading) {
        return (
            <main className="bg-[url('/images/bg-main.jpg')] bg-cover min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <img src="/images/resume-scan-2.gif" className="w-[150px]" alt="Loading..." />
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-[url('/images/bg-main.jpg')] bg-cover min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-2xl shadow-xl text-center text-red-600 font-bold text-xl">
                        Error: {error}
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-main.jpg')] bg-cover min-h-screen flex flex-col">
            <Navbar />
            
            <section className="flex-1 flex items-center justify-center p-4">
                <div className="gradient-border shadow-2xl max-w-2xl w-full animate-in fade-in zoom-in-95 duration-500">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 md:p-12 flex flex-col items-center text-center gap-6">
                        
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-inner">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Resume History</h1>
                            <p className="text-gray-500 max-w-md mx-auto text-lg">
                                You are about to permanently delete all uploaded resumes, generated feedback, and analysis scores.
                            </p>
                        </div>

                        <div className="w-full bg-gray-50 rounded-xl p-6 border border-gray-100 text-left mt-2">
                            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z"></path><path d="M18 18l-4-4"></path><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"></path></svg>
                                Files targeted for deletion:
                            </h3>
                            {files && files.length > 0 ? (
                                <ul className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                                    {files.map((file) => (
                                        <li key={file.id || file.name} className="bg-white px-4 py-2 rounded-lg text-sm text-gray-600 font-medium shadow-sm border border-gray-100 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                            {file.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 italic px-2">No files currently stored.</p>
                            )}
                        </div>

                        <button
                            className="primary-button w-full mt-4 !bg-red-600 !text-white !font-bold !border-none !shadow-xl !shadow-red-600/30 hover:!bg-red-700 hover:!shadow-red-600/50 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            onClick={handleDelete}
                            disabled={isWiping || (files.length === 0)}
                        >
                            {isWiping ? (
                                <>
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Wiping Data...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                    Permanently Delete All Data
                                </>
                            )}
                        </button>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default WipeApp;