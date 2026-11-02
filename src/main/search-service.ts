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
      const domainName = host.split(".")[0];
      const isRoot = u.pathname === "/" || u.pathname === "" || u.pathname === "/index.html";
      const titleLower = (r.title || "").toLowerCase();

      // Navigational domain match (e.g. query "youtube" matching youtube.com)
      if (host === qClean || domainName === qClean) {
        boost += isRoot ? 120 : 60;
      } else if (host.includes(qClean)) {
        boost += isRoot ? 40 : 20;
      }

      // Title exact / prefix match
      if (titleLower === qClean) {
        boost += 40;
      } else if (titleLower.startsWith(qClean)) {
        boost += 20;
      } else if (titleLower.includes(qClean)) {
        boost += 10;
      }

      // Term coverage
      const allWordsInTitle = qWords.every((w) => titleLower.includes(w));
      if (allWordsInTitle) boost += 15;

      const allWordsInHost = qWords.every((w) => host.includes(w));
      if (allWordsInHost) boost += 20;

      // Root homepage preference
      if (isRoot) boost += 10;

      // Demote third-party "what is X" explainer articles when querying an exact entity
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
 * Search service to handle web search requests via Tavily API.
 * This runs in the main process to keep the API key secure.
 */
export class SearchService {
  private getApiKey(): string | null {
    return process.env.TAVILY_API_KEY?.trim() || null;
  }

  async search(query: string, limit = 40): Promise<SearchResponse> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return {
        success: false,
        error: "Tavily API key is missing. Please set TAVILY_API_KEY in your .env file."
      };
    }

    const trimmed = query.trim();
    if (!trimmed) {
      return {
        success: true,
        query: "",
        results: [],
        images: [],
      };
    }

    const isTavilySearch = trimmed.toLowerCase().includes("tavily");
    const excludeDomains = isTavilySearch ? ["web.archive.org"] : ["web.archive.org", "tavily.com"];

    try {
      // Run the main web search and an initial image boost request in parallel
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

      const [mainData, imageBoostData] = await Promise.all([mainPromise, imageBoostPromise]);

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

      // Rank by relevance and clean snippets
      const results = rankResults(trimmed, rawResults, limit);

      // Collect and deduplicate images
      const imagesMap = new Map<string, SearchImage>();
      const rawImages = [
        ...(Array.isArray(mainData.images) ? mainData.images : []),
        ...(Array.isArray(imageBoostData.images) ? imageBoostData.images : []),
      ];

      for (const img of rawImages) {
        const url = typeof img === "string" ? img : img?.url;
        if (typeof url === "string" && url.startsWith("http") && !imagesMap.has(url)) {
          // Exclude Tavily icons/placeholders
          if (!isTavilySearch && url.includes("tavily.com")) continue;

          imagesMap.set(url, {
            url,
            title: typeof img === "object" && typeof img.title === "string" ? img.title : undefined,
            description: typeof img === "object" && typeof img.description === "string" ? img.description : undefined,
          });
        }
      }

      const images = Array.from(imagesMap.values());

      return {
        success: true,
        query: trimmed,
        results,
        totalResults: results.length,
        answer: typeof mainData.answer === "string" ? mainData.answer : undefined,
        images,
        responseTime: typeof mainData.response_time === "number" ? mainData.response_time : undefined,
      };
    } catch (e: any) {
      console.error("[SearchService] API Error:", e);
      return {
        success: false,
        error: e.message || "An error occurred while connecting to the search service."
      };
    }
  }

  async searchMoreImages(query: string, page = 1): Promise<{ success: boolean; images: SearchImage[]; error?: string }> {
    const apiKey = this.getApiKey();
    if (!apiKey) return { success: false, images: [], error: "Missing API key" };

    const trimmed = query.trim();
    if (!trimmed) return { success: true, images: [] };

    const suffixes = ["photos wallpaper", "pictures gallery", "high resolution", "visuals photography", "editorial photos"];
    const suffix = suffixes[(page - 1) % suffixes.length] || "pictures";
    const isTavilySearch = trimmed.toLowerCase().includes("tavily");
    const excludeDomains = isTavilySearch ? ["web.archive.org"] : ["web.archive.org", "tavily.com"];

    try {
      const response = await fetch("https://api.tavily.com/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: apiKey,
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
}

export const searchService = new SearchService();
