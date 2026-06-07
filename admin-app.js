document.addEventListener("DOMContentLoaded", () => {
  // Tab Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      tabContents.forEach(tab => tab.classList.remove('active'));
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Chart.js Initialization
  const ctx = document.getElementById('salesChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: '구매 전환율 (%)',
          data: [2.5, 3.2, 3.0, 4.5, 4.2, 5.8],
          borderColor: '#d4af37',
          backgroundColor: 'rgba(212, 175, 55, 0.1)',
          borderWidth: 2, fill: true, tension: 0.4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  // Margin Auto Calculation Logic
  const calcInputs = document.querySelectorAll('.calc-input');
  const marketFeeInput = document.getElementById('marketFee');
  const finalMarginInput = document.getElementById('finalMargin');

  const calculateMargin = () => {
    const cost = parseFloat(document.getElementById('cost').value) || 0;
    const overseasShipping = parseFloat(document.getElementById('overseasShipping').value) || 0;
    const customs = parseFloat(document.getElementById('customs').value) || 0;
    const domesticShipping = parseFloat(document.getElementById('domesticShipping').value) || 0;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value) || 0;
    const feeRate = parseFloat(document.getElementById('marketFeeRate').value) || 0;

    const feeAmount = sellingPrice * (feeRate / 100);
    if(marketFeeInput) marketFeeInput.value = feeAmount.toFixed(0);

    const margin = sellingPrice - cost - overseasShipping - customs - domesticShipping - feeAmount;
    if(finalMarginInput) finalMarginInput.value = margin.toFixed(0);
  };

  calcInputs.forEach(input => {
    input.addEventListener('input', calculateMargin);
  });

  // ** IMPORTANT: Replace this with your actual Web App URL after creating the Apps Script **
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby0OyyGNz6LpV_Aq6-ul4LjlcIs46teyzLbfCc1cqwe0_sOBPo6GycgRg-U_AUia_6W/exec";

  // Form Submit Logic (Write to Sheets)
  const sourcingForm = document.getElementById('sourcingForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (sourcingForm) {
    sourcingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const payload = {
        timestamp: new Date().toISOString(),
        category: document.getElementById('category').value,
        brand: document.getElementById('brand').value,
        product: document.getElementById('product').value,
        sku: document.getElementById('sku').value,
        color: document.getElementById('color').value,
        size: document.getElementById('size').value,
        material: document.getElementById('material').value,
        imageUrl: document.getElementById('imageUrl') ? document.getElementById('imageUrl').value : "",
        displayYn: document.getElementById('displayYn') ? document.getElementById('displayYn').value : "N",
        url: document.getElementById('url').value,
        channel: document.getElementById('channel').value,
        memo: document.getElementById('memo').value,
        cost: document.getElementById('cost').value,
        fta: document.getElementById('fta').value,
        overseasShipping: document.getElementById('overseasShipping').value,
        customs: document.getElementById('customs').value,
        domesticShipping: document.getElementById('domesticShipping').value,
        platform: document.getElementById('platform').value,
        sellingPrice: document.getElementById('sellingPrice').value,
        marketFee: document.getElementById('marketFee').value,
        finalMargin: document.getElementById('finalMargin').value
      };

      submitBtn.disabled = true;
      submitBtn.innerText = '저장 중...';
      formStatus.innerText = '';
      formStatus.style.color = 'inherit';

      if(GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
          formStatus.innerText = "❌ 경고: 구글 Apps Script 웹앱 URL이 연동되지 않았습니다.";
          formStatus.style.color = "red";
          submitBtn.disabled = false;
          submitBtn.innerText = '구글 시트에 18개 항목 완벽 전송';
          return;
      }

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload)
      })
      .then(() => {
        formStatus.innerText = '✅ 성공적으로 구글 시트에 저장되었습니다!';
        formStatus.style.color = 'green';
        sourcingForm.reset();
        calculateMargin(); // reset calculated fields
      })
      .catch(error => {
        console.error('Error!', error);
        formStatus.innerText = '❌ 저장 중 오류가 발생했습니다.';
        formStatus.style.color = 'red';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = '구글 시트에 18개 항목 완벽 전송';
      });
    });
  }

  // Fetch Logic (Read from Sheets)
  const refreshDataBtn = document.getElementById('refreshDataBtn');
  const historyTableBody = document.getElementById('historyTableBody');

  if (refreshDataBtn && historyTableBody) {
    refreshDataBtn.addEventListener('click', () => {
      
      if(GOOGLE_SCRIPT_URL === "YOUR_GOOGLE_SCRIPT_WEB_APP_URL") {
        historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:red;">❌ 구글 스크립트 URL이 연동되지 않았습니다.</td></tr>`;
        return;
      }

      refreshDataBtn.disabled = true;
      refreshDataBtn.innerText = '데이터 불러오는 중...';
      historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px;">데이터를 불러오고 있습니다...</td></tr>`;

      fetch(GOOGLE_SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
          // data will be an array of objects
          if(data.length === 0) {
            historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px;">아직 저장된 소싱 데이터가 없습니다.</td></tr>`;
            return;
          }

          historyTableBody.innerHTML = '';
          // Render data (Assuming the Apps Script returns objects matching the headers)
          // We'll reverse it so newest is on top
          data.reverse().forEach(row => {
            const dateStr = row['입력시간'] ? new Date(row['입력시간']).toLocaleString() : '-';
            const tr = document.createElement('tr');
            tr.innerHTML = `
              <td>${dateStr}</td>
              <td style="font-weight:600;">${row['브랜드명'] || '-'}</td>
              <td>${row['상품명'] || '-'}</td>
              <td>${row['색상'] || ''} / ${row['사이즈'] || ''}</td>
              <td>₩ ${Number(row['실제 매입 단가(원화 환산)'] || 0).toLocaleString()}</td>
              <td>₩ ${Number(row['판매가'] || 0).toLocaleString()}</td>
              <td style="color:var(--success); font-weight:600;">₩ ${Number(row['최종 마진'] || 0).toLocaleString()}</td>
              <td>${row['관리자 메모'] || '-'}</td>
            `;
            historyTableBody.appendChild(tr);
          });
        })
        .catch(error => {
          console.error(error);
          historyTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:30px; color:red;">❌ 데이터를 불러오지 못했습니다. 앱스 스크립트 설정을 확인하세요.</td></tr>`;
        })
        .finally(() => {
          refreshDataBtn.disabled = false;
          refreshDataBtn.innerText = '🔄 데이터 불러오기';
        });
    });
  }
});
