import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

export default function ProfileMenu() {
  const { auth } = usePuterStore();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!auth.isAuthenticated) return null;

  const userInitial = auth.user?.username?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative z-50" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold shadow-lg hover:shadow-violet-600/50 hover:scale-105 transition-all duration-300 border-2 border-white cursor-pointer select-none"
      >
        {userInitial}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
          <div className="p-6 border-b border-gray-100 flex flex-col items-center bg-gray-50/50">
            <div className="w-16 h-16 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center text-3xl font-bold mb-3 shadow-inner">
              {userInitial}
            </div>
            <p className="font-bold text-gray-800 text-lg truncate w-full text-center">{auth.user?.username || "User"}</p>
            <p className="text-sm text-gray-500">Resume Analyzer Account</p>
          </div>
          <div className="p-2 flex flex-col gap-1">
            <Link
              to="/wipe"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-3 text-orange-600 font-medium hover:bg-orange-50 rounded-xl transition-colors duration-200 flex items-center gap-3 cursor-pointer border border-transparent hover:border-orange-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              Clear Data
            </Link>
            <button
              onClick={() => {
                setIsOpen(false);
                auth.signOut();
              }}
              className="w-full text-left px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors duration-200 flex items-center gap-3 cursor-pointer border border-transparent hover:border-red-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
