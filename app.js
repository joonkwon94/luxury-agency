document.addEventListener("DOMContentLoaded", () => {
  // Navigation Scroll Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Dynamic Gallery Fetching
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfOT2ZntPayJ7_o1IqfHHKqeDfU7vVC36G5lvk8lsSojgDeeSXwzy7BTxIe7Ua-NfylQ/exec";
  const galleryGrid = document.getElementById('dynamic-gallery');

  // Sample luxury items (shown as seed data)
  const demoItems = [
    {
      brand: "Hermès",
      product: "Birkin 25 — Togo Etoupe",
      imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80"
    },
    {
      brand: "Chanel",
      product: "Classic Flap — Black Caviar",
      imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80"
    },
    {
      brand: "Louis Vuitton",
      product: "Capucines MM — Cognac",
      imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    },
    {
      brand: "Hermès",
      product: "Kelly 28 — Gold Epsom",
      imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80"
    },
    {
      brand: "Bottega Veneta",
      product: "Jodie Hobo — Intrecciato Parakeet",
      imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80"
    },
    {
      brand: "Dior",
      product: "Lady Dior MM — Cannage Black",
      imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=80"
    }
  ];

  const renderGallery = (liveItems) => {
    galleryGrid.innerHTML = '';

    // Merge: live items (Y) first, then demo items
    const allItems = [...liveItems, ...demoItems];

    allItems.forEach((item, index) => {
      const imageUrl = item.imageUrl || item['이미지 URL'] || '';
      const brand = item.brand || item['브랜드명'] || 'Le Meyou';
      const product = item.product || item['상품명'] || 'Exclusive Piece';

      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.style.transitionDelay = `${index * 0.15}s`;

      galleryItem.innerHTML = `
        <img src="${imageUrl}" alt="${brand} ${product}" onerror="this.parentElement.style.display='none'">
        <div class="gallery-caption">
          <h4>${brand}</h4>
          <p>${product}</p>
        </div>
      `;

      galleryGrid.appendChild(galleryItem);
      observer.observe(galleryItem);
    });
  };

  if (galleryGrid) {
    fetch(GOOGLE_SCRIPT_URL)
      .then(response => response.json())
      .then(data => {
        const displayItems = data.filter(item => {
          const flag = (item['홈페이지 전시 여부'] || '').toString().trim().toUpperCase();
          return ['Y', 'YES', '전시', 'TRUE'].includes(flag);
        });
        renderGallery(displayItems);
      })
      .catch(() => {
        // If fetch fails, just show demo items
        renderGallery([]);
      });
  }

  // Intersection Observer for animations
  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerInstance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Existing elements animation observing (features, showcases)
  document.querySelectorAll('.feature-card, .showcase-text, .showcase-image').forEach(el => {
    observer.observe(el);
  });
});
