/* ═══════════════════════════════════════════════════════════════════════
   Le Meyou — Premium Motion Engine
   Ultra-smooth animations for a luxury sourcing experience.
   ═══════════════════════════════════════════════════════════════════════ */

(() => {
  "use strict";

  /* ── Constants ──────────────────────────────────────────────────────── */
  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyfOT2ZntPayJ7_o1IqfHHKqeDfU7vVC36G5lvk8lsSojgDeeSXwzy7BTxIe7Ua-NfylQ/exec";

  const NAVBAR_SCROLL_THRESHOLD = 60;
  const KAKAO_SHOW_OFFSET       = 400;
  const BACK_TO_TOP_OFFSET      = 600;
  const LOADER_DURATION_MS      = 1800;
  const HERO_OVERLAY_MIN        = 0.38;
  const HERO_OVERLAY_MAX        = 0.65;
  const STAGGER_DELAY_S         = 0.1;   // seconds between each grid child

  /* ── Utility: cubic-bezier-style easing for smooth scroll ──────────── */
  const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

  const smoothScrollTo = (targetY, duration = 1000) => {
    const startY  = window.scrollY;
    const delta   = targetY - startY;
    const startTs = performance.now();

    const step = (now) => {
      const elapsed  = now - startTs;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + delta * easeOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  /* ══════════════════════════════════════════════════════════════════════
     DOM Ready
     ══════════════════════════════════════════════════════════════════════ */
  document.addEventListener("DOMContentLoaded", () => {

    /* ── 0. CSS smooth-scroll baseline ─────────────────────────────────
       Injected via JS so we never touch style.css                      */
    document.documentElement.style.scrollBehavior = "smooth";

    /* ── 1. Custom smooth-scroll for all anchor links ──────────────── */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.querySelector(id);
        if (!target) return;

        e.preventDefault();

        /* If clicking Collection in navbar, reset filter to All to show everything */
        if (id === "#collection") {
          const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
          if (allFilterBtn && !allFilterBtn.classList.contains('active')) {
            allFilterBtn.click();
          }
        }

        const headerHeight = document.getElementById("header")?.offsetHeight || 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
        smoothScrollTo(top, 1100);

        /* Update URL without jump */
        history.pushState(null, "", id);
      });
    });

    /* ── 2. Unified Intersection Observer — scroll reveals ──────────── */
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          el.classList.add("revealed");
          obs.unobserve(el);
        });
      },
      { rootMargin: "-10%", threshold: 0.1 }
    );

    /* Observe every revealable element currently in the DOM */
    const REVEAL_SELECTORS = [
      ".feature-card",
      ".showcase-text",
      ".showcase-image",
      ".gallery-item",
      ".process-step",
      ".testimonial-card",
      ".invitation-content",
    ];

    const observeRevealables = () => {
      document
        .querySelectorAll(REVEAL_SELECTORS.join(", "))
        .forEach((el) => {
          if (!el.classList.contains("revealed")) {
            revealObserver.observe(el);
          }
        });
    };

    observeRevealables();

    /* ── 2b. Stagger animations for grid children ──────────────────── */
    const staggerGridItems = () => {
      const grids = document.querySelectorAll(
        ".features-grid, .gallery-grid, .process-steps, .testimonials-grid"
      );

      grids.forEach((grid) => {
        const children = grid.querySelectorAll(
          ".feature-card, .gallery-item, .process-step, .testimonial-card"
        );
        children.forEach((child, idx) => {
          child.style.transitionDelay = `${idx * STAGGER_DELAY_S}s`;
        });
      });
    };

    staggerGridItems();

    /* ── 3. Hero Parallax — overlay opacity deepens on scroll ────── */
    const heroOverlay = document.querySelector(".hero-overlay");
    const heroSection = document.querySelector(".hero");

    let heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;
    window.addEventListener("resize", () => {
      heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;
    });

    /* ── 4. Navbar — transparent ↔ scrolled ────────────────────────── */
    const header = document.getElementById("header");

    /* ── 7. Floating Buttons ───────────────────────────────────────── */
    const kakaoFloat = document.getElementById("kakao-float");
    const backToTop  = document.getElementById("back-to-top");

    /* Combined scroll handler via rAF for butter-smooth performance   */
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const sy = window.scrollY;

        /* Navbar */
        if (header) {
          if (sy > NAVBAR_SCROLL_THRESHOLD) {
            header.classList.remove("nav-transparent");
            header.classList.add("nav-scrolled");
          } else {
            header.classList.remove("nav-scrolled");
            header.classList.add("nav-transparent");
          }
        }

        /* Hero overlay parallax */
        if (heroOverlay) {
          const ratio    = Math.min(sy / heroH, 1);
          const opacity  = HERO_OVERLAY_MIN + (HERO_OVERLAY_MAX - HERO_OVERLAY_MIN) * ratio;
          heroOverlay.style.opacity = opacity;
        }

        /* Floating buttons */
        if (kakaoFloat) {
          kakaoFloat.classList.toggle("visible", sy > KAKAO_SHOW_OFFSET);
        }
        if (backToTop) {
          backToTop.classList.toggle("visible", sy > BACK_TO_TOP_OFFSET);
        }

        ticking = false;
      });
    };

    /* Set initial states */
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Back-to-top click */
    if (backToTop) {
      backToTop.addEventListener("click", () => {
        smoothScrollTo(0, 1000);
      });
    }

    /* ── 5. Gallery ────────────────────────────────────────────────── */
    const galleryGrid = document.getElementById("dynamic-gallery");

    const demoItems = [
      {
        brand: "Hermès",
        product: "Birkin 25 Togo Noir Gold Hardware",
        imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
        price: "42,000,000 KRW"
      },
      {
        brand: "Chanel",
        product: "Classic Medium Flap Bag Black Caviar",
        imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        price: "12,500,000 KRW"
      },
      {
        brand: "Rolex",
        product: "Cosmograph Daytona 116500LN",
        imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
        price: "41,000,000 KRW"
      },
      {
        brand: "Audemars Piguet",
        product: "Royal Oak 15500ST",
        imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80",
        price: "70,000,000 KRW"
      },
      {
        brand: "Van Cleef & Arpels",
        product: "Vintage Alhambra Necklace Onyx",
        imageUrl: "https://images.unsplash.com/photo-1599643478524-fb66f7248766?w=800&q=80",
        price: "3,800,000 KRW"
      },
      {
        brand: "Cartier",
        product: "Juste un Clou Necklace Rose Gold",
        imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        price: "5,500,000 KRW"
      },
    ];

    let globalItems = [];

    const renderGallery = (itemsToRender) => {
      if (!galleryGrid) return;
      galleryGrid.innerHTML = "";

      itemsToRender.forEach((item, index) => {
        const imageUrl = item.imageUrl || item["이미지 URL"] || "";
        const brand    = item.brand    || item["브랜드명"]   || "Le Meyou";
        const product  = item.product  || item["상품명"]     || "Exclusive Piece";
        let priceStr = item.sellingPrice ? "₩" + Number(item.sellingPrice).toLocaleString() : (item.price || item["판매가"] || "Price Upon Request");

        if (item.sellingPrice && item.sellingPrice >= 50000000) {
          priceStr = "Price Upon Request <a href='#contact' style='text-decoration:underline; margin-left:5px; color:#c9a96e;'>[Inquire]</a>";
        } else if (item.price === "Price Upon Request") {
          priceStr = "Price Upon Request <a href='#contact' style='text-decoration:underline; margin-left:5px; color:#c9a96e;'>[Inquire]</a>";
        }

        const el = document.createElement("div");
        el.className = "gallery-item";
        el.style.transitionDelay = `${(index % 8) * STAGGER_DELAY_S}s`;

        el.innerHTML = `
          <img src="${imageUrl}" alt="${brand} ${product}" loading="lazy"
               onerror="this.parentElement.style.display='none'">
          <div class="gallery-caption">
            <h4>${brand}</h4>
            <p>${product}</p>
            <p class="gallery-price" style="margin-top: 12px; font-weight: 500; font-family: 'Inter', sans-serif; font-size: 10px; letter-spacing: 2.5px; opacity: 0.9; color: #c9a96e;">${priceStr}</p>
          </div>
        `;

        galleryGrid.appendChild(el);
        revealObserver.observe(el);
      });
    };

    const initGallery = (liveItems) => {
      // Remove duplicates by product name (favoring live items)
      const all = [...liveItems, ...demoItems];
      const seen = new Set();
      globalItems = all.filter(item => {
        const prod = item.product || item["상품명"];
        if (seen.has(prod)) return false;
        seen.add(prod);
        return true;
      });
      renderGallery(globalItems);
    };

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        const filter = e.target.getAttribute('data-filter');
        
        let filtered = globalItems;
        if (filter === 'Vault') {
          openVault();
          return;
        }

        if (filter !== 'all') {
          if (filter === 'Jewelry') {
            filtered = globalItems.filter(item => {
              const cat = item.category || item['카테고리'] || '';
              return cat.includes('Jewelry') || cat.includes('주얼리') || ['Van Cleef & Arpels', 'Cartier', 'Bulgari', 'Tiffany & Co.'].includes(item.brand || item['브랜드명']);
            });
          } else if (filter === 'Others') {
            const mainBrands = ['Hermès', 'Chanel', 'Rolex', 'Patek Philippe', 'Van Cleef & Arpels', 'Cartier'];
            filtered = globalItems.filter(item => {
              const brand = item.brand || item['브랜드명'] || '';
              return !mainBrands.includes(brand);
            });
          } else {
            filtered = globalItems.filter(item => {
              const brand = item.brand || item['브랜드명'] || '';
              return brand.includes(filter);
            });
          }
        }
        
        renderGallery(filtered);
      });
    });

    if (galleryGrid) {
      /* Show demo items immediately */
      initGallery([]);

      /* Attempt to fetch live items from Google Sheets */
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => res.json())
        .then((data) => {
          const displayItems = data.filter((item) => {
            const flag = (item["홈페이지 전시 여부"] || "")
              .toString()
              .trim()
              .toUpperCase();
            return ["Y", "YES", "전시", "TRUE"].includes(flag);
          });
          if (displayItems.length > 0) {
            initGallery(displayItems);
            // Re-apply active filter if fetch completes after a user clicked a filter
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            if(activeFilterBtn) activeFilterBtn.click();
          }
        })
        .catch(() => {
          /* Demo items already rendered — fail silently */
        });
    }

    /* ── 9. Modals & Concierge Flow ────────────────────────────────── */
    const vaultModal = document.getElementById("vault-modal");
    const conciergeModal = document.getElementById("concierge-modal");
    
    const closeVaultBtn = document.getElementById("close-vault-btn");
    const submitVaultBtn = document.getElementById("submit-vault-btn");
    const vaultPasscode = document.getElementById("vault-passcode");
    const vaultError = document.getElementById("vault-error");

    const openVault = () => {
      if(vaultModal) vaultModal.classList.add("active");
    };
    
    if(closeVaultBtn) closeVaultBtn.addEventListener("click", () => {
      vaultModal.classList.remove("active");
      if(vaultPasscode) vaultPasscode.value = "";
      if(vaultError) vaultError.style.opacity = 0;
      // Reset filter to ALL if they cancel vault
      const allFilterBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allFilterBtn) allFilterBtn.click();
    });

    if(submitVaultBtn) submitVaultBtn.addEventListener("click", () => {
      if(vaultPasscode.value === "VIP2026") {
        vaultModal.classList.remove("active");
        const vaultItems = [
          {
            brand: "Hermès",
            product: "Birkin 20 Faubourg Sellier",
            imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
            price: "Price Upon Request",
            sellingPrice: 400000000
          },
          {
            brand: "Patek Philippe",
            product: "Grand Complications 5208P",
            imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
            price: "Price Upon Request",
            sellingPrice: 1200000000
          }
        ];
        renderGallery(vaultItems);
      } else {
        vaultError.innerText = "Invalid Access Code.";
        vaultError.style.opacity = 1;
      }
    });

    // Concierge Logic
    const openConciergeBtn = document.getElementById("open-concierge-btn");
    const closeConciergeBtn = document.getElementById("close-concierge-btn");
    let currentStep = 1;

    const showStep = (step) => {
      document.querySelectorAll(".concierge-steps .step").forEach(s => s.classList.remove("active"));
      const stepEl = document.getElementById(`c-step-${step}`);
      if(stepEl) stepEl.classList.add("active");
    };

    if(openConciergeBtn) openConciergeBtn.addEventListener("click", () => {
      if(conciergeModal) {
        conciergeModal.classList.add("active");
        currentStep = 1;
        showStep(currentStep);
      }
    });

    if(closeConciergeBtn) closeConciergeBtn.addEventListener("click", () => {
      conciergeModal.classList.remove("active");
    });

    document.querySelectorAll(".c-opt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentStep = 2;
        showStep(currentStep);
      });
    });

    const cNextBtn = document.querySelector(".c-next-btn");
    if(cNextBtn) cNextBtn.addEventListener("click", () => {
      const ref = document.getElementById("c-ref").value;
      if(ref.trim() !== "") {
        currentStep = 3;
        showStep(currentStep);
      }
    });

    document.querySelectorAll(".c-opt-btn-2").forEach(btn => {
      btn.addEventListener("click", () => {
        currentStep = 4;
        showStep(currentStep);
      });
    });

    const cSubmitBtn = document.getElementById("c-submit-btn");
    if(cSubmitBtn) cSubmitBtn.addEventListener("click", () => {
      const contact = document.getElementById("c-contact").value;
      if(contact.trim() !== "") {
        currentStep = 5;
        showStep(currentStep);
        setTimeout(() => {
          conciergeModal.classList.remove("active");
        }, 3000);
      }
    });

    /* ── 6. Page Loader ────────────────────────────────────────────── */
    const loader = document.getElementById("page-loader");
    if (loader) {
      setTimeout(() => {
        loader.classList.add("hidden");
      }, LOADER_DURATION_MS);
    }

    /* ── 8. Active Nav Highlighting ────────────────────────────────── */
    const navLinks   = document.querySelectorAll('nav a[href^="#"]');
    const sectionIds = [...navLinks].map((a) => a.getAttribute("href").slice(1));
    const sections   = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((sec) => navObserver.observe(sec));
  });
})();
