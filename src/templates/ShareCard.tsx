import { Canvas, Column, Heading, LineBreak, Row, Span, Text } from "@hyper-elements/react";
import { SunDisc, Wordmark } from "../components";
import { event, stages } from "../data";
import { amber, coral, ink, mutedOnInk, paper, solstice } from "../theme";

/**
 * 4 of 4 — the social / Open Graph card.
 *
 * A 1200×630 Canvas rendered to PNG with renderImage(). The sun is drawn
 * with Svg shapes (no image assets anywhere in this kit), the headliners
 * come from the same stage data the page prints in full.
 */
export default function ShareCard() {
  const headliners = stages[0].sets.slice(-3).map((s) => s.artist);
  return (
    <Canvas
      theme={solstice}
      width={1200}
      height={630}
      title={`${event.name} — ${event.date}`}
      style={{
        backgroundColor: ink,
        padding: [52, 60],
        gap: 26,
        justifyContent: "space-between",
      }}
    >
      <Row style={{ alignItems: "start", justifyContent: "space-between" }}>
        <Column style={{ gap: 20 }}>
          <Wordmark dark size={24} />
          <Heading
            level={1}
            style={{ fontSize: 96, color: paper, lineHeight: 0.98, letterSpacing: 0.5 }}
          >
            SOLSTICE
            <LineBreak />
            <Span style={{ color: amber }}>FEST</Span> ’27
          </Heading>
        </Column>
        <SunDisc size={218} />
      </Row>

      <Column style={{ gap: 14 }}>
        <Text style={{ fontSize: 15, fontWeight: 700, letterSpacing: 2.4, color: amber }}>
          {event.edition.toUpperCase()} — TWO STAGES · TEN SETS · ONE SUNSET
        </Text>
        <Text style={{ fontSize: 25, fontWeight: 700, color: paper, letterSpacing: 0.6 }}>
          {headliners.join("  ·  ")}
        </Text>
        <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 21, color: mutedOnInk }}>
            {event.date} — {event.venue}
          </Text>
          <Text
            style={{
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 1.6,
              color: coral,
              textTransform: "uppercase",
            }}
          >
            Passes live now
          </Text>
        </Row>
      </Column>
    </Canvas>
  );
}
