"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation"; 
import { auth } from "@/config/firebase";
import { Loader } from "lucide-react";
import StarsCanvas from "@/components/StarCanvas";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (pathname === "/login" || pathname === "/" || pathname === "/register") {
          router.push("/dashboard");
        }
      } else {
        setUser(null);
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/workspace")) {
          router.push("/login");
        }
      }
      setLoading(false); 
    });

    return () => unsubscribe();
  }, [pathname, router]); 

  if (loading) return(
    <div className="bg-black flex items-center justify-center min-h-screen">
        <StarsCanvas />
        <Loader size="50" />
    </div>
  );

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
