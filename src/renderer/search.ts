/**
 * Alma Custom Search Interface
 *
 * Replaces the default Google search redirect with a native, private,
 * beautifully designed search engine interface powered by Tavily API data.
 */

export interface SearchAppOptions {
  onNavigate: (url: string) => void;
  onNewTab: (url: string) => void;
}

type SearchTab = "all" | "images";

export class SearchApp {
  private options: SearchAppOptions | null = null;
  private currentQuery = "";
  private currentTab: SearchTab = "all";
  private isSearching = false;
  private lastResponse: AlmaSearchResponse | null = null;

  // Pagination & results state
  private allResults: AlmaSearchResult[] = [];
  private allImages: AlmaSearchImage[] = [];
  private currentPage = 1;
  private readonly pageSize = 10;
  private currentImagePage = 1;
  private isLoadingMoreImages = false;
  private activeLightboxImage: AlmaSearchImage | null = null;

  // DOM elements
  private searchViewEl: HTMLElement | null = null;
  private searchInputEl: HTMLInputElement | null = null;
  private clearBtnEl: HTMLButtonElement | null = null;
  private submitBtnEl: HTMLButtonElement | null = null;
  private searchTabsEl: HTMLElement | null = null;
  private statsEl: HTMLElement | null = null;
  private loadingEl: HTMLElement | null = null;
  private aiCardEl: HTMLElement | null = null;
  private aiBodyEl: HTMLElement | null = null;

  // Images elements
  private imagesSectionEl: HTMLElement | null = null;
  private imagesGridEl: HTMLElement | null = null;
  private seeAllImagesBtn: HTMLButtonElement | null = null;
  private imagesFooterEl: HTMLElement | null = null;
  private moreImagesBtn: HTMLButtonElement | null = null;

  // Lightbox elements
  private lightboxEl: HTMLElement | null = null;
  private lightboxBackdropEl: HTMLElement | null = null;
  private lightboxCloseEl: HTMLButtonElement | null = null;
  private lightboxPrevBtnEl: HTMLButtonElement | null = null;
  private lightboxNextBtnEl: HTMLButtonElement | null = null;
  private lightboxImgEl: HTMLImageElement | null = null;
  private lightboxTitleEl: HTMLElement | null = null;
  private lightboxSourceEl: HTMLAnchorElement | null = null;
  private lightboxSourceTextEl: HTMLElement | null = null;
  private currentLightboxIndex = 0;

  // Web results elements
  private resultsListEl: HTMLElement | null = null;
  private paginationEl: HTMLElement | null = null;
  private seeMoreBtn: HTMLButtonElement | null = null;
  private pageNumbersEl: HTMLElement | null = null;

  // Empty & brand
  private emptyStateEl: HTMLElement | null = null;
  private emptyTitleEl: HTMLElement | null = null;
  private emptyDescEl: HTMLElement | null = null;
  private brandEl: HTMLElement | null = null;

  init(options: SearchAppOptions): void {
    this.options = options;
    this.bindDOMElements();
    this.bindEvents();
  }

  private bindDOMElements(): void {
    this.searchViewEl = document.getElementById("search-view");
    this.searchInputEl = document.getElementById("search-input") as HTMLInputElement | null;
    this.clearBtnEl = document.getElementById("search-clear-btn") as HTMLButtonElement | null;
    this.submitBtnEl = document.getElementById("search-submit-btn") as HTMLButtonElement | null;
    this.searchTabsEl = document.getElementById("search-tabs");
    this.statsEl = document.getElementById("search-stats");
    this.loadingEl = document.getElementById("search-loading");
    this.aiCardEl = document.getElementById("search-ai-card");
    this.aiBodyEl = document.getElementById("search-ai-body");

    this.imagesSectionEl = document.getElementById("search-images-section");
    this.imagesGridEl = document.getElementById("search-images-grid");
    this.seeAllImagesBtn = document.getElementById("search-see-all-images") as HTMLButtonElement | null;
    this.imagesFooterEl = document.getElementById("search-images-footer");
    this.moreImagesBtn = document.getElementById("search-more-images-btn") as HTMLButtonElement | null;

    this.lightboxEl = document.getElementById("search-lightbox");
    this.lightboxBackdropEl = document.getElementById("search-lightbox-backdrop");
    this.lightboxCloseEl = document.getElementById("search-lightbox-close") as HTMLButtonElement | null;
    this.lightboxPrevBtnEl = document.getElementById("search-lightbox-prev") as HTMLButtonElement | null;
    this.lightboxNextBtnEl = document.getElementById("search-lightbox-next") as HTMLButtonElement | null;
    this.lightboxImgEl = document.getElementById("search-lightbox-img") as HTMLImageElement | null;
    this.lightboxTitleEl = document.getElementById("search-lightbox-title");
    this.lightboxSourceEl = document.getElementById("search-lightbox-source") as HTMLAnchorElement | null;
    this.lightboxSourceTextEl = document.getElementById("search-lightbox-source-text");

    this.resultsListEl = document.getElementById("search-results-list");
    this.paginationEl = document.getElementById("search-pagination");
    this.seeMoreBtn = document.getElementById("search-see-more-btn") as HTMLButtonElement | null;
    this.pageNumbersEl = document.getElementById("search-page-numbers");

    this.emptyStateEl = document.getElementById("search-empty-state");
    this.emptyTitleEl = document.getElementById("search-empty-title");
    this.emptyDescEl = document.getElementById("search-empty-desc");
    this.brandEl = document.getElementById("search-brand");
  }

  private bindEvents(): void {
    if (this.submitBtnEl && this.searchInputEl) {
      this.submitBtnEl.addEventListener("click", () => {
        const q = this.searchInputEl?.value.trim() || "";
        if (q) this.executeSearch(q);
      });

      this.searchInputEl.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          const q = this.searchInputEl?.value.trim() || "";
          if (q) this.executeSearch(q);
        }
      });

      this.searchInputEl.addEventListener("input", () => {
        if (this.clearBtnEl) {
          this.clearBtnEl.style.display = this.searchInputEl?.value ? "flex" : "none";
        }
      });
    }

    if (this.clearBtnEl && this.searchInputEl) {
      this.clearBtnEl.addEventListener("click", () => {
        if (this.searchInputEl) {
          this.searchInputEl.value = "";
          this.searchInputEl.focus();
        }
        if (this.clearBtnEl) this.clearBtnEl.style.display = "none";
      });
    }

    if (this.brandEl) {
      this.brandEl.addEventListener("click", () => {
        if (this.options) {
          this.options.onNavigate("home.html");
        }
      });
    }

    if (this.searchTabsEl) {
      this.searchTabsEl.addEventListener("click", (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest(".search-tab") as HTMLElement | null;
        if (!target) return;
        const tab = target.getAttribute("data-tab") as SearchTab;
        if (tab) {
          this.setTab(tab);
        }
      });
    }

    // "See more results" button
    if (this.seeMoreBtn) {
      this.seeMoreBtn.addEventListener("click", () => {
        const totalPages = Math.ceil(this.allResults.length / this.pageSize);
        if (this.currentPage < totalPages) {
          this.goToPage(this.currentPage + 1);
        }
      });
    }

    // Lightbox events
    if (this.lightboxCloseEl) {
      this.lightboxCloseEl.addEventListener("click", () => this.closeLightbox());
    }
    if (this.lightboxBackdropEl) {
      this.lightboxBackdropEl.addEventListener("click", () => this.closeLightbox());
    }
    if (this.lightboxPrevBtnEl) {
      this.lightboxPrevBtnEl.addEventListener("click", () => this.stepLightbox(-1));
    }
    if (this.lightboxNextBtnEl) {
      this.lightboxNextBtnEl.addEventListener("click", () => this.stepLightbox(1));
    }
    if (this.lightboxImgEl) {
      this.lightboxImgEl.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.activeLightboxImage) {
          this.showImageContextMenu(this.activeLightboxImage);
        }
      });
    }

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (this.lightboxEl && this.lightboxEl.style.display !== "none") {
        if (e.key === "Escape") {
          this.closeLightbox();
        } else if (e.key === "ArrowLeft") {
          this.stepLightbox(-1);
        } else if (e.key === "ArrowRight") {
          this.stepLightbox(1);
        }
      }
    });

    // "See all images" in the All tab
    if (this.seeAllImagesBtn) {
      this.seeAllImagesBtn.addEventListener("click", () => {
        this.setTab("images");
      });
    }

    // "See more images" in the Images tab
    if (this.moreImagesBtn) {
      this.moreImagesBtn.addEventListener("click", () => {
        this.loadMoreImages();
      });
    }
  }

  setLang(_lang: string): void {
    // localized placeholders if needed
  }

  getCurrentQuery(): string {
    return this.currentQuery;
  }

  onShow(query: string): void {
    const trimmed = query.trim();
    if (this.searchInputEl) {
      this.searchInputEl.value = trimmed;
      if (this.clearBtnEl) {
        this.clearBtnEl.style.display = trimmed ? "flex" : "none";
      }
    }

    if (trimmed && trimmed !== this.currentQuery) {
      this.executeSearch(trimmed);
    } else if (!trimmed && !this.lastResponse) {
      this.showEmptyState("What would you like to search for?", "Type your search query above and press Enter to explore the web.");
    }
  }

  private setTab(tab: SearchTab): void {
    this.currentTab = tab;
    if (this.searchTabsEl) {
      this.searchTabsEl.querySelectorAll(".search-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === tab);
      });
    }
    this.filterViewByTab();
  }

  private filterViewByTab(): void {
    if (!this.lastResponse || !this.lastResponse.success) return;

    const isAll = this.currentTab === "all";
    const isFirstPage = this.currentPage === 1;
    const hasAi = !!this.lastResponse.answer;
    const hasImages = this.allImages.length > 0;

    // AI Overview only stays in the All tab on page 1
    if (this.aiCardEl) {
      this.aiCardEl.style.display = isAll && isFirstPage && hasAi ? "block" : "none";
    }

    // Images section: visible on page 1 of All tab, or always in Images tab
    if (this.imagesSectionEl) {
      const showImages = (isAll && isFirstPage && hasImages) || (!isAll && hasImages);
      this.imagesSectionEl.style.display = showImages ? "block" : "none";
      if (showImages) {
        this.renderImages();
      }
    }

    // Web results list & pagination
    if (this.resultsListEl) {
      this.resultsListEl.style.display = isAll ? "flex" : "none";
    }
    if (this.paginationEl) {
      this.paginationEl.style.display = isAll && this.allResults.length > 0 ? "flex" : "none";
    }
  }

  private goToPage(page: number): void {
    const totalPages = Math.max(1, Math.ceil(this.allResults.length / this.pageSize));
    this.currentPage = Math.max(1, Math.min(page, totalPages));
    this.renderWebResults();
    this.filterViewByTab();
    this.searchViewEl?.scrollTo({ top: 0, behavior: "smooth" });
  }

  async executeSearch(query: string): Promise<void> {
    const trimmed = query.trim();
    if (!trimmed) return;

    this.currentQuery = trimmed;
    this.currentTab = "all";
    this.currentPage = 1;
    this.currentImagePage = 1;

    if (this.searchInputEl) {
      this.searchInputEl.value = trimmed;
      if (this.clearBtnEl) this.clearBtnEl.style.display = "flex";
    }

    if (this.searchTabsEl) {
      this.searchTabsEl.querySelectorAll(".search-tab").forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-tab") === "all");
      });
    }

    const addressInput = document.getElementById("address") as HTMLInputElement | null;
    if (addressInput) {
      addressInput.value = trimmed;
    }

    this.showLoading();

    try {
      this.isSearching = true;
      const response: AlmaSearchResponse = await window.almaAPI.searchWeb(trimmed, 40);
      this.isSearching = false;
      this.lastResponse = response;

      if (!response.success) {
        this.showError(response.error || "Search request failed.");
        return;
      }

      this.allResults = response.results || [];
      this.allImages = response.images || [];

      this.renderResults(response);
    } catch (err: any) {
      this.isSearching = false;
      this.showError(err?.message || "An unexpected error occurred while searching.");
    }
  }

  private showLoading(): void {
    if (this.loadingEl) this.loadingEl.style.display = "flex";
    if (this.statsEl) this.statsEl.style.display = "none";
    if (this.aiCardEl) this.aiCardEl.style.display = "none";
    if (this.imagesSectionEl) this.imagesSectionEl.style.display = "none";
    if (this.paginationEl) this.paginationEl.style.display = "none";
    if (this.resultsListEl) {
      this.resultsListEl.innerHTML = "";
      this.resultsListEl.style.display = "none";
    }
    if (this.emptyStateEl) this.emptyStateEl.style.display = "none";
  }

  private showError(errorMessage: string): void {
    if (this.loadingEl) this.loadingEl.style.display = "none";
    if (this.statsEl) this.statsEl.style.display = "none";
    if (this.aiCardEl) this.aiCardEl.style.display = "none";
    if (this.imagesSectionEl) this.imagesSectionEl.style.display = "none";
    if (this.paginationEl) this.paginationEl.style.display = "none";
    if (this.resultsListEl) this.resultsListEl.style.display = "none";

    let title = "Search Error";
    let desc = errorMessage;

    if (errorMessage.toLowerCase().includes("api key is missing")) {
      title = "Tavily API Key Required";
      desc = "Please add your Tavily API key to the .env file in the Alma project root as TAVILY_API_KEY=your_key, then restart the app.";
    }

    this.showEmptyState(title, desc, true);
  }

  private showEmptyState(title: string, desc: string, isError = false): void {
    if (this.emptyStateEl) {
      this.emptyStateEl.style.display = "flex";
      this.emptyStateEl.classList.toggle("is-error", isError);
    }
    if (this.emptyTitleEl) this.emptyTitleEl.textContent = title;
    if (this.emptyDescEl) this.emptyDescEl.textContent = desc;
  }

  private renderResults(data: AlmaSearchResponse): void {
    if (this.loadingEl) this.loadingEl.style.display = "none";
    if (this.emptyStateEl) this.emptyStateEl.style.display = "none";

    const count = this.allResults.length;
    const time = data.responseTime ? ` in ${data.responseTime.toFixed(2)}s` : "";

    // Stats bar
    if (this.statsEl) {
      this.statsEl.style.display = "block";
      this.statsEl.innerHTML = `About <strong>${count}</strong> results${time} for <span class="search-stats-query">"${this.escapeHtml(this.currentQuery)}"</span>`;
    }

    if (count === 0 && !data.answer && this.allImages.length === 0) {
      this.showEmptyState(
        `No results found for "${this.currentQuery}"`,
        "Make sure all words are spelled correctly, or try different keywords."
      );
      return;
    }

    // AI Overview (stays at the top of All)
    if (this.aiCardEl && this.aiBodyEl) {
      if (data.answer) {
        this.aiCardEl.style.display = "block";
        this.aiBodyEl.innerHTML = this.formatAiText(data.answer);
      } else {
        this.aiCardEl.style.display = "none";
      }
    }

    // Render Web Results with pagination
    this.renderWebResults();

    // Render Images
    this.renderImages();

    this.filterViewByTab();
  }

  private renderWebResults(): void {
    if (!this.resultsListEl) return;
    this.resultsListEl.innerHTML = "";
    this.resultsListEl.style.display = "flex";

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(this.allResults.length, startIndex + this.pageSize);
    const visibleItems = this.allResults.slice(startIndex, endIndex);

    visibleItems.forEach((item) => {
      const card = document.createElement("article");
      card.className = "search-result-card";

      const domain = this.extractDomain(item.url);
      const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=32`;

      card.innerHTML = `
        <div class="search-result-meta">
          <img class="search-result-favicon" src="${faviconUrl}" alt="" loading="lazy" onerror="this.style.opacity='0'" />
          <div class="search-result-cite">
            <span class="search-result-domain">${this.escapeHtml(domain)}</span>
            <span class="search-result-url">${this.escapeHtml(item.url)}</span>
          </div>
        </div>
        <h2 class="search-result-heading">
          <a href="${this.escapeHtml(item.url)}" class="search-result-link">${this.escapeHtml(item.title)}</a>
        </h2>
        <p class="search-result-snippet">${this.escapeHtml(item.content)}</p>
      `;

      // Navigation clicks
      const link = card.querySelector(".search-result-link") as HTMLAnchorElement | null;
      if (link) {
        link.addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          const isNewTab = e.ctrlKey || e.metaKey || e.button === 1;
          this.handleOpenUrl(item.url, isNewTab);
        });

        link.addEventListener("auxclick", (e: MouseEvent) => {
          if (e.button === 1) {
            e.preventDefault();
            this.handleOpenUrl(item.url, true);
          }
        });
      }

      this.resultsListEl?.appendChild(card);
    });

    // Update Pagination & "See more" footer
    if (this.paginationEl) {
      const totalPages = Math.ceil(this.allResults.length / this.pageSize);
      if (totalPages > 0) {
        this.paginationEl.style.display = "flex";

        // "See more results" button
        if (this.seeMoreBtn) {
          if (this.currentPage < totalPages) {
            this.seeMoreBtn.style.display = "inline-flex";
            const span = this.seeMoreBtn.querySelector("span");
            if (span) span.textContent = `See more results (page ${this.currentPage + 1}) \u2192`;
          } else {
            this.seeMoreBtn.style.display = "none";
          }
        }

        // Page number chips
        if (this.pageNumbersEl) {
          this.renderPageNumbers();
        }
      } else {
        this.paginationEl.style.display = "none";
      }
    }
  }

  private renderPageNumbers(): void {
    if (!this.pageNumbersEl) return;
    this.pageNumbersEl.innerHTML = "";

    const totalPages = Math.ceil(this.allResults.length / this.pageSize);
    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement("button");
    prevBtn.className = "search-page-btn is-nav";
    prevBtn.textContent = "\u2190 Prev";
    prevBtn.disabled = this.currentPage <= 1;
    prevBtn.style.opacity = this.currentPage <= 1 ? "0.4" : "1";
    prevBtn.style.cursor = this.currentPage <= 1 ? "default" : "pointer";
    prevBtn.addEventListener("click", () => {
      if (this.currentPage > 1) {
        this.goToPage(this.currentPage - 1);
      }
    });
    this.pageNumbersEl.appendChild(prevBtn);

    // Page chips
    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement("button");
      btn.className = `search-page-btn ${p === this.currentPage ? "active" : ""}`;
      btn.textContent = String(p);
      btn.title = `Page ${p}`;
      btn.addEventListener("click", () => {
        this.goToPage(p);
      });
      this.pageNumbersEl.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.className = "search-page-btn is-nav";
    nextBtn.textContent = "Next \u2192";
    nextBtn.disabled = this.currentPage >= totalPages;
    nextBtn.style.opacity = this.currentPage >= totalPages ? "0.4" : "1";
    nextBtn.style.cursor = this.currentPage >= totalPages ? "default" : "pointer";
    nextBtn.addEventListener("click", () => {
      if (this.currentPage < totalPages) {
        this.goToPage(this.currentPage + 1);
      }
    });
    this.pageNumbersEl.appendChild(nextBtn);
  }

  private renderImages(): void {
    if (!this.imagesSectionEl || !this.imagesGridEl) return;

    const isAll = this.currentTab === "all";
    const imagesToDisplay = isAll ? this.allImages.slice(0, 8) : this.allImages;

    if (imagesToDisplay.length === 0) {
      this.imagesSectionEl.style.display = "none";
      return;
    }

    this.imagesSectionEl.style.display = "block";
    this.imagesGridEl.innerHTML = "";
    this.imagesGridEl.className = isAll ? "search-images-grid" : "search-images-grid is-full-gallery";

    // "See all images" button in header
    if (this.seeAllImagesBtn) {
      if (isAll && this.allImages.length > 6) {
        this.seeAllImagesBtn.style.display = "inline-block";
        this.seeAllImagesBtn.textContent = `See all images (${this.allImages.length}) \u2192`;
      } else {
        this.seeAllImagesBtn.style.display = "none";
      }
    }

    // "See more images" button in footer
    if (this.imagesFooterEl) {
      this.imagesFooterEl.style.display = !isAll ? "flex" : "none";
    }

    imagesToDisplay.forEach((img, index) => {
      const card = document.createElement("div");
      card.className = "search-image-card";
      card.title = img.title || "Click to view preview";

      card.innerHTML = `
        <img src="${this.escapeHtml(img.url)}" alt="${this.escapeHtml(img.title || "")}" loading="lazy" />
        ${img.title ? `<div class="search-image-caption">${this.escapeHtml(img.title)}</div>` : ""}
      `;

      // Click opens preview lightbox
      card.addEventListener("click", (e: MouseEvent) => {
        e.preventDefault();
        this.showLightbox(img, index);
      });

      // Middle-click opens in new tab
      card.addEventListener("auxclick", (e: MouseEvent) => {
        if (e.button === 1) {
          e.preventDefault();
          this.handleOpenUrl(img.url, true);
        }
      });

      // Right-click opens context menu: Download, Copy URL, Open in new tab, Visit link
      card.addEventListener("contextmenu", (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.showImageContextMenu(img);
      });

      this.imagesGridEl?.appendChild(card);
    });
  }

  private showLightbox(img: AlmaSearchImage, index = -1): void {
    this.activeLightboxImage = img;
    this.currentLightboxIndex = index >= 0 ? index : this.allImages.findIndex((i) => i.url === img.url);
    if (this.currentLightboxIndex < 0) this.currentLightboxIndex = 0;

    if (!this.lightboxEl || !this.lightboxImgEl) return;

    this.lightboxImgEl.src = img.url;
    this.lightboxImgEl.alt = img.title || "Image preview";

    if (this.lightboxTitleEl) {
      this.lightboxTitleEl.textContent = img.title || "Image preview";
    }

    // Toggle navigation arrows visibility if multiple images exist
    const hasMultiple = this.allImages.length > 1;
    if (this.lightboxPrevBtnEl) this.lightboxPrevBtnEl.style.display = hasMultiple ? "flex" : "none";
    if (this.lightboxNextBtnEl) this.lightboxNextBtnEl.style.display = hasMultiple ? "flex" : "none";

    const domain = this.extractDomain(img.url);
    // Find matching source page in search results if possible
    const matchingResult = this.allResults.find((r) => {
      try {
        return this.extractDomain(r.url) === domain;
      } catch {
        return false;
      }
    });

    const sourceUrl = matchingResult?.url || (domain ? `https://${domain}` : img.url);

    if (this.lightboxSourceEl && this.lightboxSourceTextEl) {
      this.lightboxSourceEl.href = sourceUrl;
      this.lightboxSourceTextEl.textContent = domain ? `Visit ${domain}` : "Visit source";
      this.lightboxSourceEl.onclick = (e) => {
        e.preventDefault();
        const isNewTab = e.ctrlKey || e.metaKey || e.button === 1;
        this.handleOpenUrl(sourceUrl, isNewTab);
      };
    }

    this.lightboxEl.style.display = "flex";
  }

  private stepLightbox(delta: number): void {
    if (this.allImages.length === 0) return;
    this.currentLightboxIndex = (this.currentLightboxIndex + delta + this.allImages.length) % this.allImages.length;
    const nextImg = this.allImages[this.currentLightboxIndex];
    if (nextImg) {
      this.showLightbox(nextImg, this.currentLightboxIndex);
    }
  }

  private closeLightbox(): void {
    if (this.lightboxEl) {
      this.lightboxEl.style.display = "none";
    }
    this.activeLightboxImage = null;
  }

  private showImageContextMenu(img: AlmaSearchImage | string): void {
    const imageUrl = typeof img === "string" ? img : img?.url;
    if (!imageUrl) return;

    let sourceUrl: string | undefined;
    const domain = this.extractDomain(imageUrl);
    const matchingResult = this.allResults.find((r) => {
      try {
        return this.extractDomain(r.url) === domain;
      } catch {
        return false;
      }
    });

    if (matchingResult) {
      sourceUrl = matchingResult.url;
    } else if (domain) {
      sourceUrl = `https://${domain}`;
    }

    if (window.almaAPI?.showSearchImageContextMenu) {
      window.almaAPI.showSearchImageContextMenu({ imageUrl, sourceUrl });
    }
  }

  private async loadMoreImages(): Promise<void> {
    if (this.isLoadingMoreImages || !this.currentQuery) return;

    this.isLoadingMoreImages = true;
    if (this.moreImagesBtn) {
      this.moreImagesBtn.classList.add("is-loading");
      const span = this.moreImagesBtn.querySelector("span");
      if (span) span.textContent = "Loading more images...";
    }

    try {
      this.currentImagePage += 1;
      const res = await window.almaAPI.searchMoreImages(this.currentQuery, this.currentImagePage);

      if (res.success && Array.isArray(res.images) && res.images.length > 0) {
        const seenUrls = new Set(this.allImages.map((i) => i.url));
        for (const img of res.images) {
          if (!seenUrls.has(img.url)) {
            seenUrls.add(img.url);
            this.allImages.push(img);
          }
        }
        this.renderImages();
      } else {
        if (this.moreImagesBtn) {
          const span = this.moreImagesBtn.querySelector("span");
          if (span) span.textContent = "No more images available";
          setTimeout(() => {
            if (this.moreImagesBtn) this.moreImagesBtn.style.display = "none";
          }, 1500);
        }
      }
    } catch {
      // ignore
    } finally {
      this.isLoadingMoreImages = false;
      if (this.moreImagesBtn) {
        this.moreImagesBtn.classList.remove("is-loading");
        const span = this.moreImagesBtn.querySelector("span");
        if (span && span.textContent === "Loading more images...") {
          span.textContent = "See more images";
        }
      }
    }
  }

  private handleOpenUrl(url: string, newTab: boolean): void {
    if (!this.options) return;
    if (newTab) {
      this.options.onNewTab(url);
    } else {
      this.options.onNavigate(url);
    }
  }

  private extractDomain(urlStr: string): string {
    try {
      const u = new URL(urlStr);
      return u.hostname.replace(/^(www|m)\./i, "");
    } catch {
      return urlStr;
    }
  }

  private formatAiText(text: string): string {
    const escaped = this.escapeHtml(text);
    const paragraphs = escaped
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    return paragraphs.map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`).join("");
  }

  private escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

export const searchApp = new SearchApp();
