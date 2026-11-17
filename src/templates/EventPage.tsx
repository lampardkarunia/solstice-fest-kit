import {
  Button,
  Column,
  Grid,
  Heading,
  LineBreak,
  Menu,
  Page,
  Row,
  Section,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import { Eyebrow, FooterNote, SetList, Wordmark } from "../components";
import { event, stages, tiers } from "../data";
import { amber, ink, paper, solstice } from "../theme";

/**
 * 3 of 4 — the public event page.
 *
 * The page the email's buttons point at. It renders the full SetList for
 * both stages (the email shows four sets), the tier table, and the same
 * wordmark and palette — a Page root instead of an Email root, nothing else
 * about the brand changes.
 */
export default function EventPage() {
  return (
    <Page
      theme={solstice}
      width={1020}
      title={`${event.name} — ${event.date}`}
      description={`${event.tagline} ${event.date}, ${event.venue}, ${event.city}.`}
      style={{ gap: 28 }}
    >
      <Section style={{ backgroundColor: ink, padding: [54, 40] }}>
        <Column style={{ gap: 18 }}>
          <Row style={{ alignItems: "center", justifyContent: "space-between" }}>
            <Wordmark dark />
            <Text style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: amber }}>
              {event.edition.toUpperCase()}
            </Text>
          </Row>
          <Heading level={1} style={{ fontSize: 54, color: paper, lineHeight: 1.04 }}>
            THE LONGEST DAY,
            <LineBreak />
            PLAYED LOUD.
          </Heading>
          <Text style={{ fontSize: 19, color: paper }}>
            {event.date} · {event.venue}, {event.city}. Two stages on a cliff above the surf,
            ten sets from first light of the afternoon to the small hours.
          </Text>
          <Row style={{ gap: 14 }}>
            <Button href={`${event.url}/passes`}>Get passes — from $39</Button>
            <Button
              href={`${event.url}/lineup`}
              style={{ backgroundColor: ink, color: amber, border: { width: 1.5, style: "solid", color: amber } }}
            >
              See the line-up
            </Button>
          </Row>
          <Text style={{ fontSize: 14, color: amber }}>{event.gates}</Text>
        </Column>
      </Section>

      <Section style={{ padding: [6, 40] }}>
        <Column style={{ gap: 16 }}>
          <Eyebrow>Running order</Eyebrow>
          <Heading level={2} style={{ color: ink }}>
            Two stages, no clashes after dark
          </Heading>
          <Grid columns={2} style={{ gap: 22 }}>
            {stages.map((stage) => (
              <Column key={stage.name} style={{ apply: ["card"] }}>
                <Heading level={3} style={{ color: ink }}>
                  {stage.name}
                </Heading>
                <Text style={{ fontSize: 14, color: token("colors.muted") }}>
                  {stage.tagline}
                </Text>
                <SetList sets={stage.sets} />
              </Column>
            ))}
          </Grid>
        </Column>
      </Section>

      <Section style={{ padding: [6, 40] }}>
        <Column style={{ apply: ["card"] }}>
          <Eyebrow>Passes</Eyebrow>
          <Heading level={2} style={{ color: ink }}>
            Pick your sunset
          </Heading>
          <Table
            style={{
              cellPadding: [10, 8],
              rowBorder: { width: 1, style: "solid", color: token("colors.border") },
            }}
          >
            <TableRow header>
              <TableCell>Pass</TableCell>
              <TableCell>What you get</TableCell>
              <TableCell style={{ textAlign: "right" }}>Price</TableCell>
            </TableRow>
            {tiers.map((tier) => (
              <TableRow key={tier.name}>
                <TableCell style={{ fontWeight: 700 }}>{tier.name}</TableCell>
                <TableCell>{tier.blurb}</TableCell>
                <TableCell style={{ textAlign: "right", fontWeight: 700 }}>
                  {tier.price}
                </TableCell>
              </TableRow>
            ))}
          </Table>
          <Text style={{ fontSize: 14, color: token("colors.muted") }}>
            Every pass includes both stages, free water stations and the 02:30 shuttle. Name
            changes are free until 13 June.
          </Text>
          <Button href={`${event.url}/passes`}>Buy a pass</Button>
        </Column>
      </Section>

      <Section style={{ padding: [6, 40] }}>
        <Grid columns={3} style={{ gap: 22 }}>
          <Column style={{ apply: ["card"], padding: 24 }}>
            <Heading level={3} style={{ color: ink }}>
              Getting there
            </Heading>
            <Text style={{ fontSize: 15 }}>
              Free shuttles from Canggu, Ubud and the airport every 40 minutes from 13:00.
              Scooter parking on site; no cars past the village gate.
            </Text>
          </Column>
          <Column style={{ apply: ["card"], padding: 24 }}>
            <Heading level={3} style={{ color: ink }}>
              Stay over
            </Heading>
            <Text style={{ fontSize: 15 }}>
              The lawn campsite opens Friday evening — pitch included with a Sunset Duo. Partner
              guesthouses in Uluwatu from $25 a night.
            </Text>
          </Column>
          <Column style={{ apply: ["card"], padding: 24 }}>
            <Heading level={3} style={{ color: ink }}>
              Good to know
            </Heading>
            <Text style={{ fontSize: 15 }}>
              Cashless site, free water everywhere, quiet room by the Dune Stage, and a lit —
              but steep — cliff path. Wear real shoes.
            </Text>
          </Column>
        </Grid>
      </Section>

      <Section style={{ backgroundColor: ink, padding: [30, 40] }}>
        <Column style={{ gap: 14, alignItems: "center" }}>
          <Wordmark dark />
          <Menu
            items={[
              { text: "Line-up", href: `${event.url}/lineup` },
              { text: "Passes", href: `${event.url}/passes` },
              { text: "Travel", href: `${event.url}/travel` },
              { text: "FAQ", href: `${event.url}/faq` },
            ]}
            separator="·"
            style={{ justifyContent: "center", fontSize: 14, color: paper }}
          />
          <Text style={{ fontSize: 12, color: amber, textAlign: "center" }}>
            {event.date} · {event.venue} · {event.city}
          </Text>
        </Column>
      </Section>

      <FooterNote />
    </Page>
  );
}
