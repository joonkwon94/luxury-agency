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
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0OyyGNz6LpV_Aq6-ul4LjlcIs46teyzLbfCc1cqwe0_sOBPo6GycgRg-U_AUia_6W/exec";
  const galleryGrid = document.getElementById('dynamic-gallery');

  if (galleryGrid) {
    fetch(GOOGLE_SCRIPT_URL)
      .then(response => response.json())
      .then(data => {
        // Filter items that have "홈페이지 전시 여부" set to 'Y', 'y', 'Yes', 'yes', '전시', or 'TRUE'
        const displayItems = data.filter(item => {
          const displayFlag = (item['홈페이지 전시 여부'] || item['홈페이지 전시'] || '').toString().trim().toUpperCase();
          return ['Y', 'YES', '전시', 'TRUE'].includes(displayFlag);
        });

        if (displayItems.length === 0) {
          galleryGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888;">Currently curating our exclusive collection.</p>`;
          return;
        }

        // Render the items
        displayItems.reverse().forEach((item, index) => {
          const imageUrl = item['이미지 URL'] || item['사진 주소'] || './images/collection_1.png'; // Fallback
          const brand = item['브랜드명'] || 'Le Meyou';
          const product = item['상품명'] || 'Exclusive Piece';
          
          const galleryItem = document.createElement('div');
          galleryItem.className = 'gallery-item';
          galleryItem.style.transitionDelay = `${index * 0.2}s`;
          
          galleryItem.innerHTML = `
            <img src="${imageUrl}" alt="${brand} ${product}" onerror="this.src='./images/collection_3.png'">
            <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: 20px; background: linear-gradient(transparent, rgba(0,0,0,0.7)); color: white;">
              <h4 style="font-family: 'Playfair Display', serif; font-size: 18px; margin-bottom: 5px; color: white;">${brand}</h4>
              <p style="font-family: 'Inter', sans-serif; font-size: 13px; opacity: 0.9;">${product}</p>
            </div>
          `;
          
          galleryGrid.appendChild(galleryItem);
          
          // Observe for fade-in effect
          observer.observe(galleryItem);
        });
      })
      .catch(error => {
        console.error('Error fetching gallery data:', error);
        galleryGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#888;">Unable to load the collection at this time.</p>`;
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
