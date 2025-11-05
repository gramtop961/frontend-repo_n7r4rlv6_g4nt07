import { useEffect, useMemo, useRef, useState } from "react";
import { Palette, Image as ImageIcon, Music2, Play, Pause } from "lucide-react";

const sampleImages = [
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518098268026-4e89f1a2cd8e?q=80&w=1200&auto=format&fit=crop",
];

// Tiny beep sounds encoded as data URIs (wav)
const sounds = [
  {
    name: "Chime",
    url:
      "data:audio/wav;base64,UklGRjQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQgAAAAA//8AAP//AAD//wAA//8AAP//AAD//wAA",
  },
  {
    name: "Ping",
    url:
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQgAAAAA////AP///wD///8A////AP///wD///8A",
  },
];

export default function TemplateDesigner({ template, onChange }) {
  const [local, setLocal] = useState(template);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setLocal(template);
  }, [template]);

  const handleColor = (color) => {
    const next = { ...local, primaryColor: color };
    setLocal(next);
    onChange(next);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const next = { ...local, imageUrl: String(reader.result) };
      setLocal(next);
      onChange(next);
    };
    reader.readAsDataURL(file);
  };

  const handleSoundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const next = { ...local, soundUrl: url };
    setLocal(next);
    onChange(next);
  };

  const gradientOverlay = useMemo(
    () => ({
      background:
        "linear-gradient(to top, rgba(15,23,42,0.6), rgba(15,23,42,0.2))",
    }),
    []
  );

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="space-y-6">
        {/* Color Picker */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg grid place-items-center bg-slate-900/5">
              <Palette className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="font-semibold text-slate-800">Colors</h3>
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            {[
              "#6366F1",
              "#06B6D4",
              "#10B981",
              "#F59E0B",
              "#EF4444",
              "#8B5CF6",
            ].map((c) => (
              <button
                key={c}
                onClick={() => handleColor(c)}
                className="h-9 w-9 rounded-full ring-2 ring-offset-2 ring-transparent hover:ring-slate-300"
                style={{ backgroundColor: c }}
                aria-label={`Set primary color ${c}`}
              />
            ))}
            <div className="flex items-center gap-2 ml-1">
              <input
                type="color"
                value={local.primaryColor}
                onChange={(e) => handleColor(e.target.value)}
                className="h-9 w-12 rounded cursor-pointer bg-white border border-slate-200"
                aria-label="Custom color"
              />
              <span className="text-sm text-slate-600">Custom</span>
            </div>
          </div>
        </div>

        {/* Image Picker */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg grid place-items-center bg-slate-900/5">
              <ImageIcon className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="font-semibold text-slate-800">Cover Image</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {sampleImages.map((src) => (
              <button
                key={src}
                onClick={() => onChange({ ...local, imageUrl: src })}
                className={`relative aspect-video rounded-lg overflow-hidden border ${
                  local.imageUrl === src
                    ? "border-indigo-500 ring-2 ring-indigo-200"
                    : "border-slate-200"
                }`}
                aria-label="Choose sample image"
              >
                <img src={src} alt="Sample" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white text-sm cursor-pointer hover:bg-slate-800">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            Upload Image
          </label>
        </div>

        {/* Sound Picker */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg grid place-items-center bg-slate-900/5">
              <Music2 className="h-5 w-5 text-slate-700" />
            </div>
            <h3 className="font-semibold text-slate-800">Sound</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {sounds.map((s) => (
              <button
                key={s.name}
                onClick={() => onChange({ ...local, soundUrl: s.url })}
                className={`px-3 py-2 rounded-md border text-sm ${
                  local.soundUrl === s.url
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white text-sm cursor-pointer hover:bg-slate-800">
              <input type="file" accept="audio/*" onChange={handleSoundUpload} className="hidden" />
              Upload Sound
            </label>
            <button
              onClick={togglePlay}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" /> Stop Preview
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Play Preview
                </>
              )}
            </button>
            <audio
              ref={audioRef}
              src={local.soundUrl || sounds[0].url}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        <div className="relative aspect-[4/3]">
          <img
            src={
              local.imageUrl ||
              "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop"
            }
            alt="Invitation cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={gradientOverlay}
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <div className="max-w-md">
              <span
                className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur text-slate-800"
                style={{ color: local.primaryColor }}
              >
                • You are invited
              </span>
              <h3 className="mt-3 text-white text-3xl font-semibold drop-shadow-sm">
                Celebration Night 2025
              </h3>
              <p className="text-white/90 text-sm mt-1">
                Sat, Dec 20 · 7:00 PM · Grand Hall
              </p>
              <div className="mt-4 flex gap-2">
                <button
                  className="px-4 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: local.primaryColor }}
                >
                  RSVP Now
                </button>
                <button className="px-4 py-2 rounded-md bg-white/90 text-slate-800 font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            Primary color
            <span
              className="inline-block h-4 w-4 rounded ml-2 align-middle border border-slate-200"
              style={{ backgroundColor: local.primaryColor }}
            />
          </div>
          <div className="text-sm text-slate-500">Live preview</div>
        </div>
      </div>
    </section>
  );
}
