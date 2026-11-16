import React, { useEffect, useRef } from 'react';

export default function FloatingPetalsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(32, Math.floor(window.innerWidth / 40));
    const particles = [];

    // Realistic rose petals, marigold petals, and gold stardust
    const colors = [
      'rgba(212, 175, 101, 0.45)', // Gold stardust
      'rgba(104, 28, 43, 0.35)',   // Royal Maroon petal
      'rgba(234, 179, 8, 0.35)',   // Golden Marigold petal
      'rgba(243, 220, 165, 0.5)',  // Light gold
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 5 + Math.random() * 9,
        vx: -0.4 + Math.random() * 0.8,
        vy: 0.6 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        vRot: -1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.35 ? 'petal' : 'stardust'
      });
    }

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        if (p.type === 'petal') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(p.size, -p.size, p.size * 2, 0);
          ctx.quadraticCurveTo(p.size, p.size, 0, 0);
          ctx.fill();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.28, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-30" 
      aria-hidden="true" 
    />
  );
}

