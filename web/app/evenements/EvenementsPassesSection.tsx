"use client";

import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

type EvenementPasse = {
  id: string;
  titre: string;
  jour: string;
  mois: string;
  type: string;
  participants: number | null;
  photos: string[];
};

function PhotoModal({
  photos,
  titre,
  onClose,
}: {
  photos: string[];
  titre: string;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  }
  function next() {
    setCurrent((c) => (c + 1) % photos.length);
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-[#2d3235] border-2 border-b-0 border-[#2d3235] px-4 py-3">
          <span className="text-[#efeadd] font-black uppercase text-sm truncate pr-4">
            {titre}
          </span>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="text-[#5a5f63] text-xs font-mono">
              {current + 1} / {photos.length}
            </span>
            <button
              onClick={onClose}
              className="text-[#efeadd] hover:text-white p-1 border border-[#5a5f63] hover:border-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative border-2 border-[#2d3235] bg-black overflow-hidden aspect-video">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[current]}
            alt=""
            className="w-full h-full object-contain"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-[#2d3235]/80 hover:bg-[#2d3235] text-white p-2 border border-white/20 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#2d3235]/80 hover:bg-[#2d3235] text-white p-2 border border-white/20 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="flex gap-1.5 mt-1.5 overflow-x-auto pb-1">
            {photos.map((url, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={url}
                src={url}
                alt=""
                onClick={() => setCurrent(i)}
                className={`h-14 w-20 object-cover flex-shrink-0 cursor-pointer border-2 transition-all ${
                  i === current
                    ? "border-[#e8b056]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function EvenementsPassesSection({
  passes,
}: {
  passes: EvenementPasse[];
}) {
  const [modalEvent, setModalEvent] = useState<EvenementPasse | null>(null);

  return (
    <>
      <section className="w-full border-t-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8">Événements passés</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {passes.map((p) => (
              <div
                key={p.id}
                className="border-2 border-[#2d3235] p-5 hover:bg-[#efeadd] transition-colors"
              >
                <div className="text-xs text-[#5a5f63] uppercase tracking-widest mb-2">
                  {p.jour} {p.mois}
                </div>
                <h3 className="font-semibold leading-snug mb-2">{p.titre}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5a5f63]">{p.type}</span>
                  {p.participants && (
                    <span className="text-[#1d8f6d] font-semibold">
                      {p.participants} participants
                    </span>
                  )}
                </div>
                {p.photos.length > 0 && (
                  <button
                    onClick={() => setModalEvent(p)}
                    className="mt-3 flex items-center gap-1.5 text-xs font-bold uppercase text-[#2d3235] border-2 border-[#2d3235] px-3 py-1.5 hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Voir les photos ({p.photos.length})
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalEvent && (
        <PhotoModal
          photos={modalEvent.photos}
          titre={modalEvent.titre}
          onClose={() => setModalEvent(null)}
        />
      )}
    </>
  );
}
