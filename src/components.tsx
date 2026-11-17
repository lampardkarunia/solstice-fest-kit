import { Circle, Column, Divider, Heading, Polygon, Rect, Row, Span, Svg, Text } from "@hyper-elements/react";
import { event, ticket } from "./data";
import { amber, coral, ink, mutedOnInk, mutedOnPaper, paper } from "./theme";

/** The festival wordmark: name in the display face, amber sun dot. */
export function Wordmark({ dark = false, size = 21 }: { dark?: boolean; size?: number }) {
  return (
    <Text
      style={{
        fontFamily: "'Archivo Black', 'Arial Black', Arial, sans-serif",
        fontSize: size,
        letterSpacing: 1.2,
        color: dark ? paper : ink,
      }}
    >
      SOLSTICE
      <Span style={{ color: amber }}>•</Span>
      <Span style={{ color: coral }}>FEST</Span>
    </Text>
  );
}

/** Small caps section label used across every format. */
export function Eyebrow({ children, color }: { children: string; color?: string }) {
  return (
    <Text style={{ apply: ["eyebrow"], ...(color ? { color } : {}) }}>{children}</Text>
  );
}

/** One label/value pair of ticket metadata (date, gate, zone, code…). */
export function MetaPair({
  label,
  value,
  dark = false,
  valueSize = 16,
}: {
  label: string;
  value: string;
  dark?: boolean;
  valueSize?: number;
}) {
  return (
    <Column style={{ gap: 3 }}>
      <Text style={{ apply: ["metaLabel"], color: dark ? mutedOnInk : mutedOnPaper }}>
        {label}
      </Text>
      <Text style={{ fontWeight: 700, fontSize: valueSize, color: dark ? paper : ink }}>
        {value}
      </Text>
    </Column>
  );
}

/** The four facts every ticket surface repeats, in a two-by-two grid. */
export function TicketFacts({ dark = false }: { dark?: boolean }) {
  return (
    <Column style={{ gap: 14 }}>
      <Row style={{ gap: 20 }}>
        <MetaPair label="Date" value={event.dateShort} dark={dark} />
        <MetaPair label="Gate" value={ticket.gate} dark={dark} />
      </Row>
      <Row style={{ gap: 20 }}>
        <MetaPair label="Zone" value={ticket.zone} dark={dark} />
        <MetaPair label="Code" value={ticket.code} dark={dark} />
      </Row>
    </Column>
  );
}

/** One stage's set list: time column + artist, hairline between rows. */
export function SetList({
  sets,
  dark = false,
  limit,
}: {
  sets: { time: string; artist: string; note?: string }[];
  dark?: boolean;
  limit?: number;
}) {
  const rows = limit ? sets.slice(0, limit) : sets;
  return (
    <Column style={{ gap: 0 }}>
      {rows.map((set, i) => (
        <Column key={set.artist} style={{ gap: 0 }}>
          {i > 0 ? <Divider /> : null}
          <Row style={{ gap: 16, padding: [9, 0] }}>
            <Text
              style={{
                width: 52,
                fontWeight: 700,
                color: coral,
                fontSize: 15,
              }}
            >
              {set.time}
            </Text>
            <Column style={{ gap: 1 }}>
              <Text style={{ fontWeight: 700, fontSize: 16, color: dark ? paper : ink }}>
                {set.artist}
              </Text>
              {set.note ? (
                <Text style={{ fontSize: 13, color: dark ? mutedOnInk : mutedOnPaper }}>
                  {set.note}
                </Text>
              ) : null}
            </Column>
          </Row>
        </Column>
      ))}
    </Column>
  );
}

/**
 * A scannable-looking barcode drawn from the ticket code itself:
 * each character seeds a bar width, so every pass prints a unique pattern.
 * Svg is not an email element — this is used by the PDF ticket and the card.
 */
export function Barcode({
  code,
  width = 216,
  height = 52,
  color = ink,
}: {
  code: string;
  width?: number;
  height?: number;
  color?: string;
}) {
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  const seed = code.replace(/[^A-Z0-9]/g, "");
  for (let i = 0; i < seed.length && x < width - 6; i++) {
    const c = seed.charCodeAt(i);
    const w = (c % 3) + 1.4;
    const gap = (c % 2) + 1.6;
    bars.push({ x, w });
    x += w + gap;
    if (c % 4 === 0 && x < width - 10) {
      bars.push({ x, w: 3.6 });
      x += 3.6 + 2.2;
    }
  }
  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} title={`Barcode for ${code}`}>
      {bars.map((bar, i) => (
        <Rect key={i} x={bar.x} y={0} width={bar.w} height={height} style={{ fill: color }} />
      ))}
    </Svg>
  );
}

/** The amber sun disc, drawn — never an image file — for card and ticket. */
export function SunDisc({ size = 240, color = amber }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" title="Solstice sun">
      <Polygon points="50,2 57,18 50,14 43,18" style={{ fill: color }} />
      <Circle cx={50} cy={54} r={30} style={{ fill: color }} />
      <Rect x={8} y={88} width={84} height={3.4} style={{ fill: color }} />
      <Rect x={20} y={94} width={60} height={3.4} style={{ fill: color }} />
    </Svg>
  );
}

/** Shared sign-off line for the lighter surfaces. */
export function FooterNote() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ fontSize: 12, color: mutedOnPaper, textAlign: "center" }}>
        {event.name} · {event.venue} · {event.city}
      </Text>
      <Text style={{ fontSize: 12, color: mutedOnPaper, textAlign: "center" }}>
        One data model, four formats — built with Hyper Elements.
      </Text>
    </Column>
  );
}

export function PassHeading() {
  return (
    <Heading level={2} style={{ color: ink }}>
      {ticket.tier}
    </Heading>
  );
}
