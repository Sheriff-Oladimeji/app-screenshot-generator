"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { toPng } from "html-to-image";

// ── Canvas dimensions (Play Store: 1080x1920 recommended) ──
const CANVAS_W = 1080;
const CANVAS_H = 1920;

const SIZES = [
  { label: "1080x1920", w: 1080, h: 1920 },
  { label: "1242x2208", w: 1242, h: 2208 },
  { label: "1440x2560", w: 1440, h: 2560 },
] as const;

// ── Phone mockup measurements ──
const MK_W = 1022;
const MK_H = 2082;
const SC_L = (52 / MK_W) * 100;
const SC_T = (46 / MK_H) * 100;
const SC_W = (918 / MK_W) * 100;
const SC_H = (1990 / MK_H) * 100;
const SC_RX = (126 / 918) * 100;
const SC_RY = (126 / 1990) * 100;

// ── Design tokens ──
const T = {
  bg: "#0C0B1A",
  bgAlt: "#130F2A",
  fg: "#F5F5F7",
  fgMuted: "#A1A1AA",
  accent: "#7C3AED",
  accentLight: "#A78BFA",
  accentGlow: "rgba(124, 58, 237, 0.3)",
  amber: "#F59E0B",
  green: "#22C55E",
};

// ── Phone Component ──
function Phone({
  src,
  alt,
  style,
  className = "",
}: {
  src: string;
  alt: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        aspectRatio: `${MK_W}/${MK_H}`,
        filter:
          "drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 60px rgba(124,58,237,0.35))",
        ...style,
      }}
    >
      <img
        src="/mockup.png"
        alt=""
        className="block w-full h-full"
        draggable={false}
      />
      <div
        className="absolute z-10 overflow-hidden"
        style={{
          left: `${SC_L}%`,
          top: `${SC_T}%`,
          width: `${SC_W}%`,
          height: `${SC_H}%`,
          borderRadius: `${SC_RX}% / ${SC_RY}%`,
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>
    </div>
  );
}

// ── Caption Component ──
function Caption({
  label,
  headline,
  align = "center",
}: {
  label?: string;
  headline: React.ReactNode;
  align?: "center" | "left" | "right";
}) {
  const textAlign = align;
  return (
    <div style={{ textAlign, width: "100%" }}>
      {label && (
        <div
          style={{
            fontSize: CANVAS_W * 0.048,
            fontWeight: 700,
            color: T.accentLight,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: CANVAS_W * 0.025,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          fontSize: CANVAS_W * 0.105,
          fontWeight: 800,
          color: T.fg,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          textShadow: "0 2px 30px rgba(0,0,0,0.5)",
        }}
      >
        {headline}
      </div>
    </div>
  );
}

// ── Decorative glow ──
function Glow({
  x,
  y,
  size,
  color = T.accentGlow,
}: {
  x: string;
  y: string;
  size: number;
  color?: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        pointerEvents: "none",
      }}
    />
  );
}

// ── Feature pill ──
function Pill({ icon, text }: { icon: string; text: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 12,
        background: "rgba(124, 58, 237, 0.12)",
        border: "1px solid rgba(124, 58, 237, 0.25)",
        borderRadius: 16,
        padding: "14px 24px",
        fontSize: CANVAS_W * 0.038,
        fontWeight: 600,
        color: T.fg,
      }}
    >
      <span style={{ fontSize: CANVAS_W * 0.038 }}>{icon}</span>
      {text}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════════════════

function Slide1() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
         background:
          "radial-gradient(ellipse at 50% 40%, #7C3AED 0%, #5B21B6 60%, #4C1D95 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inherit",
      }}
    >
      <Glow x="-15%" y="-10%" size={600} />
      <Glow x="60%" y="5%" size={500} color="rgba(167, 139, 250, 0.2)" />

      {/* App icon + name */}
      {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          marginTop: CANVAS_H * 0.05,
          zIndex: 2,
        }}
      >
        <img
          src="/app-icon.png"
          alt="Morso"
          style={{ width: 72, height: 72, borderRadius: 18 }}
        />
        <span
          style={{
            fontSize: CANVAS_W * 0.06,
            fontWeight: 800,
            color: T.fg,
          }}
        >
          Morso
        </span>
      </div> */}

      {/* Headline */}
      <div
        style={{
          marginTop: CANVAS_H * 0.06,
          paddingInline: CANVAS_W * 0.06,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Caption
          label="AI-Powered"
          headline={
            <>
              LEARN
              <br />
              <span>ANYTHING</span>
            </>
          }
        />
      </div>

      {/* Phone — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(14%)",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Phone src="/screenshots/create.png" alt="Home screen" />
      </div>
    </div>
  );
}
function Slide2() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        background: "linear-gradient(180deg, #6D28D9 0%, #4C1D95 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inherit",
      }}
    >
      <Glow x="10%" y="15%" size={500} color="rgba(167, 139, 250, 0.15)" />
      <Glow x="65%" y="-5%" size={400} />

      {/* Headline */}
      <div
        style={{
          marginTop: CANVAS_H * 0.06,
          paddingInline: CANVAS_W * 0.06,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Caption
          label="Learn"
          headline={
            <>
              <span>BITE-SIZED</span>
              <br />
              LESSONS
            </>
          }
        />
      </div>

      {/* Phone — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(14%)",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Phone src="/screenshots/lesson.png" alt="Lesson view" />
      </div>
    </div>
  );
}


function Slide3() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inherit",
      }}
    >
      <Glow x="-10%" y="5%" size={500} color="rgba(34, 197, 94, 0.15)" />
      <Glow x="60%" y="10%" size={400} />

      {/* Headline */}
      <div
        style={{
          marginTop: CANVAS_H * 0.06,
          paddingInline: CANVAS_W * 0.06,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Caption
          label="Quizzes"
          headline={
            <>
              TEST YOUR
              <br />
              <span>KNOWLEDGE</span>
            </>
          }
        />
      </div>

      {/* Phone — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(14%)",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Phone src="/screenshots/quiz.png" alt="Quiz" />
      </div>
    </div>
  );
}

function Slide4() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        background:
          "linear-gradient(180deg, #0F0A2E 0%, #1A1040 50%, #0F0A2E 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inherit",
      }}
    >
      <Glow x="30%" y="-5%" size={500} color="rgba(245, 158, 11, 0.15)" />
      <Glow x="-10%" y="30%" size={400} />

      {/* Headline */}
      <div
        style={{
          marginTop: CANVAS_H * 0.06,
          paddingInline: CANVAS_W * 0.06,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Caption
          label="Compete"
          headline={
            <>
              RISE UP
              <br />
              <span style={{ color: T.amber }}>THE RANKS</span>
            </>
          }
        />
      </div>

      {/* Phone — bottom center, achievements in front */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(14%)",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Phone src="/screenshots/leaderboard.png" alt="Achievements" />
      </div>
    </div>
  );
}

function Slide5() {
  return (
    <div
      style={{
        width: CANVAS_W,
        height: CANVAS_H,
        background:
          "linear-gradient(180deg, #0F0A2E 0%, #1A1040 50%, #0F0A2E 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "inherit",
      }}
    >
      <Glow x="55%" y="-5%" size={500} />

      {/* Headline — top center */}
      <div
        style={{
          marginTop: CANVAS_H * 0.06,
          paddingInline: CANVAS_W * 0.06,
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <Caption
          label="Track"
          headline={
            <>
              YOUR
              <br />
              <span style={{ color: T.amber }}>PROGRESS</span>
            </>
          }
        />
      </div>


      {/* Phone — bottom center */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(14%)",
          width: "70%",
          zIndex: 2,
        }}
      >
        <Phone src="/screenshots/profile.png" alt="Create course" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE REGISTRY
// ═══════════════════════════════════════════════════════════

const SLIDES = [
  { id: "create", label: "Create", Component: Slide1 },
  { id: "lessons", label: "Lessons", Component: Slide2 },
  { id: "quizzes", label: "Quizzes", Component: Slide3 },
  { id: "leaderboard", label: "Leaderboard", Component: Slide4 },
  { id: "progress", label: "Progress", Component: Slide5 },
];

// ═══════════════════════════════════════════════════════════
// PREVIEW + EXPORT
// ═══════════════════════════════════════════════════════════

function ScreenshotPreview({
  slide,
  index,
  selectedSize,
}: {
  slide: (typeof SLIDES)[number];
  index: number;
  selectedSize: (typeof SIZES)[number];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.2);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setScale(entry.contentRect.width / CANVAS_W);
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleExport = useCallback(async () => {
    const el = exportRef.current;
    if (!el) return;
    setExporting(true);

    try {
      const W = selectedSize.w;
      const H = selectedSize.h;

      el.style.left = "0px";
      el.style.opacity = "1";
      el.style.zIndex = "-1";
      el.style.transform = `scale(${W / CANVAS_W})`;
      el.style.transformOrigin = "top left";

      const opts = { width: W, height: H, pixelRatio: 1, cacheBust: true };
      await toPng(el, opts);
      const dataUrl = await toPng(el, opts);

      el.style.left = "-9999px";
      el.style.opacity = "";
      el.style.zIndex = "";
      el.style.transform = "";

      const link = document.createElement("a");
      link.download = `${String(index + 1).padStart(2, "0")}-${slide.id}-${W}x${H}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }, [selectedSize, index, slide.id]);

  const { Component } = slide;

  return (
    <div className="group">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 cursor-pointer"
        style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
        onClick={handleExport}
      >
        <div
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Component />
        </div>

        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white font-semibold text-sm px-4 py-2 bg-white/20 rounded-full backdrop-blur">
            {exporting ? "Exporting..." : "Click to Export"}
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-zinc-400 mt-2 font-medium">
        {String(index + 1).padStart(2, "0")} — {slide.label}
      </p>

      <div
        ref={exportRef}
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
          width: CANVAS_W,
          height: CANVAS_H,
        }}
      >
        <Component />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════

export default function ScreenshotsPage() {
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [exportingAll, setExportingAll] = useState(false);

  const exportAll = useCallback(async () => {
    setExportingAll(true);

    for (let i = 0; i < SLIDES.length; i++) {
      const slide = SLIDES[i];
      const el = document.querySelector(
        `[data-export="${slide.id}"]`
      ) as HTMLElement;
      if (!el) continue;

      const W = selectedSize.w;
      const H = selectedSize.h;

      el.style.left = "0px";
      el.style.opacity = "1";
      el.style.zIndex = "-1";
      el.style.transform = `scale(${W / CANVAS_W})`;
      el.style.transformOrigin = "top left";

      const opts = { width: W, height: H, pixelRatio: 1, cacheBust: true };
      await toPng(el, opts);
      const dataUrl = await toPng(el, opts);

      el.style.left = "-9999px";
      el.style.opacity = "";
      el.style.zIndex = "";
      el.style.transform = "";

      const link = document.createElement("a");
      link.download = `${String(i + 1).padStart(2, "0")}-${slide.id}-${W}x${H}.png`;
      link.href = dataUrl;
      link.click();

      await new Promise((r) => setTimeout(r, 300));
    }

    setExportingAll(false);
  }, [selectedSize]);

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "#09090B", color: "#F5F5F7" }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Morso — Play Store Screenshots</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Click any screenshot to export. {SLIDES.length} slides.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={`${selectedSize.w}x${selectedSize.h}`}
            onChange={(e) => {
              const s = SIZES.find(
                (sz) => `${sz.w}x${sz.h}` === e.target.value
              );
              if (s) setSelectedSize(s);
            }}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm"
          >
            {SIZES.map((s) => (
              <option key={s.label} value={`${s.w}x${s.h}`}>
                {s.label}
              </option>
            ))}
          </select>

          <button
            onClick={exportAll}
            disabled={exportingAll}
            className="bg-violet-600 hover:bg-violet-700 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            {exportingAll ? "Exporting..." : "Export All"}
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {SLIDES.map((slide, i) => (
          <ScreenshotPreview
            key={slide.id}
            slide={slide}
            index={i}
            selectedSize={selectedSize}
          />
        ))}
      </div>

      {/* Hidden export elements for Export All */}
      {SLIDES.map((slide) => (
        <div
          key={`export-${slide.id}`}
          data-export={slide.id}
          style={{
            position: "absolute",
            left: -9999,
            top: 0,
            width: CANVAS_W,
            height: CANVAS_H,
          }}
        >
          <slide.Component />
        </div>
      ))}
    </div>
  );
}
