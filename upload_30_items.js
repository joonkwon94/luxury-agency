const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyfOT2ZntPayJ7_o1IqfHHKqeDfU7vVC36G5lvk8lsSojgDeeSXwzy7BTxIe7Ua-NfylQ/exec";

const items = [
  // Hermès (6 items)
  { brand: "Hermès", category: "Bag", product: "Birkin 25 Togo Noir Gold Hardware", sku: "H-B25-TG-BK-GHW", color: "Noir", size: "25cm", material: "Togo Leather", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80", cost: 25000000, sellingPrice: 35000000 },
  { brand: "Hermès", category: "Bag", product: "Kelly 25 Epsom Etoupe Palladium Hardware", sku: "H-K25-EP-ET-PHW", color: "Etoupe", size: "25cm", material: "Epsom Leather", imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80", cost: 23000000, sellingPrice: 32000000 },
  { brand: "Hermès", category: "Bag", product: "Constance 18 Box Calf Rouge H", sku: "H-C18-BC-RH-GHW", color: "Rouge H", size: "18cm", material: "Box Calf", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80", cost: 15000000, sellingPrice: 21000000 },
  { brand: "Hermès", category: "Bag", product: "Picotin Lock 18 Clemence Craie", sku: "H-P18-CL-CR-GHW", color: "Craie", size: "18cm", material: "Clemence Leather", imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80", cost: 4500000, sellingPrice: 6500000 },
  { brand: "Hermès", category: "Bag", product: "Evelyne III 29 Gold Clemence", sku: "H-E29-CL-GD-PHW", color: "Gold", size: "29cm", material: "Clemence Leather", imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80", cost: 5000000, sellingPrice: 7500000 },
  { brand: "Hermès", category: "Bag", product: "Mini Kelly II Epsom Rose Texas", sku: "H-MK2-EP-RT-GHW", color: "Rose Texas", size: "20cm", material: "Epsom Leather", imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80", cost: 28000000, sellingPrice: 42000000 },

  // Chanel (5 items)
  { brand: "Chanel", category: "Bag", product: "Classic Medium Flap Bag Black Caviar", sku: "C-CFM-CA-BK-GHW", color: "Black", size: "Medium", material: "Caviar Leather", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", cost: 10000000, sellingPrice: 15500000 },
  { brand: "Chanel", category: "Bag", product: "Mini Flap Bag Pearl Crush Black", sku: "C-MF-PC-BK-GHW", color: "Black", size: "Mini", material: "Lambskin", imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", cost: 6500000, sellingPrice: 8500000 },
  { brand: "Chanel", category: "Bag", product: "Chanel 22 Bag Small White", sku: "C-22-SM-WH-GHW", color: "White", size: "Small", material: "Calfskin", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", cost: 7000000, sellingPrice: 9500000 },
  { brand: "Chanel", category: "Bag", product: "Boy Chanel Medium Black Ruthenium", sku: "C-BOY-MD-BK-RHW", color: "Black", size: "Medium", material: "Calfskin", imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80", cost: 8500000, sellingPrice: 11000000 },
  { brand: "Chanel", category: "Bag", product: "Wallet on Chain (WOC) Caviar Black", sku: "C-WOC-CA-BK-GHW", color: "Black", size: "One Size", material: "Caviar Leather", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", cost: 4500000, sellingPrice: 6000000 },

  // Watches (8 items)
  { brand: "Rolex", category: "Watch", product: "Cosmograph Daytona 'Panda' 116500LN", sku: "R-116500LN-WT", color: "White Dial", size: "40mm", material: "Oystersteel", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80", cost: 30000000, sellingPrice: 42000000 },
  { brand: "Rolex", category: "Watch", product: "Submariner Date 126610LN", sku: "R-126610LN", color: "Black Dial", size: "41mm", material: "Oystersteel", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80", cost: 13000000, sellingPrice: 18500000 },
  { brand: "Rolex", category: "Watch", product: "GMT-Master II 'Pepsi' 126710BLRO", sku: "R-126710BLRO", color: "Black Dial", size: "40mm", material: "Oystersteel", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80", cost: 14000000, sellingPrice: 28000000 },
  { brand: "Rolex", category: "Watch", product: "Datejust 36 Mint Green 126234", sku: "R-126234-MG", color: "Mint Green Dial", size: "36mm", material: "White Rolesor", imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80", cost: 11000000, sellingPrice: 16500000 },
  { brand: "Patek Philippe", category: "Watch", product: "Nautilus 5711/1A Blue Dial", sku: "PP-5711-1A-BL", color: "Blue Dial", size: "40mm", material: "Steel", imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80", cost: 100000000, sellingPrice: 145000000 },
  { brand: "Patek Philippe", category: "Watch", product: "Aquanaut 5167A", sku: "PP-5167A", color: "Black Dial", size: "40mm", material: "Steel / Rubber", imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80", cost: 50000000, sellingPrice: 85000000 },
  { brand: "Audemars Piguet", category: "Watch", product: "Royal Oak 15500ST Blue Dial", sku: "AP-15500ST-BL", color: "Blue Dial", size: "41mm", material: "Steel", imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80", cost: 45000000, sellingPrice: 70000000 },
  { brand: "Vacheron Constantin", category: "Watch", product: "Overseas 4500V Blue", sku: "VC-4500V-BL", color: "Blue Dial", size: "41mm", material: "Steel", imageUrl: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80", cost: 35000000, sellingPrice: 52000000 },

  // Jewelry (7 items)
  { brand: "Van Cleef & Arpels", category: "Jewelry", product: "Vintage Alhambra 10 Motif Onyx", sku: "VCA-VA10-ON-YG", color: "Onyx", size: "10 Motif", material: "Yellow Gold", imageUrl: "https://images.unsplash.com/photo-1599643477874-c5aaffe948b2?w=800&q=80", cost: 9500000, sellingPrice: 11500000 },
  { brand: "Van Cleef & Arpels", category: "Jewelry", product: "Vintage Alhambra Pendant Guilloché", sku: "VCA-VAP-GU-YG", color: "Gold", size: "1 Motif", material: "Yellow Gold", imageUrl: "https://images.unsplash.com/photo-1599643477874-c5aaffe948b2?w=800&q=80", cost: 4500000, sellingPrice: 5800000 },
  { brand: "Cartier", category: "Jewelry", product: "Juste un Clou Necklace Diamonds", sku: "CA-JUC-NK-DIA-YG", color: "Gold", size: "One Size", material: "Yellow Gold", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", cost: 12000000, sellingPrice: 15000000 },
  { brand: "Cartier", category: "Jewelry", product: "Love Bracelet SM Diamond Paved", sku: "CA-LOVE-SM-DIA-RG", color: "Rose Gold", size: "16", material: "Rose Gold", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", cost: 35000000, sellingPrice: 42000000 },
  { brand: "Cartier", category: "Jewelry", product: "Panthère de Cartier Watch Small", sku: "CA-PAN-SM-YG", color: "Gold", size: "Small", material: "Yellow Gold", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", cost: 25000000, sellingPrice: 32000000 },
  { brand: "Bulgari", category: "Jewelry", product: "Serpenti Viper Ring 2-Coil", sku: "BV-SER-R2-RG-DIA", color: "Rose Gold", size: "52", material: "Rose Gold, Diamonds", imageUrl: "https://images.unsplash.com/photo-1599643477874-c5aaffe948b2?w=800&q=80", cost: 15000000, sellingPrice: 18500000 },
  { brand: "Tiffany & Co.", category: "Jewelry", product: "HardWear Link Necklace", sku: "TIF-HW-NK-YG", color: "Gold", size: "18in", material: "Yellow Gold", imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80", cost: 18000000, sellingPrice: 22000000 },

  // Others (4 items)
  { brand: "Goyard", category: "Bag", product: "Saint Louis PM Tote Black/Tan", sku: "GY-SL-PM-BT", color: "Black/Tan", size: "PM", material: "Goyardine Canvas", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", cost: 2500000, sellingPrice: 3800000 },
  { brand: "Dior", category: "Bag", product: "Medium Lady Dior Bag Black Ultramatte", sku: "DI-LD-MD-BK-UM", color: "Ultramatte Black", size: "Medium", material: "Calfskin", imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4b4a8e?w=800&q=80", cost: 8500000, sellingPrice: 10500000 },
  { brand: "Bottega Veneta", category: "Bag", product: "Mini Jodie Fondant", sku: "BV-MJ-FD", color: "Fondant", size: "Mini", material: "Intrecciato Leather", imageUrl: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80", cost: 3000000, sellingPrice: 3800000 },
  { brand: "Loro Piana", category: "Bag", product: "Extra Pocket L19 Ostrich Kummel", sku: "LP-EP-L19-OS-KM", color: "Kummel", size: "L19", material: "Ostrich", imageUrl: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80", cost: 6500000, sellingPrice: 9800000 }
];

async function uploadItems() {
  console.log(`Starting upload of ${items.length} items...`);
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const payload = new URLSearchParams({
      timestamp: new Date().toISOString(),
      category: item.category,
      brand: item.brand,
      product: item.product,
      sku: item.sku,
      color: item.color,
      size: item.size,
      material: item.material,
      imageUrl: item.imageUrl,
      displayYn: "Y",
      url: "https://kream.co.kr",
      channel: "유럽 부티크 VIP",
      memo: "풀세트, 인보이스 포함, 즉시 배송 가능",
      cost: item.cost,
      fta: "Y",
      overseasShipping: 150000,
      customs: item.cost * 0.18,
      domesticShipping: 50000,
      platform: "자사몰",
      sellingPrice: item.sellingPrice,
      marketFee: 0,
      finalMargin: item.sellingPrice - item.cost - 150000 - (item.cost * 0.18) - 50000
    });

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload
      });
      console.log(`[${i + 1}/${items.length}] Uploaded: ${item.brand} ${item.product}`);
    } catch (e) {
      console.error(`[${i + 1}/${items.length}] Failed to upload: ${item.brand} ${item.product}`, e);
    }
    
    // Add a small delay to avoid hitting GAS rate limits
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("Upload complete.");
}

uploadItems();
