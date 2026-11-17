import {
  Button,
  Column,
  Divider,
  Email,
  Heading,
  Link,
  List,
  ListItem,
  Menu,
  Section,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { Eyebrow, SetList, TicketFacts, Wordmark } from "../components";
import { attendee, event, goodToKnow, order, stages, ticket } from "../data";
import { amber, ink, paper, solstice } from "../theme";

/**
 * 1 of 4 — the confirmation email.
 *
 * Sent the moment a pass is bought. The dark ticket card inside it is the
 * same TicketFacts block the PDF ticket prints; the set list is the same
 * SetList the web page renders in full.
 */
export default function ConfirmationEmail() {
  return (
    <Email
      theme={solstice}
      width={600}
      title={`${event.name} — order confirmed`}
      previewText={`Your ${ticket.tier} for ${event.date} is confirmed. Code ${ticket.code}.`}
      style={{ gap: 20 }}
    >
      <Section style={{ backgroundColor: ink, padding: [26, 32] }}>
        <Column style={{ gap: 5 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              color: amber,
              textTransform: "uppercase",
            }}
          >
            Order confirmed
          </Text>
          <Wordmark dark />
        </Column>
      </Section>

      <Column style={{ apply: ["card"] }}>
        <Eyebrow>{event.edition}</Eyebrow>
        <Heading level={1}>
          You're in, {attendee.firstName}.
        </Heading>
        <Text>
          Two {ticket.tier} passes for <Span style={{ fontWeight: 700 }}>{event.date}</Span> at{" "}
          {event.venue} are yours. Show the code below — or the attached PDF pass — at{" "}
          {ticket.gate}. {event.gates}.
        </Text>

        <Column style={{ apply: ["darkCard"] }}>
          <Column style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: "'Archivo Black', 'Arial Black', Arial, sans-serif",
                fontSize: 19,
                color: paper,
              }}
            >
              {ticket.tier.toUpperCase()}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: 700, color: amber }}>
              {ticket.admits} · {event.dateShort}
            </Text>
          </Column>
          <Text style={{ color: paper, fontSize: 15 }}>
            Holder: <Span style={{ fontWeight: 700 }}>{ticket.holder}</Span>
          </Text>
          <TicketFacts dark />
        </Column>

        <Table
          style={{
            cellPadding: [7, 0],
            rowBorder: { width: 1, style: "solid", color: token("colors.border") },
          }}
        >
          <TableRow header>
            <TableCell>Order {order.id}</TableCell>
            <TableCell style={{ textAlign: "right" }}>Amount</TableCell>
          </TableRow>
          {order.items.map((item) => (
            <TableRow key={item.label}>
              <TableCell>{item.label}</TableCell>
              <TableCell style={{ textAlign: "right" }}>{item.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell style={{ fontWeight: 700 }}>Total paid</TableCell>
            <TableCell style={{ textAlign: "right", fontWeight: 700 }}>{order.total}</TableCell>
          </TableRow>
        </Table>

        <Button href={order.passUrl}>View your pass &amp; site map</Button>
      </Column>

      <Column style={{ apply: ["card"] }}>
        <Eyebrow>First sets to catch</Eyebrow>
        <Heading level={2}>{stages[0].name}</Heading>
        <SetList sets={stages[0].sets} limit={4} />
        <Text style={{ fontSize: 14 }}>
          Full running order for both stages lives on{" "}
          <Link href={event.url}>the festival page</Link> — the Dune Stage switches to silent
          disco at midnight.
        </Text>
      </Column>

      <Column style={{ apply: ["card"] }}>
        <Eyebrow>Good to know</Eyebrow>
        <List>
          {goodToKnow.map((line) => (
            <ListItem key={line}>{line}</ListItem>
          ))}
        </List>
        <Divider />
        <Text style={{ fontSize: 14 }}>
          Need to hand a pass to a friend? Name changes are free until 13 June from your{" "}
          <Link href={order.passUrl}>pass page</Link>.
        </Text>
      </Column>

      <Column style={{ gap: 10, alignItems: "center", padding: [4, 16] }}>
        <Menu
          items={[
            { text: "Line-up", href: `${event.url}/lineup` },
            { text: "Getting there", href: `${event.url}/travel` },
            { text: "FAQ", href: `${event.url}/faq` },
          ]}
          separator="·"
          style={{ justifyContent: "center", fontSize: 13 }}
        />
        <Text style={{ fontSize: 12, color: token("colors.muted"), textAlign: "center" }}>
          Solstice Fest Cooperative, Jl. Pantai Suluban 88, Uluwatu, {event.city}. You're
          receiving this because you bought a pass for {event.dateShort}.
        </Text>
      </Column>
    </Email>
  );
}
