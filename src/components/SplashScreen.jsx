import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DURATION = 2800; // ms before exit begins

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('enter'); // enter | hold | exit

  useEffect(() => {
    // Animate progress bar
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / (DURATION - 400)) * 100, 100);
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Trigger exit
    const exitTimer = setTimeout(() => {
      setPhase('exit');
      setTimeout(onComplete, 700);
    }, DURATION);

    return () => clearTimeout(exitTimer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'exit' ? 0 : 1, scale: phase === 'exit' ? 1.04 : 1 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#ffffff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background grid shimmer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(46,158,77,0.08) 0%, transparent 65%)`,
        backgroundSize: '100% 100%',
      }} />

      {/* Animated concentric rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.3, opacity: 0.6 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{
            duration: 2.4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: 160, height: 160,
            borderRadius: '50%',
            border: '1.5px solid rgba(46,158,77,0.25)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Rotating outer arc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: 180, height: 180,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'rgba(46,158,77,0.6)',
          borderRightColor: 'rgba(46,158,77,0.3)',
        }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute',
          width: 210, height: 210,
          borderRadius: '50%',
          border: '1px solid transparent',
          borderTopColor: 'rgba(46,158,77,0.25)',
          borderLeftColor: 'rgba(46,158,77,0.15)',
        }}
      />

      {/* Logo container */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, type: 'spring', stiffness: 180, damping: 18 }}
        style={{ position: 'relative', zIndex: 2, marginBottom: 28 }}
      >
        {/* Glow behind logo */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,158,77,0.18) 0%, transparent 70%)',
            filter: 'blur(12px)',
          }}
        />

        {/* Logo */}
        <motion.img
          src="/skillbridge-logo.svg"
          alt="SkillBridge"
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 96, height: 96, position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 20px rgba(46,158,77,0.3))' }}
        />
      </motion.div>

      {/* Brand name — letters stagger in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ position: 'relative', zIndex: 2, overflow: 'hidden' }}
      >
        {'SkillBridge'.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 + i * 0.045, duration: 0.4, ease: [0.2, 0, 0, 1] }}
            style={{
              display: 'inline-block',
              fontSize: '2.6rem',
              fontWeight: 800,
              letterSpacing: char === ' ' ? '0.3em' : '-0.02em',
              color: '#111827',
              fontFamily: "'Inter', system-ui, sans-serif",
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.45, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'relative', zIndex: 2,
          color: 'rgba(46,158,77,0.7)',
          fontSize: '0.9rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          fontFamily: "'Inter', system-ui, sans-serif",
          fontWeight: 500,
          marginTop: 8,
        }}
      >
        Connect · Learn · Grow
      </motion.p>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          position: 'absolute', bottom: 48, left: '50%', transform: 'translateX(-50%)',
          width: 200, zIndex: 2,
        }}
      >
        <div style={{ height: 2, background: 'rgba(46,158,77,0.12)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #2E9E4D, #3fcb65)' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'rgba(46,158,77,0.5)', fontSize: '0.7rem', textAlign: 'center', marginTop: 10, letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}
        >
          Loading your career journey...
        </motion.p>
      </motion.div>

      {/* Corner dots decoration */}
      {[['-20px', '-20px'], ['-20px', 'auto', 'auto', '-20px'], ['auto', '-20px', '-20px', 'auto'], ['auto', 'auto', '-20px', '-20px']].map((pos, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: pos[0], right: pos[1], bottom: pos[2], left: pos[3],
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,158,77,0.1) 0%, transparent 70%)',
          }}
        />
      ))}
    </motion.div>
  );
};

export default SplashScreen;
