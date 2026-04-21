"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Heart, LogIn, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type Language = "EN" | "AR";

interface HeaderButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

function HeaderButton({
  children,
  onClick,
  className,
  ariaLabel,
}: HeaderButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "relative flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium",
        "text-foreground/80 hover:text-foreground",
        "bg-secondary/50 hover:bg-secondary",
        "border border-border/50 hover:border-border",
        "transition-colors duration-200",
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useState(() => {
    setMounted(true);
  });

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <HeaderButton ariaLabel="Toggle theme" className="w-10 h-10">
        <div className="h-5 w-5" />
      </HeaderButton>
    );
  }

  return (
    <HeaderButton
      onClick={toggleTheme}
      ariaLabel="Toggle theme"
      className="w-10 h-10"
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </motion.div>
    </HeaderButton>
  );
}

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

function LanguageSwitcher({
  language,
  onLanguageChange,
}: LanguageSwitcherProps) {
  const toggleLanguage = () => {
    onLanguageChange(language === "EN" ? "AR" : "EN");
  };

  return (
    <HeaderButton
      onClick={toggleLanguage}
      ariaLabel="Switch language"
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">{language}</span>
    </HeaderButton>
  );
}

interface FavoriteButtonProps {
  count: number;
  onClick?: () => void;
}

function FavoriteButton({ count, onClick }: FavoriteButtonProps) {
  return (
    <HeaderButton
      onClick={onClick}
      ariaLabel={`Favorites, ${count} items`}
      className="w-10 h-10"
    >
      <Heart className="h-5 w-5" />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            "absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center",
            "rounded-full bg-destructive text-[10px] font-bold text-white",
          )}
        >
          {count > 99 ? "99+" : count}
        </motion.span>
      )}
    </HeaderButton>
  );
}

function LoginButton({ isRTL }: { isRTL: boolean }) {
  return (
    <motion.button
      className={cn(
        "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
        "bg-primary text-primary-foreground",
        "hover:bg-primary/90",
        "transition-colors duration-200",
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Login"
    >
      <LogIn className={cn("h-4 w-4", isRTL && "rotate-180")} />
      <span>{isRTL ? "تسجيل الدخول" : "Login"}</span>
    </motion.button>
  );
}

function Logo({ isRTL }: { isRTL: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl",
          "bg-primary text-primary-foreground font-bold text-lg",
        )}
        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5 }}
      >
        V0
      </motion.div>
      <span className="text-xl font-bold text-foreground hidden sm:block">
        {isRTL ? "العلامة التجارية" : "Brand"}
      </span>
    </Link>
  );
}

export function Header() {
  const [language, setLanguage] = useState<Language>("EN");
  const [favoriteCount] = useState(5); // Example count

  const isRTL = language === "AR";

  return (
    <motion.header
      dir={isRTL ? "rtl" : "ltr"}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-b border-border/40 bg-background/80 backdrop-blur-lg",
        "supports-[backdrop-filter]:bg-background/60",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo isRTL={isRTL} />

        {/* Right Side Actions */}
        <nav className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <LanguageSwitcher
            language={language}
            onLanguageChange={setLanguage}
          />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Favorites */}
          <FavoriteButton count={favoriteCount} />

          {/* Login Button */}
          <LoginButton isRTL={isRTL} />
        </nav>
      </div>
    </motion.header>
  );
}
