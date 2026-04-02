"use client";

import { useState, useRef, useCallback } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  type Crop,
  type PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";

type Props = {
  onFileReady: (file: File) => void;
  currentUrl?: string | null;
  aspect?: number; // 1 = carré, undefined = libre
  label?: string;
};

function centerAspectCrop(width: number, height: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 80 }, aspect, width, height),
    width,
    height
  );
}

async function getCroppedBlob(
  image: HTMLImageElement,
  crop: PixelCrop
): Promise<File> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = Math.round(crop.width * scaleX);
  canvas.height = Math.round(crop.height * scaleY);
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height
  );
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject(new Error("Canvas vide"));
        resolve(new File([blob], "photo.jpg", { type: "image/jpeg" }));
      },
      "image/jpeg",
      0.92
    );
  });
}

export default function ImageCropUpload({
  onFileReady,
  currentUrl,
  aspect,
  label = "Photo",
}: Props) {
  const [srcUrl, setSrcUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const imgRef = useRef<HTMLImageElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSrcUrl(reader.result as string);
    reader.readAsDataURL(file);
    // reset input so same file can be re-sélectionné
    e.target.value = "";
  }

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      setCrop(aspect ? centerAspectCrop(width, height, aspect) : undefined);
    },
    [aspect]
  );

  async function handleApply() {
    if (!imgRef.current || !completedCrop) return;
    try {
      const file = await getCroppedBlob(imgRef.current, completedCrop);
      onFileReady(file);
      setSrcUrl(null);
    } catch {
      alert("Erreur lors du recadrage.");
    }
  }

  function handleCancel() {
    setSrcUrl(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  }

  return (
    <div>
      <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">
        {label}
      </label>

      {/* Aperçu photo actuelle */}
      {currentUrl && (
        <div className="mb-2 flex items-center gap-2">
          <Image
            src={currentUrl}
            alt="Photo actuelle"
            width={48}
            height={48}
            className="w-12 h-12 object-cover border-2 border-[#2d3235]"
          />
          <span className="text-xs text-[#5a5f63]">Photo actuelle</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-sm font-bold uppercase px-4 py-2 border-2 border-[#2d3235] bg-[#efeadd] hover:bg-white transition-colors"
      >
        {currentUrl ? "Changer la photo" : "Choisir une photo"}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        className="hidden"
      />

      {/* Modal de recadrage */}
      {srcUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#2d3235] shadow-[8px_8px_0px_#2d3235] max-w-2xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b-2 border-[#2d3235]">
              <h3 className="font-black uppercase text-[#2d3235]">
                Recadrer la photo
              </h3>
              {aspect && (
                <span className="text-xs text-[#5a5f63] border border-[#2d3235] px-2 py-0.5">
                  Format {aspect === 1 ? "carré" : `${aspect}:1`}
                </span>
              )}
            </div>

            {/* Zone de crop */}
            <div className="overflow-auto flex-1 flex items-center justify-center bg-[#2d3235] p-4">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                minWidth={50}
                minHeight={50}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  src={srcUrl}
                  alt="À recadrer"
                  onLoad={onImageLoad}
                  className="max-h-[50vh] max-w-full object-contain"
                />
              </ReactCrop>
            </div>

            {/* Actions */}
            <div className="flex gap-3 px-6 py-4 border-t-2 border-[#2d3235]">
              <button
                type="button"
                onClick={handleApply}
                disabled={!completedCrop?.width}
                className="bg-[#1d8f6d] text-white font-black uppercase px-6 py-2 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-40 text-sm"
              >
                Appliquer le recadrage
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="font-bold uppercase px-6 py-2 border-2 border-[#2d3235] text-[#2d3235] hover:bg-[#efeadd] transition-colors text-sm"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
