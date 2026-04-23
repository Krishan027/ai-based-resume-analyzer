import { useEffect, type JSX } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate} from "react-router";


export const meta = () => ([
    { title: "Resume Analyzer | Auth" },
    { name: "description", content: "Login to your account" },
])

const Auth = (): JSX.Element => {
    const  {isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = new URLSearchParams(location.search).get("next") ?? "/";
    const navigate = useNavigate();

    const handleSignIn = async () => {
        await auth.signIn();
        const state = usePuterStore.getState();
        if (state.auth.isAuthenticated) {
            navigate(next, { replace: true });
        }
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate(next, { replace: true });
        }
    }, [auth.isAuthenticated, next, navigate]);

    return (
        <main className="bg-[url('/images/bg-main.jpg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Login to your account</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse">
                                <p>Signing you in</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button !bg-violet-600 !text-white !font-bold !border-none !shadow-lg !shadow-violet-600/50 hover:!bg-violet-700 hover:!shadow-violet-600/70 hover:-translate-y-0.5 transition-all duration-300" onClick={auth.signOut}>
                                        <p>Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button !bg-violet-600 !text-white !font-bold !border-none !shadow-lg !shadow-violet-600/50 hover:!bg-violet-700 hover:!shadow-violet-600/70 hover:-translate-y-0.5 transition-all duration-300" onClick={handleSignIn}>
                                        <p>Log in</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Auth;