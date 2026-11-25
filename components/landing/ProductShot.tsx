"use client";

import { useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Button,
  Callout,
  Card,
  ChatInput,
  ChatMessage,
  ChatMessageList,
  ChatPanel,
  ChatSource,
  ChatSources,
  ChatTyping,
  Field,
  IconButton,
  Input,
  Select,
  Toggle,
  useToast,
} from "@cherry-design-system/react";
import { Copy, FileText, Plus, RotateCcw, Sparkles } from "lucide-react";
import { StaticToast } from "@/components/ui/StaticToast";
import { faqs } from "@/lib/content";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";
import styles from "./ProductShot.module.css";

type Message = { id: number; role: "user" | "assistant"; text: string };

const INITIAL: Message[] = [
  {
    id: 1,
    role: "assistant",
    text: "Hi! Ask me anything about cherry components, theming or tokens.",
  },
  { id: 2, role: "user", text: "How do I override a button's style?" },
  {
    id: 3,
    role: "assistant",
    text: "Add a class. cherry's styles sit in their own cascade layer, so yours win without !important. Tailwind classes work too.",
  },
];

const DEMO_REPLY =
  "This assistant is a demo, but the panel, messages, sources and composer are the real cherry chat kit. Wire onSend to your model and it streams the same way.";

function AssistantAvatar() {
  return (
    <Avatar size="sm" color="ai" icon={<Sparkles />} aria-hidden="true" />
  );
}

function MessageActions({ text }: { text: string }) {
  const toast = useToast();
  return (
    <>
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Copy message"
        icon={<Copy />}
        onClick={() => {
          navigator.clipboard?.writeText(text).then(
            () => toast.show("Copied to clipboard", { color: "success" }),
            () => undefined,
          );
        }}
      />
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="Regenerate reply"
        icon={<RotateCcw />}
      />
    </>
  );
}

export function ProductShot() {
  const toast = useToast();
  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [pending, setPending] = useState(false);
  const nextId = useRef(INITIAL.length + 1);

  function send(text: string) {
    track("demo_chat_sent");
    setMessages((m) => [...m, { id: nextId.current++, role: "user", text }]);
    setPending(true);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: DEMO_REPLY },
      ]);
      setPending(false);
    }, 1200);
  }

  return (
    <section className={styles.shot} aria-labelledby="preview-title">
      <h2 id="preview-title" className="visually-hidden">
        Live preview of cherry components
      </h2>

      <div className={styles.column}>
        <Card variant="elevated" className={styles.settings}>
          <div className={styles.heading}>
            <h3 className={styles.cardTitle}>Workspace settings</h3>
            <p className={styles.cardText}>
              Pick a brand color and cherry builds both modes.
            </p>
          </div>
          <Field label="Workspace name">
            <Input defaultValue="Acme Inc." autoComplete="off" />
          </Field>
          <Field label="Brand color">
            <Select defaultValue="cherry">
              <option value="cherry">cherry red</option>
              <option value="indigo">indigo</option>
              <option value="emerald">emerald</option>
            </Select>
          </Field>
          <Toggle label="Follow system appearance" defaultChecked />
          <div className={styles.footer}>
            <Button variant="ghost">Cancel</Button>
            <Button
              onClick={() =>
                toast.show("Changes saved", {
                  color: "success",
                  description: "Your profile is up to date.",
                })
              }
            >
              Save changes
            </Button>
          </div>
        </Card>

        <Callout variant="info">
          Light and dark are plain CSS variables. Switching modes changes one
          class, so nothing re-renders.
        </Callout>

        <Accordion type="single" className={styles.faq}>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              title={faq.question}
              defaultOpen={i === 0}
            >
              {faq.answer}
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className={`${styles.column} ${styles.right}`}>
        <ChatPanel
          variant="inline"
          title={`${site.name} Assistant`}
          className={styles.chat}
          actions={
            <IconButton
              size="sm"
              variant="ghost"
              aria-label="Reset conversation"
              icon={<RotateCcw />}
              onClick={() => {
                setMessages(INITIAL);
                setPending(false);
              }}
            />
          }
        >
          <ChatMessageList streaming={pending}>
            {messages.map((m, i) =>
              m.role === "user" ? (
                <ChatMessage key={m.id} role="user" still={i < INITIAL.length}>
                  {m.text}
                </ChatMessage>
              ) : (
                <ChatMessage
                  key={m.id}
                  role="assistant"
                  still={i < INITIAL.length}
                  avatar={<AssistantAvatar />}
                  actions={<MessageActions text={m.text} />}
                >
                  {m.text}
                </ChatMessage>
              ),
            )}
            {messages.length === INITIAL.length ? (
              <ChatSources className={styles.sources}>
                <ChatSource href={site.links.docs}>Styling</ChatSource>
                <ChatSource href={site.links.docs}>Tailwind</ChatSource>
              </ChatSources>
            ) : null}
            <ChatTyping active={pending || messages.length === INITIAL.length} />
          </ChatMessageList>
          <ChatInput
            placeholder="Ask anything about cherry…"
            aria-label="Message the cherry assistant"
            loading={pending}
            onSend={send}
            footnote="AI can make mistakes. Check important info."
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
        </ChatPanel>

        <StaticToast
          title="Changes saved"
          description="Your profile is up to date."
        />
      </div>
    </section>
  );
}
