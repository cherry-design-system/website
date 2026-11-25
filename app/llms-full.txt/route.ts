import { llmsFull } from "@/lib/seo/llms";

// Static by default under cacheComponents: no request data is read.
export function GET() {
  return new Response(llmsFull(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
