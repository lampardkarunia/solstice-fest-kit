import { mkdir, readFile, writeFile } from "node:fs/promises";
import {
  ElementsError,
  formatDiagnostics,
  outline,
  render,
  validate,
} from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { emailClients, renderInEmailClients } from "@hyper-elements/email-clients";
import ConfirmationEmail from "./templates/ConfirmationEmail";
import TicketDocument from "./templates/TicketDocument";
import EventPage from "./templates/EventPage";
import ShareCard from "./templates/ShareCard";

/**
 * Build: validate every template, print the email's outline, then render
 * all four outputs into out/. Any error diagnostic stops the build.
 *
 * Fonts are loaded from the @fontsource packages (WOFF) and handed to the
 * PDF and image renderers — Hyper Elements loads no fonts by itself.
 */
const fontFile = (path: string) => readFile(path);

const fonts = [
  {
    family: "Archivo Black",
    src: await fontFile(
      "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff",
    ),
    weight: 400,
  },
  {
    // Archivo Black ships a single weight; headings ask for 700, so the
    // same file is registered at 700 to keep the renderers warning-free.
    family: "Archivo Black",
    src: await fontFile(
      "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff",
    ),
    weight: 700,
  },
  {
    family: "Space Grotesk",
    src: await fontFile(
      "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-400-normal.woff",
    ),
    weight: 400,
  },
  {
    family: "Space Grotesk",
    src: await fontFile(
      "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff",
    ),
    weight: 500,
  },
  {
    family: "Space Grotesk",
    src: await fontFile(
      "node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff",
    ),
    weight: 700,
  },
];

const templates = {
  "confirmation email": <ConfirmationEmail />,
  "pdf ticket": <TicketDocument />,
  "event page": <EventPage />,
  "share card": <ShareCard />,
};

let invalid = false;
for (const [name, element] of Object.entries(templates)) {
  const report = validate(element);
  console.log(`validate · ${name}: ${report.valid ? "valid" : "INVALID"}`);
  if (report.diagnostics.length > 0) console.log(formatDiagnostics(report.diagnostics));
  if (!report.valid) invalid = true;
}
if (invalid) {
  console.error("Build stopped: fix the errors above.");
  process.exit(1);
}

console.log("\noutline · confirmation email\n" + outline(templates["confirmation email"]));

// The email also gets the email-client checks: what classic Outlook, Gmail
// and Apple Mail remove or change, from @hyper-elements/email-clients.
const clientReport = validate(templates["confirmation email"], {
  plugins: [await emailClients()],
});
console.log(
  `\nvalidate · confirmation email in real clients: ${clientReport.valid ? "valid" : "INVALID"}`,
);
if (clientReport.diagnostics.length > 0) {
  console.log(formatDiagnostics(clientReport.diagnostics));
}
if (!clientReport.valid) {
  console.error("Build stopped: the email fails a client check.");
  process.exit(1);
}

await mkdir("out", { recursive: true });

try {
  const email = await render(templates["confirmation email"]);
  await writeFile("out/confirmation-email.html", email.html);
  await writeFile("out/confirmation-email.txt", email.text ?? "");
  console.log("\nwrote out/confirmation-email.html (+ .txt)");

  // One preview file per email client, drawn the way that client draws it.
  const clients = await renderInEmailClients(templates["confirmation email"], {
    emailClients: ["outlook", "gmail", "apple-mail"],
  });
  await mkdir("out/clients", { recursive: true });
  for (const preview of clients.previews) {
    await writeFile(`out/clients/${preview.filename}`, preview.html);
  }
  console.log(
    `wrote ${clients.previews.length} client previews to out/clients/ (${clients.previews
      .map((p) => p.filename)
      .join(", ")})`,
  );

  const page = await render(templates["event page"]);
  await writeFile("out/event-page.html", page.html);
  console.log("wrote out/event-page.html");

  const print = await render(templates["pdf ticket"]);
  await writeFile("out/ticket-print.html", print.html);
  const pdf = await renderPdf(templates["pdf ticket"], { fonts });
  await writeFile("out/ticket.pdf", pdf.pdf);
  if (pdf.diagnostics.length > 0) console.log(formatDiagnostics(pdf.diagnostics));
  console.log("wrote out/ticket-print.html + out/ticket.pdf");

  const png = await renderImage(templates["share card"], { fonts, scale: 2 });
  await writeFile("out/share-card.png", png.image);
  const svg = await renderImage(templates["share card"], { fonts, format: "svg" });
  await writeFile("out/share-card.svg", svg.image);
  if (png.diagnostics.length > 0) console.log(formatDiagnostics(png.diagnostics));
  console.log(`wrote out/share-card.png (${png.width}×${png.height}) + out/share-card.svg`);
} catch (error) {
  if (error instanceof ElementsError) {
    console.error(formatDiagnostics(error.diagnostics));
    process.exit(1);
  }
  throw error;
}

console.log("\nAll four outputs rendered.");
