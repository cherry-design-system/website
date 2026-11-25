"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatRole = "user" | "assistant";
export type DemoMessage = { id: number; role: ChatRole; text: string };
export type ChatPhase = "idle" | "thinking" | "streaming";

/**
 * Canned answers for the landing-page assistant. No model is called: the
 * first entry whose pattern matches the question wins, and the last one is
 * the fallback. Keep the claims true to the library.
 */
const REPLIES: { match: RegExp; text: string }[] = [
  {
    match: /brand|colou?r|accent|theme/i,
    text: 'Call createBrand("acme", { accent: "#5b5bd6" }) and scope it with the attributes it returns. cherry derives the hover, subtle, text and focus shades for light and dark from that one color, as plain CSS.',
  },
  {
    match: /dark|light|mode/i,
    text: "Modes are a single class on <html>. Every --cherry-* token switches with it, so nothing re-renders. Drop in <ThemeToggle /> for System, Light and Dark, or read and set the preference with useColorMode().",
  },
  {
    match: /next|server|rsc|app router|ssr/i,
    text: 'Import styles.css once in app/layout.tsx and put themeInitScript in the head. Static components render as Server Components, and interactive ones carry "use client" themselves, so you can import any of them anywhere.',
  },
  {
    match: /install|setup|start|add|npm|pnpm/i,
    text: "Run pnpm add @cherry-design-system/react lucide-react, import the stylesheet once, and add className=\"cherry-root\" to your body. That's the whole setup: no provider, no build plugin.",
  },
  {
    match: /override|style|class|css|tailwind|custom/i,
    text: "Pass a className. cherry's rules live in @layer cherry, so any unlayered rule of yours wins without !important. Use the --cherry-* tokens in your CSS and it still follows light, dark and your brand.",
  },
  {
    match: /a11y|accessib|keyboard|screen ?reader|wcag/i,
    text: "Every component targets WCAG 2.2 AA: real labels through Field, visible focus rings, full keyboard support and reduced-motion fallbacks. The test suite runs axe in light and dark, at desktop size and at 320px.",
  },
  {
    match: /chat|ai|assistant|stream/i,
    text: "This panel is the cherry chat kit: ChatPanel, ChatMessageList, ChatMessage, ChatTyping and ChatInput. Set streaming on the reply while tokens arrive and the list keeps up, just like this answer.",
  },
  {
    match: /.*/,
    text: "Good question. This assistant is a demo, but everything around it is the real cherry chat kit: the panel, the messages, the streaming caret and the glowing composer. Wire onSend to your model and it streams the same way.",
  },
];

const pickReply = (question: string) =>
  REPLIES.find((r) => r.match.test(question))!.text;

const THINKING_MS = 700;
const TOKEN_MS: [min: number, max: number] = [25, 70];

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A fake model: "thinks" briefly, then streams the reply word by word, the
 * way tokens arrive from a real API. With reduced motion the reply appears
 * whole. Timers are cleared on reset and unmount.
 */
export function useDemoChat(initial: DemoMessage[]) {
  const [messages, setMessages] = useState(initial);
  const [phase, setPhase] = useState<ChatPhase>("idle");
  const [streamingId, setStreamingId] = useState<number | null>(null);
  const nextId = useRef(initial.length + 1);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const send = useCallback(
    (question: string) => {
      if (phase !== "idle") return;
      const reply = pickReply(question);
      const replyId = nextId.current + 1;
      setMessages((m) => [
        ...m,
        { id: nextId.current, role: "user", text: question },
      ]);
      nextId.current += 2;
      setPhase("thinking");

      later(() => {
        if (prefersReducedMotion()) {
          setMessages((m) => [
            ...m,
            { id: replyId, role: "assistant", text: reply },
          ]);
          setPhase("idle");
          return;
        }
        // Words plus the whitespace after them, so spacing survives.
        const tokens = reply.match(/\S+\s*/g) ?? [reply];
        let shown = 0;
        setMessages((m) => [...m, { id: replyId, role: "assistant", text: "" }]);
        setStreamingId(replyId);
        setPhase("streaming");

        const tick = () => {
          shown += 1;
          const text = tokens.slice(0, shown).join("");
          setMessages((m) =>
            m.map((msg) => (msg.id === replyId ? { ...msg, text } : msg)),
          );
          if (shown < tokens.length) {
            const [min, max] = TOKEN_MS;
            later(tick, min + Math.random() * (max - min));
          } else {
            setStreamingId(null);
            setPhase("idle");
          }
        };
        tick();
      }, THINKING_MS);
    },
    [phase],
  );

  const reset = useCallback(() => {
    clearTimers();
    setMessages(initial);
    setStreamingId(null);
    setPhase("idle");
    nextId.current = initial.length + 1;
  }, [clearTimers, initial]);

  return { messages, phase, streamingId, send, reset };
}
