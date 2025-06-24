"use client";

import { useState } from "react";
import { motion } from "framer-motion"; // For animations
import {
  signUpUser,
  signInWithGoogle,
  verifyEmailCode,
} from "@/helpers/signUpHelp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsCanvas from "@/components/StarCanvas"; // Background stars

const toastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const res = await signUpUser(email, password, displayName);
      if (!res.success) {
        toast.error(res.message, toastOptions);
      } else {
        toast.success(res.message, toastOptions);
        setShowVerification(true);
      }
    } catch (error) {
      toast.error("Sign-up failed: " + error.message, toastOptions);
    }
    setLoading(false);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) return;

    setLoading(true);
    try {
      const res = await verifyEmailCode(
        email,
        verificationCode,
        password,
        displayName
      );
      if (res.success) {
        toast.success(
          "Account created successfully! Redirecting...",
          toastOptions
        );
        setVerificationCode("");
        router.push("/dashboard");
      } else {
        toast.error(res.message, toastOptions);
        setVerificationCode("");
      }
    } catch (error) {
      toast.error("Verification failed: " + error.message, toastOptions);
      setVerificationCode("");
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (res.success) {
        router.push("/dashboard");
      } else {
        toast.error(res.error, toastOptions);
      }
    } catch (error) {
      toast.error("Google sign-in failed: " + error.message, toastOptions);
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <StarsCanvas className="relative inset-0 z-10" />
      <ToastContainer theme="dark" />

      {/* Floating Glassmorphic Card */}
      <motion.div
 initial={{ scale: 1 }}
 animate={{ scale: [1, 1.1, 1] }}
 transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
 whileHover={{ scale: 1.05 }}
      >
        <Card className="w-full max-w-md bg-black/50 border border-gray-700 backdrop-blur-lg shadow-lg shadow-blue-500/30 rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-white">
              🚀 Create Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Display Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-transparent text-white border border-blue-500 rounded-md px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent text-white border border-blue-500 rounded-md px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-white border border-blue-500 rounded-md px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSignUp}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md transition-all duration-300"
            >
              {loading ? "Processing..." : "Sign Up"}
            </Button>
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md transition-all duration-300"
            >
              {loading ? "Processing..." : "Continue with Google"}
            </Button>
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-400 hover:underline">
                Login here
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Verification Dialog */}
      <Dialog open={showVerification} onOpenChange={setShowVerification}>
        <DialogContent className="bg-black/50 border border-gray-700 backdrop-blur-lg text-white shadow-lg shadow-blue-500/30">
          <DialogHeader>
            <DialogTitle className="text-white">Verify Your Email</DialogTitle>
            <DialogDescription className="text-gray-400">
              Enter the 6-digit code sent to {email}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label className="block text-sm font-medium text-gray-300">
              Verification Code
            </Label>
            <Input
              type="text"
              placeholder="123456"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="bg-transparent text-white border border-blue-500 rounded-md px-4 py-2 placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              maxLength={6}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={handleVerifyCode}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-md transition-all duration-300"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}