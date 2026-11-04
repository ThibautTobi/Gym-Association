import type { CSSProperties, ReactNode } from "react";

export type WaveColor =
  "turquoise" | "pink" | "yellow" | "blue" | "white" | "transparent";

export type WavePosition = "top" | "bottom" | "both";

export interface WaveLayer {
  color: WaveColor | (string & {});
  height?: number;
  offsetX?: number;
  offsetY?: number;
  opacity?: number;
  flip?: boolean;
  phase?: number;
}

export interface WaveSeparatorProps {
  children: ReactNode;
  position?: WavePosition;
  topLayers?: WaveLayer[];
  bottomLayers?: WaveLayer[];
  backgroundColor?: string;
  topPadding?: number;
  bottomPadding?: number;
  className?: string;
}

const COLORS: Record<WaveColor, string> = {
  turquoise: "#25BFC0",
  pink: "#E95D9F",
  yellow: "#F5CB55",
  blue: "#174675",
  white: "#FFFFFF",
  transparent: "transparent",
};

const DEFAULT_TOP: WaveLayer[] = [
  { color: "turquoise", height: 65, opacity: 0.95 },
  {
    color: "pink",
    height: 48,
    offsetX: -25,
    offsetY: 10,
    opacity: 0.8,
    phase: 160,
  },
];

const DEFAULT_BOTTOM: WaveLayer[] = [
  {
    color: "blue",
    height: 65,
    opacity: 1,
    flip: true,
    phase: 120,
  },
  {
    color: "yellow",
    height: 42,
    offsetX: 25,
    offsetY: -5,
    opacity: 0.9,
    flip: true,
    phase: 280,
  },
];

function resolveColor(color: WaveLayer["color"]) {
  return color in COLORS ? COLORS[color as WaveColor] : color;
}

function Wave({ layer, edge }: { layer: WaveLayer; edge: "top" | "bottom" }) {
  const {
    color,
    height = 60,
    offsetX = 0,
    offsetY = 0,
    opacity = 1,
    flip = false,
    phase = 0,
  } = layer;

  const safeOpacity = Math.min(1, Math.max(0, opacity));
  const svgHeight = Math.max(1, height);

const style: CSSProperties = {
  position: "absolute",
  top: edge === "top" ? `${offsetY}px` : undefined,
  bottom: edge === "bottom" ? `${offsetY}px` : undefined,
  left: 0,
  right: 0,
  width: "100%",
  height: `${svgHeight}px`,
  opacity: safeOpacity,
  transform: flip ? "scaleY(-1)" : undefined,
  transformOrigin: "center",
};

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      className="pointer-events-none block"
      style={style}
    >
      <path
        d={`
          M ${-phase} 42
          C ${180 - phase} 95,
            ${340 - phase} 5,
            ${520 - phase} 42
          S ${860 - phase} 95,
            ${1040 - phase} 42
          S ${1280 - phase} 5,
            ${1440 - phase} 42
          L 1440 100
          L 0 100
          Z
        `}
        fill={resolveColor(color)}
      />
    </svg>
  );
}

export default function WaveSeparator({
  children,
  position = "both",
  topLayers = DEFAULT_TOP,
  bottomLayers = DEFAULT_BOTTOM,
  backgroundColor = "transparent",
  topPadding = 70,
  bottomPadding = 70,
  className = "",
}: WaveSeparatorProps) {
  const showTop = position === "top" || position === "both";
  const showBottom = position === "bottom" || position === "both";

  const topHeight = showTop
    ? Math.max(0, ...topLayers.map((layer) => layer.height ?? 60))
    : 0;

  const bottomHeight = showBottom
    ? Math.max(0, ...bottomLayers.map((layer) => layer.height ?? 60))
    : 0;

  return (
    <section
      className={`relative isolate w-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {showTop && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 w-full"
          style={{ height: `${topHeight}px` }}
        >
          {topLayers.map((layer, index) => (
            <Wave key={`top-${index}`} layer={layer} edge="top" />
          ))}
        </div>
      )}

      <div
        className="relative z-0"
        style={{
          paddingTop: showTop ? topPadding : undefined,
          paddingBottom: showBottom ? bottomPadding : undefined,
        }}
      >
        {children}
      </div>

      {showBottom && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full"
          style={{ height: `${bottomHeight}px` }}
        >
          {bottomLayers.map((layer, index) => (
            <Wave key={`bottom-${index}`} layer={layer} edge="bottom" />
          ))}
        </div>
      )}
    </section>
  );
}
