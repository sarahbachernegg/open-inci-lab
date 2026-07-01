"use client";

import { useEffect, useMemo, useState } from "react";
import { createWorker, PSM } from "tesseract.js";
import {
  extractIngredientsFromOcr,
  matchIngredientsFromText,
  type IngredientMatch,
} from "../lib/ingredients";

async function preprocessImage(file: File): Promise<string> {
  const imageUrl = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const maxWidth = 1800;
      const scale = Math.min(maxWidth / image.width, 1);
      const width = Math.round(image.width * scale);
      const height = Math.round(image.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not prepare image for OCR."));
        return;
      }

      ctx.drawImage(image, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const gray =
          0.299 * data[i] +
          0.587 * data[i + 1] +
          0.114 * data[i + 2];

        const contrast = gray > 145 ? 255 : 0;

        data[i] = contrast;
        data[i + 1] = contrast;
        data[i + 2] = contrast;
      }

      ctx.putImageData(imageData, 0, 0);

      URL.revokeObjectURL(imageUrl);
      resolve(canvas.toDataURL("image/png"));
    };

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error("Could not load image."));
    };

    image.src = imageUrl;
  });
}

export default function Home() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [rawText, setRawText] = useState("");
  const [matches, setMatches] = useState<IngredientMatch[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractedIngredients = useMemo(() => {
    if (!rawText) return [];
    return extractIngredientsFromOcr(rawText);
  }, [rawText]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setError(null);
    setRawText("");
    setMatches([]);
    setFileName(file.name);
    setImagePreview(previewUrl);
    setIsScanning(true);

    let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

    try {
      const processedImage = await preprocessImage(file);

      worker = await createWorker("eng");

      await worker.setParameters({
        preserve_interword_spaces: "1",
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });

      const result = await worker.recognize(processedImage);
      const text = result.data.text;

      setRawText(text);
      setMatches(matchIngredientsFromText(text));
    } catch (err) {
      console.error(err);
      setError("The image could not be read. Try a sharper, well-lit label photo.");
    } finally {
      await worker?.terminate().catch(() => undefined);
      setIsScanning(false);
    }
  }

  const matched = matches.filter((item) => item.match);
  const unmatched = matches.filter((item) => !item.match);

  return (
    <main className="page">
      <div className="container">
        <div className="topbar">
          <span>
            <span className="status-dot" />
            Local OCR workspace
          </span>
          <span>No brand detection · No scoring</span>
        </div>

        <section className="hero">
          <div className="hero-grid">
            <div>
              <p className="kicker">Open INCI Lab</p>
              <h1>Read ingredient labels without the beauty noise.</h1>
              <p className="hero-text">
                A localhost-first tool for parsing cosmetic ingredient lists.
                Upload a label, extract the INCI text, and match ingredients
                against your own knowledge base.
              </p>
            </div>

            <aside className="upload-panel">
              <p className="upload-title">Input</p>

              <label className="upload-button">
                Upload label image
                <input type="file" accept="image/*" onChange={handleImageUpload} />
              </label>

              <p className="file-name">
                {fileName
                  ? fileName
                  : "Choose a clear photo of the ingredient list."}
              </p>
            </aside>
          </div>

          {error && <div className="error">{error}</div>}

          {isScanning && (
            <div className="notice">
              Reading the label locally. Preprocessing image and running OCR.
            </div>
          )}
        </section>

        <section className="workspace">
          <div className="stack">
            <article className="card">
              <div className="card-head">
                <h2 className="card-title">Image</h2>
                {imagePreview && <span className="meta-pill">local file</span>}
              </div>

              <div className="image-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Uploaded ingredient label" />
                ) : (
                  <span>No image uploaded yet.</span>
                )}
              </div>
            </article>

            <article className="card">
              <div className="card-head">
                <h2 className="card-title">Extracted ingredients</h2>
                <span className="meta-pill">{extractedIngredients.length}</span>
              </div>

              {extractedIngredients.length === 0 ? (
                <p className="empty">No ingredients detected yet.</p>
              ) : (
                <div className="pills">
                  {extractedIngredients.map((ingredient) => (
                    <span key={ingredient} className="pill">
                      {ingredient}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </div>

          <article className="card">
            <div className="card-head">
              <div>
                <h2 className="card-title">Ingredient matches</h2>
                <p className="results-meta">
                  {matched.length} found · {unmatched.length} unknown
                </p>
              </div>
            </div>

            {matches.length === 0 ? (
              <p className="empty">
                Matched ingredients will appear here after a scan.
              </p>
            ) : (
              <div className="result-list">
                {matches.map(({ input, match }) => (
                  <article key={input} className="result-card">
                    <div className="result-top">
                      <div>
                        <p className="ocr-label">OCR: {input}</p>
                        <h3>{match?.inci_name ?? input}</h3>
                      </div>

                      <span
                        className={`match-pill ${match ? "found" : "unknown"}`}
                      >
                        {match ? "found" : "unknown"}
                      </span>
                    </div>

                    {match ? (
                      <>
                        <p className="result-text">{match.short_description}</p>

                        <details className="details">
                          <summary>Long description</summary>
                          <p>{match.long_description}</p>
                        </details>
                      </>
                    ) : (
                      <p className="result-text">
                        Not found in the local mock database yet.
                      </p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </article>
        </section>

        {rawText && (
          <section className="card" style={{ marginTop: 22 }}>
            <div className="card-head">
              <h2 className="card-title">Raw OCR text</h2>
            </div>
            <pre className="raw-text">{rawText}</pre>
          </section>
        )}
      </div>
    </main>
  );
}