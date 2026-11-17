import { defineTheme } from "@hyper-elements/react";

/**
 * The Solstice brand, written once.
 *
 * Every root (Email, Page, Document, Canvas) takes this theme, so the
 * sunset palette and the two display faces stay identical across the
 * inbox, the printed ticket, the web page and the social card.
 *
 * Palette: deep plum ink, warm cream paper, amber sun, coral signal.
 */
export const ink = "#171021";
export const inkSoft = "#2a1e3f";
export const paper = "#fffaf0";
export const sand = "#f4ead8";
export const amber = "#ffb43a";
export const coral = "#ff5a3c";
export const mutedOnPaper = "#7d7268";
export const mutedOnInk = "#b8aed0";
export const lineOnPaper = "#e6d9c3";

export const solstice = defineTheme({
  colors: {
    background: sand,
    foreground: "#241a38",
    primary: coral,
    primaryForeground: "#ffffff",
    muted: mutedOnPaper,
    border: lineOnPaper,
  },
  fonts: {
    heading: "'Archivo Black', 'Arial Black', Arial, sans-serif",
    body: "'Space Grotesk', 'Segoe UI', Arial, sans-serif",
  },
  fontSizes: { body: 16 },
  lineHeights: { body: 1.55 },
  elements: {
    Heading: {
      by: {
        level: {
          1: { fontSize: 34, lineHeight: 1.12, mobile: { fontSize: 27 } },
          2: { fontSize: 23, lineHeight: 1.2, mobile: { fontSize: 20 } },
          3: { fontSize: 17, lineHeight: 1.3 },
        },
      },
    },
    Button: {
      borderRadius: 999,
      padding: [13, 26],
      fontWeight: 700,
      letterSpacing: 0.4,
      hover: { backgroundColor: "#e04a2e" },
    },
    Divider: { borderTop: { width: 1, style: "solid", color: lineOnPaper } },
  },
  styles: {
    card: {
      backgroundColor: paper,
      borderRadius: 16,
      padding: 32,
      gap: 18,
    },
    darkCard: {
      backgroundColor: ink,
      color: paper,
      borderRadius: 16,
      padding: 28,
      gap: 14,
    },
    eyebrow: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2.4,
      textTransform: "uppercase",
      color: coral,
    },
    metaLabel: {
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.8,
      textTransform: "uppercase",
    },
  },
});
