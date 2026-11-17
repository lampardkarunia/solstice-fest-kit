import {
  Column,
  Divider,
  Document,
  Heading,
  PageFooter,
  Row,
  Text,
} from "@hyper-elements/react";
import { Barcode, MetaPair, SunDisc, Wordmark } from "../components";
import { event, ticket } from "../data";
import { amber, ink, mutedOnInk, mutedOnPaper, paper, solstice } from "../theme";

/**
 * 2 of 4 — the printable pass.
 *
 * An A5 landscape Document rendered to PDF with renderPdf(). The stub on
 * the right is torn off at the gate; the barcode is drawn from the ticket
 * code with Svg rectangles, so no two passes print the same pattern.
 */
export default function TicketDocument() {
  return (
    <Document
      theme={solstice}
      size="A5"
      orientation="landscape"
      margin={30}
      title={`${event.name} — ${ticket.tier} — ${ticket.code}`}
      style={{ backgroundColor: paper }}
    >
      <Document.Page style={{ gap: 0 }}>
        <Row style={{ gap: 0 }}>
          <Column style={{ gap: 14, padding: [6, 22, 6, 2], flex: 1 }}>
            <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
              <Wordmark size={17} />
              <Text style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: amber }}>
                {event.edition.toUpperCase()}
              </Text>
            </Row>

            <Heading level={1} style={{ fontSize: 27, color: ink }}>
              {ticket.tier.toUpperCase()}
            </Heading>

            <Row style={{ gap: 26 }}>
              <MetaPair label="Holder" value={ticket.holder} valueSize={17} />
              <MetaPair label="Admits" value="2" valueSize={17} />
            </Row>
            <Row style={{ gap: 26 }}>
              <MetaPair label="Date" value={`${event.dateShort} · 14:00`} />
              <MetaPair label="Gate" value={ticket.gate} />
              <MetaPair label="Zone" value={ticket.zone} />
            </Row>

            <Column style={{ gap: 5 }}>
              <Barcode code={ticket.code} width={230} height={46} />
              <Text style={{ fontSize: 13, letterSpacing: 3, fontWeight: 700, color: ink }}>
                {ticket.code}
              </Text>
            </Column>

            <Column style={{ gap: 6 }}>
              <Divider />
              <Text style={{ fontSize: 11.5, color: mutedOnPaper }}>
                SOL STAGE from 15:30 — Senja Kala · The Paper Suns · Nara &amp; The Currents ·
                LUNAR YOUTH · AURORA VEIL · Midnight Cartel. Full running order for both stages
                on the festival page.
              </Text>
            </Column>
          </Column>

          <Column
            style={{
              width: 148,
              backgroundColor: ink,
              borderRadius: 12,
              padding: [16, 14],
              gap: 10,
              alignItems: "center",
            }}
          >
            <SunDisc size={62} />
            <Text
              style={{
                fontFamily: "'Archivo Black', 'Arial Black', Arial, sans-serif",
                fontSize: 15,
                color: paper,
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              ADMIT TWO
            </Text>
            <Text style={{ fontSize: 12, color: mutedOnInk, textAlign: "center" }}>
              {event.dateShort}
            </Text>
            <Text style={{ fontSize: 12, color: mutedOnInk, textAlign: "center" }}>
              {ticket.gate}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                color: amber,
                textAlign: "center",
              }}
            >
              {ticket.code}
            </Text>
            <Text style={{ fontSize: 10, color: mutedOnInk, textAlign: "center" }}>
              Stub — gate copy. Not valid alone after 22:00.
            </Text>
          </Column>
        </Row>
      </Document.Page>

      <PageFooter style={{ padding: [10, 0, 0, 0] }}>
        <Text style={{ fontSize: 9.5, color: mutedOnPaper }}>
          {event.name} · {event.venue}, {event.city} · This pass is a licence, revocable for
          unsafe behaviour. Name on pass must match photo ID. No re-entry after 22:00. In case of
          extreme weather the line-up may change; the longest day goes ahead rain or shine.
        </Text>
      </PageFooter>
    </Document>
  );
}
