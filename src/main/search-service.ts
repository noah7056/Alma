import dotenv from "dotenv";
dotenv.config();

export interface SearchResult {
  title: string;
  url: string;
  content: string;
  score: number;
}

export interface SearchImage {
  url: string;
  title?: string;
  description?: string;
}

export interface SearchResponse {
  success: boolean;
  query?: string;
  results?: SearchResult[];
  answer?: string;
  images?: SearchImage[];
  responseTime?: number;
  totalResults?: number;
  provider?: string;
  error?: string;
}

const KNOWN_PORTALS: Record<string, { title: string; url: string; content: string }> = {
  youtube: {
    title: "YouTube",
    url: "https://www.youtube.com",
    content: "Enjoy videos, music, and original content from creators across the globe.",
  },
  github: {
    title: "GitHub",
    url: "https://github.com",
    content: "Development platform to host, review code, manage projects, and build software.",
  },
  reddit: {
    title: "Reddit",
    url: "https://www.reddit.com",
    content: "Community network where people can dive into their interests and passions.",
  },
  wikipedia: {
    title: "Wikipedia",
    url: "https://www.wikipedia.org",
    content: "The free encyclopedia with millions of articles in hundreds of languages.",
  },
  twitter: {
    title: "X (formerly Twitter)",
    url: "https://x.com",
    content: "Real-time updates, news, entertainment, and discussions.",
  },
  x: {
    title: "X",
    url: "https://x.com",
    content: "Real-time updates, news, entertainment, and discussions.",
  },
  facebook: {
    title: "Facebook",
    url: "https://www.facebook.com",
    content: "Connect with friends, family and people who share your interests.",
  },
  instagram: {
    title: "Instagram",
    url: "https://www.instagram.com",
    content: "Photo and video sharing social networking platform.",
  },
  netflix: {
    title: "Netflix",
    url: "https://www.netflix.com",
    content: "Watch movies, TV shows, and original series on any device.",
  },
  spotify: {
    title: "Spotify",
    url: "https://www.spotify.com",
    content: "Digital music and podcast service with millions of tracks.",
  },
  twitch: {
    title: "Twitch",
    url: "https://www.twitch.tv",
    content: "Live streaming platform for gaming, music, and esports.",
  },
  linkedin: {
    title: "LinkedIn",
    url: "https://www.linkedin.com",
    content: "Professional networking platform to find jobs and connect with colleagues.",
  },
  apple: {
    title: "Apple",
    url: "https://www.apple.com",
    content: "Official site for iPhone, Mac, iPad, Apple Watch, and services.",
  },
  google: {
    title: "Google",
    url: "https://www.google.com",
    content: "Search engine for information, websites, images, and videos.",
  },
  amazon: {
    title: "Amazon",
    url: "https://www.amazon.com",
    content: "Online retailer for electronics, books, apparel, and home essentials.",
  },
  discord: {
    title: "Discord",
    url: "https://discord.com",
    content: "Discord is the easiest way to talk over voice, video, and text.",
  },
  chatgpt: {
    title: "ChatGPT",
    url: "https://chatgpt.com",
    content: "Free AI chatbot by OpenAI to chat, generate text, and solve problems.",
  },
  openai: {
    title: "OpenAI",
    url: "https://openai.com",
    content: "Research and deployment company dedicated to safe artificial general intelligence.",
  },
};

function cleanSnippet(content: string, maxLen = 135): string {
  if (!content) return "";
  let clean = content
    .replace(/##+\s+/g, "")
    .replace(/\[edit\]/gi, "")
    .replace(/\[\.\.\.\]/g, "")
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (clean.length > maxLen) {
    const cut = clean.slice(0, maxLen);
    const lastPunct = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
    if (lastPunct > 55) {
      return cut.slice(0, lastPunct + 1);
    }
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 75 ? cut.slice(0, lastSpace) : cut).trim() + "...";
  }
  return clean;
}

function getDomainKey(urlStr: string): string {
  try {
    const u = new URL(urlStr);
    let host = u.hostname.toLowerCase();
    host = host.replace(/^(www|m|mobile)\./i, "");
    const parts = host.split(".");
    if (parts.length > 2) {
      const secondToLast = parts[parts.length - 2];
      const isTwoLevelTLD = ["co", "com", "org", "net", "gov", "edu"].includes(secondToLast);
      if (isTwoLevelTLD && parts.length >= 3) {
        return parts.slice(-3).join(".");
      }
      return parts.slice(-2).join(".");
    }
    return host;
  } catch {
    return urlStr;
  }
}

function diversifyResults(results: SearchResult[], maxPerDomain = 2): SearchResult[] {
  const primaryList: SearchResult[] = [];
  const secondaryList: SearchResult[] = [];
  const domainCounts = new Map<string, number>();

  for (const item of results) {
    const domain = getDomainKey(item.url);
    const count = domainCounts.get(domain) || 0;
    if (count < maxPerDomain) {
      domainCounts.set(domain, count + 1);
      primaryList.push(item);
    } else {
      secondaryList.push(item);
    }
  }

  return [...primaryList, ...secondaryList];
}

const AUTHORITATIVE_DOMAINS = new Set([
  // Reference & Knowledge
  "wikipedia.org", "wikimedia.org", "britannica.com", "investopedia.com", "merriam-webster.com", "dictionary.com",
  // Developer & Open Source
  "github.com", "gitlab.com", "stackoverflow.com", "developer.mozilla.org", "w3schools.com", "arxiv.org", "npmjs.com", "pypi.org",
  // Major Platforms & Companies
  "youtube.com", "reddit.com", "apple.com", "microsoft.com", "google.com", "amazon.com", "linkedin.com", "x.com", "twitter.com",
  // Trusted News & Media
  "reuters.com", "apnews.com", "bbc.com", "bbc.co.uk", "theverge.com", "wired.com", "techcrunch.com", "bloomberg.com", 
  "nytimes.com", "wsj.com", "theguardian.com", "forbes.com", "nature.com", "scientificamerican.com", "nationalgeographic.com",
  // Entertainment & Culture
  "imdb.com", "rottentomatoes.com", "spotify.com", "netflix.com", "goodreads.com", "ign.com", "gamespot.com"
]);

const SPAM_TLDS = new Set([
  "xyz", "top", "buzz", "click", "link", "live", "fit", "work", "loan", "tk", "ml", "ga", "cf", "gq", "bid", "racing", "download"
]);

const JUNK_PAGE_PATTERNS = [
  /\benable javascript\b/i,
  /\bturn on javascript\b/i,
  /\bjavascript is disabled\b/i,
  /\bcookies to continue\b/i,
  /\baccess denied\b/i,
  /\b403 forbidden\b/i,
  /\b404 not found\b/i,
  /\bpage not found\b/i,
  /\bjust a moment\.\.\./i,
  /\bchecking your browser\b/i,
  /\bsecurity check\b/i,
  /\brobot check\b/i,
  /\battention required\b/i
];

function isWordIn(text: string, word: string): boolean {
  if (!text || !word) return false;
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i");
  return re.test(text);
}

function rankResults(query: string, rawResults: SearchResult[], limit = 40): SearchResult[] {
  const qClean = query.trim().toLowerCase();
  const qWords = qClean.split(/\s+/).filter(Boolean);
  const isSingleWord = qWords.length === 1 && /^[a-z0-9-]+$/i.test(qClean);
  const isTavilyQuery = qClean.includes("tavily");

  const scoredList: { item: SearchResult; score: number }[] = [];
  const seenUrls = new Set<string>();

  for (const r of rawResults) {
    if (!r.url) continue;

    // Filter out web.archive.org
    if (r.url.includes("web.archive.org/web/")) continue;

    // Filter out Tavily self-promotional knowledge graph entries unless the user searched for Tavily
    if (!isTavilyQuery && (r.url.includes("tavily.com") || (r.title && r.title.toLowerCase().includes("tavily")))) {
      continue;
    }

    const normalizedUrl = r.url.replace(/\/+$/, "").toLowerCase();
    if (seenUrls.has(normalizedUrl)) continue;
    seenUrls.add(normalizedUrl);

    let boost = 0;
    try {
      const u = new URL(r.url);
      const host = u.hostname.replace(/^(www|m)\./i, "").toLowerCase();
      const hostParts = host.split(".");
      const domainName = hostParts[0];
      const domainKey = getDomainKey(r.url);
      const tld = hostParts[hostParts.length - 1];
      const isRoot = u.pathname === "/" || u.pathname === "" || u.pathname === "/index.html";
      const titleLower = (r.title || "").toLowerCase();
      const contentLower = (r.content || "").toLowerCase();
      const fullText = `${titleLower} ${contentLower}`;

      // 1. Authoritative Domain & Trust Boost (emulating Google's PageRank/TrustRank)
      if (AUTHORITATIVE_DOMAINS.has(host) || AUTHORITATIVE_DOMAINS.has(domainKey)) {
        boost += 25;
      }
      if (tld === "edu" || tld === "gov" || host.endsWith(".edu") || host.endsWith(".gov")) {
        boost += 30;
      }

      // 2. Junk / Spam TLD Demotion
      if (SPAM_TLDS.has(tld)) {
        boost -= 40;
      }

      // 3. Broken / Dead page filtering
      const isJunkPage = JUNK_PAGE_PATTERNS.some((pat) => pat.test(fullText));
      if (isJunkPage) {
        boost -= 80;
      }

      // 4. Navigational Domain Match (Whole-Word, not accidental substring)
      if (host === qClean || domainName === qClean) {
        boost += isRoot ? 130 : 70;
      } else if (isWordIn(host, qClean)) {
        boost += isRoot ? 45 : 25;
      }

      // 5. Title Relevance
      if (titleLower === qClean) {
        boost += 50;
      } else if (titleLower.startsWith(qClean + " ") || titleLower.startsWith(qClean + " -") || titleLower.startsWith(qClean + ":")) {
        boost += 35;
      } else if (isWordIn(titleLower, qClean)) {
        boost += 20;
      }

      // 6. Content / Snippet Relevance
      if (isWordIn(contentLower, qClean)) {
        boost += 15;
      }

      // 7. Multi-word Queries: Term Coverage Ratio (Reward pages containing all terms, not just one)
      if (qWords.length > 1) {
        let titleTermMatches = 0;
        let contentTermMatches = 0;
        for (const w of qWords) {
          if (isWordIn(titleLower, w)) titleTermMatches++;
          if (isWordIn(contentLower, w)) contentTermMatches++;
        }
        const titleRatio = titleTermMatches / qWords.length;
        const contentRatio = contentTermMatches / qWords.length;
        boost += Math.round(titleRatio * 30 + contentRatio * 20);

        // Big bonus when all terms appear in the title
        if (titleTermMatches === qWords.length) {
          boost += 25;
        }
      }

      // 8. URL Structure Cleanliness
      if (isRoot) {
        boost += 15;
      } else if (u.pathname.split("/").filter(Boolean).length <= 2 && !u.search) {
        boost += 8;
      } else if (u.search && u.search.length > 50) {
        // Demote messy tracking parameters
        boost -= 15;
      }

      // 9. Demote third-party "what is X" explainer articles when querying an exact entity
      if (isSingleWord && (titleLower.startsWith("what is ") || titleLower.includes("what is "))) {
        if (!host.includes(qClean)) {
          boost -= 25;
        }
      }
    } catch {
      // ignore URL parsing error
    }

    const totalScore = (r.score || 0) + boost;
    scoredList.push({
      item: {
        ...r,
        content: cleanSnippet(r.content),
      },
      score: totalScore,
    });
  }

  // If single-word navigational query matches a known portal and root isn't already #1, ensure it is present
  if (isSingleWord && KNOWN_PORTALS[qClean]) {
    const portal = KNOWN_PORTALS[qClean];
    const existingIndex = scoredList.findIndex((s) => {
      try {
        const u = new URL(s.item.url);
        return u.hostname.replace(/^(www|m)\./i, "").toLowerCase() === new URL(portal.url).hostname.replace(/^(www|m)\./i, "").toLowerCase() &&
               (u.pathname === "/" || u.pathname === "");
      } catch {
        return false;
      }
    });

    if (existingIndex !== -1) {
      scoredList[existingIndex].score += 500;
      if (!scoredList[existingIndex].item.content) {
        scoredList[existingIndex].item.content = portal.content;
      }
    } else {
      scoredList.unshift({
        item: {
          title: portal.title,
          url: portal.url,
          content: portal.content,
          score: 1.0,
        },
        score: 1000,
      });
    }
  }

  // Sort by calculated relevance score descending
  scoredList.sort((a, b) => b.score - a.score);

  const sortedItems = scoredList.map((s) => s.item);
  const diversified = diversifyResults(sortedItems, 2);

  return diversified.slice(0, limit);
}

/**
 * Fetch a factual entity summary from Wikipedia REST API as a free fallback overview.
 */
async function fetchWikipediaSummary(query: string): Promise<string | null> {
  const trimmed = query.trim().replace(/^what is |^who is |^where is |^define /i, "").trim();
  if (!trimmed || trimmed.length < 2) return null;
  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(trimmed)}`, {
      headers: { "User-Agent": "AlmaBrowser/1.0 (https://github.com/noah7056/Alma)" },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return null;
    const data: any = await res.json();
    if (data.type === "standard" && typeof data.extract === "string" && data.extract.length > 40) {
      return data.extract;
    }
  } catch {}
  return null;
}

/**
 * Fetch high-resolution images from DuckDuckGo without any API key or credit card.
 * Returns up to 100 images per request with direct URLs, titles, and source page links.
 */
async function fetchDuckDuckGoImages(query: string, page = 1): Promise<SearchImage[]> {
  try {
    const res1 = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&ia=images&iax=images`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      },
      signal: AbortSignal.timeout(3500)
    });
    if (!res1.ok) return [];
    const html = await res1.text();
    const vqdMatch = html.match(/vqd=([0-9-]+)/) || html.match(/vqd=["\x27]([0-9-]+)["\x27]/);
    if (!vqdMatch) return [];
    const vqd = vqdMatch[1];
    const offset = Math.max(0, (page - 1) * 100);
    const offsetParam = offset > 0 ? `&s=${offset}` : "";
    const res2 = await fetch(`https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,${offsetParam}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "Referer": "https://duckduckgo.com/"
      },
      signal: AbortSignal.timeout(3500)
    });
    if (!res2.ok) return [];
    const data: any = await res2.json();
    if (!Array.isArray(data.results)) return [];
    return data.results
      .filter((r: any) => typeof r.image === "string" && r.image.startsWith("http"))
      .map((r: any) => ({
        url: r.image,
        title: r.title || "Image",
        description: r.url || ""
      }));
  } catch {
    return [];
  }
}

/**
 * Multi-provider search service for Alma Browser.
 * Supports:
 * 1. Brave Search API (Recommended for 50+ rich images and comprehensive web search)
 * 2. Tavily API (Alternative / AI-focused web search)
 * Runs in the main process to keep API keys secure.
 */
export class SearchService {
  private getBraveApiKey(): string | null {
    return process.env.BRAVE_SEARCH_API_KEY?.trim() || process.env.BRAVE_API_KEY?.trim() || null;
  }

  private getTavilyApiKey(): string | null {
    return process.env.TAVILY_API_KEY?.trim() || null;
  }

  async search(query: string, limit = 40): Promise<SearchResponse> {
    const trimmed = query.trim();
    if (!trimmed) {
      return {
        success: true,
        query: "",
        results: [],
        images: [],
      };
    }

    const braveKey = this.getBraveApiKey();
    if (braveKey) {
      return this.searchWithBrave(trimmed, limit, braveKey);
    }

    const tavilyKey = this.getTavilyApiKey();
    if (tavilyKey) {
      return this.searchWithTavily(trimmed, limit, tavilyKey);
    }

    return {
      success: false,
      error: "Search API key is missing. Please set BRAVE_API_KEY (recommended for 50+ images) or TAVILY_API_KEY in your .env file."
    };
  }

  /**
   * Search using Brave Search API (Web + Images).
   * Generous official free tier with 2,000 queries/month, 50+ high-res images, and unblocked results.
   */
  private async searchWithBrave(trimmed: string, limit: number, apiKey: string): Promise<SearchResponse> {
    const startTime = Date.now();
    try {
      const count = Math.min(Math.max(limit, 20), 40);
      const webUrl = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(trimmed)}&count=${count}&result_filter=web,infobox`;
      const imgUrl = `https://api.search.brave.com/res/v1/images/search?q=${encodeURIComponent(trimmed)}&count=50`;

      const webPromise = fetch(webUrl, {
        headers: {
          "Accept": "application/json",
          "X-Subscription-Token": apiKey,
        },
      }).then((r) => r.json());

      const imgPromise = fetch(imgUrl, {
        headers: {
          "Accept": "application/json",
          "X-Subscription-Token": apiKey,
        },
      }).then((r) => r.json()).catch(() => ({ results: [] }));

      const wikiPromise = fetchWikipediaSummary(trimmed);

      const [webData, imgData, wikiSummary] = await Promise.all([webPromise, imgPromise, wikiPromise]);

      if (webData.error || webData.message) {
        return {
          success: false,
          error: webData.message || webData.error || "Brave Search request failed."
        };
      }

      const rawResults: SearchResult[] = Array.isArray(webData.web?.results)
        ? webData.web.results.map((r: any, idx: number) => ({
            title: r.title || r.url || "Untitled",
            url: r.url || "",
            content: r.description || "",
            score: Math.max(0.1, 1.0 - idx * 0.03),
          }))
        : [];

      const results = rankResults(trimmed, rawResults, limit);

      // Collect images from Brave
      const images: SearchImage[] = [];
      const imagesMap = new Map<string, SearchImage>();
      if (Array.isArray(imgData.results)) {
        for (const item of imgData.results) {
          const imgUrl = item.properties?.url || item.thumbnail?.src;
          if (typeof imgUrl === "string" && imgUrl.startsWith("http") && !imagesMap.has(imgUrl)) {
            const entry: SearchImage = {
              url: imgUrl,
              title: item.title || "Image",
              description: item.url || item.source || "",
            };
            imagesMap.set(imgUrl, entry);
            images.push(entry);
          }
        }
      }

      // Answer / Overview: prefer infobox or fallback to Wikipedia summary
      const infobox = webData.infobox?.results?.[0];
      const answer = infobox?.description || infobox?.long_desc || webData.infobox?.description || wikiSummary || undefined;
      const responseTime = (Date.now() - startTime) / 1000;

      return {
        success: true,
        query: trimmed,
        results,
        totalResults: results.length,
        answer,
        images,
        responseTime,
        provider: "Brave Search",
      };
    } catch (e: any) {
      console.error("[SearchService] Brave Search Error:", e);
      return {
        success: false,
        error: e.message || "An error occurred while connecting to Brave Search."
      };
    }
  }

  /**
   * Search using Tavily API.
   */
  private async searchWithTavily(trimmed: string, limit: number, apiKey: string): Promise<SearchResponse> {
    const isTavilySearch = trimmed.toLowerCase().includes("tavily");
    const excludeDomains = isTavilySearch ? ["web.archive.org"] : ["web.archive.org", "tavily.com"];

    try {
      const mainPromise = fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          query: trimmed,
          search_depth: "basic",
          include_answer: true,
          include_images: true,
          include_image_descriptions: true,
          exclude_domains: excludeDomains,
          max_results: Math.min(Math.max(limit, 30), 50),
        }),
      }).then((r) => r.json());

      const imageBoostPromise = fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
          query: `${trimmed} photos gallery`,
          include_images: true,
          include_image_descriptions: true,
          exclude_domains: excludeDomains,
          max_results: 5,
        }),
      }).then((r) => r.json()).catch(() => ({ images: [] }));

      const wikiPromise = fetchWikipediaSummary(trimmed);
      const ddgImagesPromise = fetchDuckDuckGoImages(trimmed, 1);

      const [mainData, imageBoostData, wikiSummary, ddgImages] = await Promise.all([
        mainPromise,
        imageBoostPromise,
        wikiPromise,
        ddgImagesPromise,
      ]);

      if (mainData.error || mainData.detail) {
        const errorMsg = mainData.detail?.error || mainData.message || mainData.error || "Tavily search request failed.";
        return { success: false, error: errorMsg };
      }

      const rawResults: SearchResult[] = Array.isArray(mainData.results)
        ? mainData.results.map((r: any) => ({
            title: r.title || r.url || "Untitled",
            url: r.url || "",
            content: r.content || "",
            score: typeof r.score === "number" ? r.score : 0,
          }))
        : [];

      const results = rankResults(trimmed, rawResults, limit);

      // Prefer DuckDuckGo images (provides 100+ high-res images without API limits or credit cards)
      let images: SearchImage[] = [];
      if (ddgImages.length > 0) {
        images = ddgImages;
      } else {
        const imagesMap = new Map<string, SearchImage>();
        const rawImages = [
          ...(Array.isArray(mainData.images) ? mainData.images : []),
          ...(Array.isArray(imageBoostData.images) ? imageBoostData.images : []),
        ];

        for (const img of rawImages) {
          const url = typeof img === "string" ? img : img?.url;
          if (typeof url === "string" && url.startsWith("http") && !imagesMap.has(url)) {
            if (!isTavilySearch && url.includes("tavily.com")) continue;

            imagesMap.set(url, {
              url,
              title: typeof img === "object" && typeof img.title === "string" ? img.title : undefined,
              description: typeof img === "object" && typeof img.description === "string" ? img.description : undefined,
            });
          }
        }
        images = Array.from(imagesMap.values());
      }
      const answer = typeof mainData.answer === "string" && mainData.answer.trim().length > 0
        ? mainData.answer
        : (wikiSummary || undefined);

      return {
        success: true,
        query: trimmed,
        results,
        totalResults: results.length,
        answer,
        images,
        responseTime: typeof mainData.response_time === "number" ? mainData.response_time : undefined,
        provider: "Tavily",
      };
    } catch (e: any) {
      console.error("[SearchService] Tavily Error:", e);
      return {
        success: false,
        error: e.message || "An error occurred while connecting to the search service."
      };
    }
  }

  async searchMoreImages(query: string, page = 1): Promise<{ success: boolean; images: SearchImage[]; error?: string }> {
    const trimmed = query.trim();
    if (!trimmed) return { success: true, images: [] };

    // Try DuckDuckGo first for images (100 free images per page with 0 API keys and 0 credit cards)
    const ddgMore = await fetchDuckDuckGoImages(trimmed, page);
    if (ddgMore.length > 0) {
      return { success: true, images: ddgMore };
    }

    const braveKey = this.getBraveApiKey();
    if (braveKey) {
      try {
        const offset = Math.max(0, (page - 1) * 50);
        const url = `https://api.search.brave.com/res/v1/images/search?q=${encodeURIComponent(trimmed)}&count=50&offset=${offset}`;
        const res = await fetch(url, {
          headers: {
            "Accept": "application/json",
            "X-Subscription-Token": braveKey,
          },
        });
        if (!res.ok) {
          return { success: false, images: [], error: `Brave Search HTTP error ${res.status}` };
        }
        const data: any = await res.json();
        const images: SearchImage[] = [];
        if (Array.isArray(data.results)) {
          for (const item of data.results) {
            const imgUrl = item.properties?.url || item.thumbnail?.src;
            if (typeof imgUrl === "string" && imgUrl.startsWith("http")) {
              images.push({
                url: imgUrl,
                title: item.title || "Image",
                description: item.url || item.source || "",
              });
            }
          }
        }
        return { success: true, images };
      } catch (e: any) {
        return { success: false, images: [], error: e.message || "Failed to fetch more images from Brave" };
      }
    }

    const tavilyKey = this.getTavilyApiKey();
    if (tavilyKey) {
      const suffixes = ["photos wallpaper", "pictures gallery", "high resolution", "visuals photography", "editorial photos"];
      const suffix = suffixes[(page - 1) % suffixes.length] || "pictures";
      const isTavilySearch = trimmed.toLowerCase().includes("tavily");
      const excludeDomains = isTavilySearch ? ["web.archive.org"] : ["web.archive.org", "tavily.com"];

      try {
        const response = await fetch("https://api.tavily.com/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: tavilyKey,
            query: `${trimmed} ${suffix}`,
            include_images: true,
            include_image_descriptions: true,
            exclude_domains: excludeDomains,
            max_results: 8,
          }),
        });

        if (!response.ok) {
          return { success: false, images: [], error: `Tavily HTTP error ${response.status}` };
        }

        const data: any = await response.json();
        const images: SearchImage[] = [];
        if (Array.isArray(data.images)) {
          for (const img of data.images) {
            const url = typeof img === "string" ? img : img?.url;
            if (typeof url === "string" && url.startsWith("http")) {
              if (!isTavilySearch && url.includes("tavily.com")) continue;
              images.push({
                url,
                title: typeof img === "object" && typeof img.title === "string" ? img.title : undefined,
                description: typeof img === "object" && typeof img.description === "string" ? img.description : undefined,
              });
            }
          }
        }

        return { success: true, images };
      } catch (e: any) {
        return { success: false, images: [], error: e.message || "Failed to fetch more images" };
      }
    }

    return { success: false, images: [], error: "Missing API key" };
  }
}

export const searchService = new SearchService();
