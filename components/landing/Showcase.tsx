"use client";

import { useState } from "react";
import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Callout,
  Card,
  Calendar,
  ChatInput,
  ChatMessage,
  Checkbox,
  ConfirmButton,
  DatePicker,
  EmptyState,
  Field,
  FileItem,
  IconButton,
  Input,
  Kbd,
  NumberField,
  OTPInput,
  Pagination,
  Progress,
  Radio,
  Range,
  Select,
  Sidebar,
  Skeleton,
  SidebarGroup,
  SidebarItem,
  StatCard,
  Tag,
  Textarea,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  useToast,
} from "@cherry-design-system/react";
import {
  ArrowRight,
  ChartColumn,
  Copy,
  FileText,
  House,
  LayoutGrid,
  Palette,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { StaticToast } from "@/components/ui/StaticToast";
import { site } from "@/lib/site";
import { InstallSnippet } from "./InstallSnippet";
import styles from "./Showcase.module.css";

const TEAM = [
  "Ada Lovelace",
  "Alan Lee",
  "Grace Hopper",
  "Gus Hale",
  "Linus Ek",
  "Mia Chen",
  "Sam Ortiz",
];

function CardHeading({ title, text }: { title: string; text?: string }) {
  return (
    <div className={styles.heading}>
      <h3 className={styles.title}>{title}</h3>
      {text ? <p className={styles.text}>{text}</p> : null}
    </div>
  );
}

export function Showcase() {
  const toast = useToast();
  const [page, setPage] = useState(3);
  const [tags, setTags] = useState(["React", "Design", "A11y"]);
  const [files, setFiles] = useState(["brand-guidelines.pdf", "logo-pack.zip"]);

  const removeFile = (name: string) =>
    setFiles((f) => f.filter((n) => n !== name));

  return (
    <section
      id="components"
      className={styles.showcase}
      aria-labelledby="showcase-title"
    >
      <div className={styles.intro}>
        <h2 id="showcase-title" className={styles.h2}>
          Every piece, ready to compose.
        </h2>
        <p className={styles.lead}>
          More than 60 components, light and dark, accessible by default. A
          few of them, straight from the kit.
        </p>
      </div>

      <div className={styles.bento}>
        {/* Column 1 */}
        <div className={styles.col}>
          <Card variant="elevated" className={styles.card}>
            <div className={styles.row}>
              <Button size="sm" trailingIcon={<ArrowRight />}>
                Get started
              </Button>
              <Button size="sm" variant="secondary">
                Docs
              </Button>
              <Button size="sm" variant="outline">
                Share
              </Button>
            </div>
            <Input
              size="sm"
              leadingIcon={<Search />}
              placeholder="Search components…"
              aria-label="Search components"
            />
            <Textarea
              placeholder="Write a message…"
              aria-label="Message"
              rows={3}
              autoResize={false}
            />
            <div className={styles.between}>
              <div className={styles.row}>
                <Badge>Badge</Badge>
                <Badge variant="success" dot>
                  Live
                </Badge>
              </div>
              <div className={styles.choices}>
                <Radio value="on" aria-label="Radio option" defaultChecked />
                <Checkbox aria-label="Checkbox option" defaultChecked />
                <Toggle size="sm" aria-label="Switch option" defaultChecked />
              </div>
            </div>
            <div className={styles.between}>
              <ToggleGroup
                type="single"
                size="sm"
                defaultValue="week"
                aria-label="Date range"
              >
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
              </ToggleGroup>
              <span className={styles.trashSlot}>
                <ConfirmButton
                  aria-label="Delete draft"
                  wrapperClassName={styles.trashConfirm}
                  onConfirm={() =>
                    toast.show("Draft deleted", { color: "success" })
                  }
                />
              </span>
            </div>
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Notifications"
              text="Choose what reaches your inbox."
            />
            <div className={styles.stack}>
              <Toggle size="sm" label="Product updates" defaultChecked />
              <Toggle size="sm" label="Weekly digest" />
              <Toggle size="sm" label="Security alerts" defaultChecked />
            </div>
          </Card>

          <Card variant="elevated" className={styles.card}>
            <Sidebar navLabel="Workspace demo" className={styles.sidebar}>
              <SidebarGroup label="Workspace">
                <SidebarItem icon={<House />} active>
                  Home
                </SidebarItem>
                <SidebarItem icon={<LayoutGrid />} badge="12">
                  Components
                </SidebarItem>
                <SidebarItem icon={<Palette />}>Theming</SidebarItem>
                <SidebarItem icon={<ChartColumn />}>Analytics</SidebarItem>
              </SidebarGroup>
            </Sidebar>
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading title="Team" text="4 people, 3 skills." />
            <AvatarGroup max={4} aria-label="Team members">
              {TEAM.map((name, i) => (
                <Avatar
                  key={name}
                  name={name}
                  color={i % 2 === 0 ? "ai" : "neutral"}
                />
              ))}
            </AvatarGroup>
            <div className={styles.row}>
              {tags.map((tag) => (
                <Tag
                  key={tag}
                  variant={
                    tag === "React"
                      ? "neutral"
                      : tag === "Design"
                        ? "accent"
                        : "outline"
                  }
                  onRemove={
                    tag === "A11y"
                      ? () => setTags((t) => t.filter((x) => x !== tag))
                      : undefined
                  }
                >
                  {tag}
                </Tag>
              ))}
            </div>
            <div className={styles.between}>
              <span className={styles.text}>Search anything</span>
              <Kbd>⌘K</Kbd>
            </div>
          </Card>
        </div>

        {/* Column 2 */}
        <div className={styles.col}>
          <StatCard
            className={styles.stat}
            label="Monthly active users"
            value="12,480"
            delta="+12.4%"
            trend="up"
            deltaLabel="vs last month"
            data={[6, 7, 6.5, 8, 7.4, 9, 8.6, 10.2, 9.8, 11.5, 12.48]}
          />

          <Card variant="elevated" className={styles.card}>
            <CardHeading title="Storage" text="6.4 GB of 10 GB used." />
            <Progress label="Uploading assets…" value={60} showValue />
            <Progress
              label="Upload complete"
              value={100}
              showValue
              variant="success"
            />
          </Card>

          <ClientOnly fallback={<Skeleton shape="rect" height={318} />}>
            <Calendar
              locale="en-US"
              weekStartsOn={1}
              defaultValue={new Date(2026, 10, 27)}
              fullWidth
              aria-label="Calendar"
            />
          </ClientOnly>

          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Uploads"
              text="Brand assets for the launch."
            />
            {files.includes("brand-guidelines.pdf") ? (
              <FileItem
                name="brand-guidelines.pdf"
                bytes={2_400_000}
                status="uploading"
                progress={64}
                onRemove={() => removeFile("brand-guidelines.pdf")}
              />
            ) : null}
            {files.includes("logo-pack.zip") ? (
              <FileItem
                name="logo-pack.zip"
                bytes={2_400_000}
                status="complete"
                onRemove={() => removeFile("logo-pack.zip")}
              />
            ) : null}
          </Card>
        </div>

        {/* Column 3 */}
        <div className={styles.col}>
          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Create a project"
              text="Pick a name, a team and a deadline."
            />
            <Field label="Project name">
              <Input placeholder="Acme website" autoComplete="off" />
            </Field>
            <Field label="Team">
              <Select defaultValue="design">
                <option value="design">Design</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
              </Select>
            </Field>
            <Field label="Deadline">
              <ClientOnly fallback={<Skeleton shape="rect" height={36} />}>
                <DatePicker locale="en-US" fullWidth />
              </ClientOnly>
            </Field>
            <div className={styles.row}>
              <Button variant="outline" className={styles.grow}>
                Cancel
              </Button>
              <Button
                className={styles.grow}
                onClick={() =>
                  toast.show("Project created", { color: "success" })
                }
              >
                Create
              </Button>
            </div>
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Trip budget"
              text="Set a limit and the number of travellers."
            />
            <Range aria-label="Budget limit" defaultValue={40} />
            <div className={styles.between}>
              <span id="travellers-label" className={styles.label}>
                Travellers
              </span>
              <NumberField
                aria-labelledby="travellers-label"
                min={1}
                max={8}
                defaultValue={2}
                wrapperClassName={styles.number}
              />
            </div>
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Verify your email"
              text="Enter the 6-digit code we sent to ada@example.com."
            />
            <OTPInput
              length={6}
              separator
              defaultValue="428"
              aria-label="Verification code"
            />
          </Card>

          <StaticToast
            title="Changes saved"
            description="Your profile is up to date."
          />
          <Callout variant="info">Light and dark switch with one class.</Callout>
        </div>

        {/* Column 4 */}
        <div className={styles.col}>
          <Card variant="elevated" className={styles.card}>
            <EmptyState
              className={styles.empty}
              headingLevel={3}
              title="No projects yet"
              description="Create your first project to start building with cherry."
              actions={
                <>
                  <Button>New project</Button>
                  <Button variant="outline">Learn more</Button>
                </>
              }
            />
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading
              title="Get started"
              text="One package, one stylesheet."
            />
            <InstallSnippet
              command="pnpm add @cherry-design-system/react"
              location="showcase"
            />
            <Pagination
              className={styles.pagination}
              variant="compact"
              page={page}
              totalPages={10}
              onPageChange={setPage}
              labels={{ nav: "Showcase pagination" }}
            />
          </Card>

          <Card variant="elevated" className={styles.card}>
            <CardHeading title="Assistant" />
            <ChatMessage role="user" still>
              How do I add a brand color?
            </ChatMessage>
            <ChatMessage
              role="assistant"
              still
              avatar={
                <Avatar
                  size="sm"
                  color="ai"
                  icon={<Sparkles />}
                  aria-hidden="true"
                />
              }
              actions={
                <>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Copy message"
                    icon={<Copy />}
                  />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Regenerate reply"
                    icon={<RotateCcw />}
                  />
                </>
              }
            >
              Pass one hex to createBrand(). cherry derives hover, tint and
              focus colors for light and dark, as plain CSS.
            </ChatMessage>
            <ChatInput
              glow
              placeholder="Ask anything about cherry…"
              aria-label="Message the showcase assistant"
              onSend={() =>
                toast.show("This one is just for show", {
                  description: "Try the assistant at the top of the page.",
                })
              }
              actions={
                <>
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Attach a file"
                    icon={<Plus />}
                  />
                  <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label="Add context"
                    icon={<FileText />}
                  />
                </>
              }
            />
          </Card>
        </div>

        <div className={styles.fade} aria-hidden="true" />
        <div className={styles.cta}>
          <ButtonLink
            size="lg"
            href={site.links.playground}
            trailingIcon={<ArrowRight />}
          >
            Open the playground
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
