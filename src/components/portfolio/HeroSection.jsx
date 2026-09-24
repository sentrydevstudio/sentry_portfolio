import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images to cycle through
  const images = [
    '/img/Sentry_B&W.png',
    '/img/Villain_1.png',
    '/img/Villain_2.png',
    // Add more image paths here
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    const updateMouse = (e) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Image carousel interval
  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(imageInterval);
  }, [images.length]);

  const repelX = useTransform(mouseX, [-300, 300], [-70, 70]);
const repelY = useTransform(mouseY, [-300, 300], [-50, 50]);

// ← NEW: Orb data array (randomized on every load)
const orbs = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  size: Math.random() * 180 + 100,
  duration: Math.random() * 25 + 30,
  delay: i * 1.4,
}));

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="full-bleed relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-linear-to-br from-[#0A2540] via-[#0D3A5F] to-[#0A2540] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxMmMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-20" />
      </div>

            {/* ← NEW: Floating Geometric Orbs – Ethereal & Interactive */}
      <div className="absolute inset-0 pointer-events-none">
        {orbs.map((orb) => (
          <motion.div
            key={orb.id}
            className="absolute rounded-full bg-linear-to-br from-[#00D4FF] via-[#27d4ff] to-transparent blur-3xl"
            style={{
              width: orb.size,
              height: orb.size,
              left: '50%',
              top: '50%',
              x: repelX,
              y: repelY,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              x: ['-35vw', '35vw', '-35vw'],
              y: ['-35vh', '35vh', '-35vh'],
              scale: [0.9, 1.15, 0.9],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: orb.delay,
            }}
            whileHover={{ scale: 1.6, opacity: 0.5 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center">
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 md:gap-12 lg:gap-16 pt-8 sm:pt-12 md:pt-20">
          {/* Left Side - Text Content */}
          <div className="flex-1 text-left w-full">
          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 dark:text-gray-100"
          >
            <span className="text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-linear-to-r from-white via-[#00D4FF] to-white bg-clip-text text-transparent">
              YUSUF ISRAEL TIMILEYIN
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-xl lg:text-3xl text-white/90 font-light mb-3 sm:mb-4 dark:text-gray-300"
          >
            Frontend Developer | Fullstack Engineer | Creative Coder
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-white/70 mb-8 sm:mb-12 dark:text-gray-400"
          >
            Crafting intuitive digital experiences with modern technologies.
            Passionate about creating seamless user interfaces and robust backend systems.
          </motion.p>
        </div>

        {/* Right Side - Profile Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="shrink-0 w-28 h-40 xs:w-32 xs:h-48 sm:w-40 sm:h-56 md:w-56 md:h-80 lg:w-72 lg:h-96"
        >
          <div className="relative w-full h-full overflow-hidden rounded-[20px]">
            {/* White background */}
            <div className="absolute inset-0 bg-white rounded-[28px] border-4 border-white/60"/>
            {/* Image with white border and glow - cycles through images */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt="Professional Headshot"
                className="relative w-full h-auto object-contain z-10 border-4 border-white"
                style={{
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px 20px 20px 20px'
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1.5 }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
        </div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative z-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pb-20 px-4"
      >
          <button
            onClick={scrollToProjects}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#00D4FF] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 dark:bg-[#00D4FF] dark:text-gray-900 w-full sm:w-auto"
          >
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-[#00D4FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-[0_0_20px_rgba(0,212,255,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>

          <button
            onClick={scrollToContact}
            className="group relative px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#00D4FF] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 dark:border-[#00D4FF] dark:text-gray-200 dark:hover:bg-[#00D4FF]/10 w-full sm:w-auto"
          >
            <span className="relative z-10">Contact Me</span>
            <div className="absolute inset-0 bg-[#00D4FF] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-[0_0_20px_rgba(0,212,255,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10"
      >
        <ChevronDown className="w-8 h-8 text-white/50 dark:text-gray-400" />
      </motion.div>
    </section>
  );
}