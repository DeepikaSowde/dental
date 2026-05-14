"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Role = "dentist" | "clinic" | "student" | "dealer";

const ROLES: { id: Role; label: string; icon: string }[] = [
  { id: "dentist", label: "Dentist", icon: "👨‍⚕️" },
  { id: "clinic", label: "Clinic", icon: "🏥" },
  { id: "student", label: "Student", icon: "🎓" },
  { id: "dealer", label: "Dealer", icon: "🤝" },
];

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("dentist");

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#1B5E20]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00796B]/04 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#81C784] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(27,94,32,0.5)]">
            <span className="text-[#FFFDF5] font-black text-3xl">T</span>
          </div>
          <h1 className="text-2xl font-bold font-outfit text-[#3E2723]">{isLogin ? "Welcome Back" : "Join Thaarwin"}</h1>
          <p className="text-[#5D4037] text-sm mt-1">The Dental Marker Space</p>
        </div>

        {/* Toggle */}
        <div className="flex p-1 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/10 mb-6">
          {["Login", "Sign Up"].map((tab) => (
            <button
              key={tab}
              onClick={() => setIsLogin(tab === "Login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                (tab === "Login") === isLogin
                  ? "neon-btn text-[#FFFDF5]"
                  : "text-[#5D4037] hover:text-[#3E2723]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Role Selection for Sign Up */}
        {!isLogin && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-5">
            <label className="block text-xs font-medium text-[#3E2723] mb-3">I am a…</label>
            <div className="grid grid-cols-4 gap-2">
              {ROLES.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-center transition-all ${
                    selectedRole === role.id
                      ? "border-[#1B5E20]/50 bg-[#1B5E20]/10 shadow-[0_0_12px_rgba(27,94,32,0.15)]"
                      : "border-[#1B5E20]/10 hover:border-[#1B5E20]/25"
                  }`}
                >
                  <span className="text-xl">{role.icon}</span>
                  <span className={`text-[10px] font-medium ${selectedRole === role.id ? "text-[#1B5E20]" : "text-[#5D4037]"}`}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Form */}
        <div className="card-glass rounded-2xl p-6 space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-[#3E2723] mb-1.5">Full Name</label>
              <input type="text" placeholder="Dr. John Doe" className="w-full h-11 px-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_12px_rgba(27,94,32,0.1)] transition-all" />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-[#3E2723] mb-1.5">
              {isLogin ? "Email or Phone" : "Email Address"}
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]" />
              <input type="email" placeholder="doctor@clinic.com" className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_12px_rgba(27,94,32,0.1)] transition-all" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-[#3E2723]">Password</label>
              {isLogin && <Link href="/auth/forgot" className="text-[10px] text-[#1B5E20] hover:text-[#81C784]">Forgot Password?</Link>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5D4037]" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full h-11 pl-10 pr-11 rounded-xl bg-[#FAF6ED] border border-[#1B5E20]/15 text-[#3E2723] placeholder:text-[#5D4037] text-sm focus:outline-none focus:border-[#1B5E20]/50 focus:shadow-[0_0_12px_rgba(27,94,32,0.1)] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#5D4037] hover:text-[#1B5E20] transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button className="w-full h-11 neon-btn text-[#FFFDF5] font-bold rounded-xl mt-2">
            {isLogin ? "Login to Account" : "Create Account"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>

          <div className="relative flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-[#1B5E20]/10" />
            <span className="text-xs text-[#5D4037]">or continue with</span>
            <div className="flex-1 h-px bg-[#1B5E20]/10" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="h-10 rounded-xl border border-[#1B5E20]/15 bg-[#FAF6ED] text-xs font-medium text-[#3E2723] hover:border-[#1B5E20]/35 hover:text-[#1B5E20] transition-all flex items-center justify-center gap-2">
              <span>G</span> Google
            </button>
            <button className="h-10 rounded-xl border border-[#1B5E20]/15 bg-[#FAF6ED] text-xs font-medium text-[#3E2723] hover:border-[#1B5E20]/35 hover:text-[#1B5E20] transition-all flex items-center justify-center gap-2">
              📱 OTP Login
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-[#5D4037] mt-4">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-[#1B5E20] hover:text-[#81C784] font-medium">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
