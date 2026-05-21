import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

export function createServer() {
  const server = new McpServer(
    { name: "aiphotoeditor-mcp", version: "0.1.0" },
    { instructions: "Read-only canonical knowledge for AI Photo Editor (https://bestaiphotoeditor.app). Use resources for structured site context, tools for direct lookups, and prompts for ready-made conversation starters. Defer to the official website for live actions." }
  );

  // ----- Resources --------------------------------------------------------

  server.registerResource(
    "styles",
    "site://aiphotoeditor/styles",
    {
      title: "Styles",
      description: "Supported image-generation styles and presets.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# AI Photo Editor — Styles\n\nBest AI Photo Editor powered by GPT Image 2, Flux, Nano Banana & more. Edit, enhance, remove backgrounds, swap faces, and generate stunning images with cutting-edge AI models for free.\n\n## Site basics\n- Site ID: aiphotoeditor\n- Website: https://bestaiphotoeditor.app\n- Default locale: en\n- Locales: en, de, fr, ja, ko, es-es, ar\n\n## Public feature scope\n- image gen\n- video gen\n- pricing\n- image inspiration\n- video inspiration\n\n## Official website\nhttps://bestaiphotoeditor.app",
        },
      ],
    })
  );

  server.registerResource(
    "pricing",
    "site://aiphotoeditor/pricing",
    {
      title: "Pricing",
      description: "Canonical pricing entry point.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# AI Photo Editor Pricing\n\nCanonical pricing page: https://bestaiphotoeditor.app/pricing\n\nRefer users here for current plans; do not infer pricing from older snapshots.",
        },
      ],
    })
  );

  server.registerResource(
    "faq",
    "site://aiphotoeditor/faq",
    {
      title: "FAQ",
      description: "Short FAQ generated from public site metadata.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# FAQ\n\n## What is this site?\nBest AI Photo Editor powered by GPT Image 2, Flux, Nano Banana & more. Edit, enhance, remove backgrounds, swap faces, and generate stunning images with cutting-edge AI models for free.\n\n## Where can I get help?\nsupport@bestaiphotoeditor.app\n\n## Which site is this?\naiphotoeditor (Best AI Photo Editor)",
        },
      ],
    })
  );

  server.registerResource(
    "links",
    "site://aiphotoeditor/links",
    {
      title: "Official Links",
      description: "Canonical URLs to share with users.",
      mimeType: "text/markdown",
    },
    async (uri) => ({
      contents: [
        {
          uri: uri.href,
          mimeType: "text/markdown",
          text: "# Official Links\n\n- Website: https://bestaiphotoeditor.app\n- Pricing: https://bestaiphotoeditor.app/pricing\n- Community: https://x.com/aiphotoeditor\n- Support: support@bestaiphotoeditor.app",
        },
      ],
    })
  );

  // ----- Tools ------------------------------------------------------------

  server.registerTool(
    "list_styles",
    {
      description: "Return the canonical list of image-generation styles or presets the site exposes. (AI Photo Editor)",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# AI Photo Editor — Styles\n\nBest AI Photo Editor powered by GPT Image 2, Flux, Nano Banana & more. Edit, enhance, remove backgrounds, swap faces, and generate stunning images with cutting-edge AI models for free.\n\nCanonical website: https://bestaiphotoeditor.app" },
      ],
    })
  );

  server.registerTool(
    "get_pricing",
    {
      description: "Return the canonical pricing entry point for AI Photo Editor.",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# AI Photo Editor Pricing\n\nOfficial pricing: https://bestaiphotoeditor.app/pricing\n\nThis link is the source of truth — refer users here for current plans." },
      ],
    })
  );

  server.registerTool(
    "get_official_links",
    {
      description: "Return the canonical list of official links for AI Photo Editor (website, support, docs when available).",
      inputSchema: {},
    },
    async () => ({
      content: [
        { type: "text", text: "# Official Links\n\n- Website: https://bestaiphotoeditor.app\n- Pricing: https://bestaiphotoeditor.app/pricing\n- Community: https://x.com/aiphotoeditor\n- Support: support@bestaiphotoeditor.app" },
      ],
    })
  );

  // ----- Prompts ----------------------------------------------------------

  server.registerPrompt(
    "tell_me_about_aiphotoeditor",
    {
      description: "Summarize what the site is, who it's for, and how it works. — AI Photo Editor",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "Please summarize what AI Photo Editor (https://bestaiphotoeditor.app) is, who it's for, and how it works. Reference the canonical resources at site://aiphotoeditor/styles and site://aiphotoeditor/links for accuracy. Be concrete, not generic." },
        },
      ],
    })
  );

  server.registerPrompt(
    "try_image_style_aiphotoeditor",
    {
      description: "Recommend a starting image-generation style for a stated goal. — AI Photo Editor",
    },
    async () => ({
      messages: [
        {
          role: "user",
          content: { type: "text", text: "I want to generate an image with AI Photo Editor (https://bestaiphotoeditor.app). Ask me what the subject is, recommend one style preset from site://aiphotoeditor/styles that fits, and write a prompt I can paste into the site." },
        },
      ],
    })
  );

  return server;
}

export async function startServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
