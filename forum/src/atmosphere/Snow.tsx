import { useMemo, type CSSProperties } from "react";

type Layer = {
  count: number;
  className: string;
  sizeMin: number;
  sizeMax: number;
  durationMin: number;
  durationMax: number;
  drift: number;
  opacityMin: number;
  opacityMax: number;
  blur?: number;
};

/* ~22% fewer flakes than previous dense pass */
const LAYERS: Layer[] = [
  {
    count: 70,
    className: "snow__layer--far",
    sizeMin: 1.5,
    sizeMax: 3.8,
    durationMin: 15,
    durationMax: 28,
    drift: 45,
    opacityMin: 0.25,
    opacityMax: 0.55,
    blur: 0.5,
  },
  {
    count: 58,
    className: "snow__layer--mid",
    sizeMin: 2.8,
    sizeMax: 6,
    durationMin: 10,
    durationMax: 19,
    drift: 80,
    opacityMin: 0.4,
    opacityMax: 0.8,
  },
  {
    count: 42,
    className: "snow__layer--near",
    sizeMin: 4.5,
    sizeMax: 9.5,
    durationMin: 6.5,
    durationMax: 13,
    drift: 120,
    opacityMin: 0.55,
    opacityMax: 0.95,
  },
];

function seeded(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function Snow() {
  const layers = useMemo(
    () =>
      LAYERS.map((layer, layerIndex) =>
        Array.from({ length: layer.count }, (_, i) => {
          const idx = layerIndex * 200 + i + 1;
          const r = seeded(idx);
          const r2 = seeded(idx + 50);
          const r3 = seeded(idx + 90);
          const size = layer.sizeMin + r * (layer.sizeMax - layer.sizeMin);
          return {
            id: `${layerIndex}-${i}`,
            left: `${r * 100}%`,
            size,
            duration:
              layer.durationMin + r2 * (layer.durationMax - layer.durationMin),
            delay: -r3 * (layer.durationMax + 4),
            drift: `${(r2 - 0.5) * layer.drift}px`,
            opacity:
              layer.opacityMin + r * (layer.opacityMax - layer.opacityMin),
            blur: layer.blur,
            className: layer.className,
          };
        }),
      ),
    [],
  );

  return (
    <div className="snow" aria-hidden="true">
      {layers.map((flakes) =>
        flakes.map((f) => (
          <span
            key={f.id}
            className={`snow__flake ${f.className}`}
            style={
              {
                left: f.left,
                width: f.size,
                height: f.size,
                opacity: f.opacity,
                animationDuration: `${f.duration}s`,
                animationDelay: `${f.delay}s`,
                filter: f.blur ? `blur(${f.blur}px)` : undefined,
                "--drift": f.drift,
              } as CSSProperties
            }
          />
        )),
      )}
    </div>
  );
}
