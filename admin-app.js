document.addEventListener("DOMContentLoaded", () => {
  // Tab Navigation Logic
  const navItems = document.querySelectorAll('.nav-item');
  const tabContents = document.querySelectorAll('.tab-content');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active from all nav items
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // Add active to clicked nav item
      item.classList.add('active');
      
      // Hide all tabs
      tabContents.forEach(tab => tab.classList.remove('active'));
      
      // Show target tab
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Chart.js Initialization for BI Dashboard
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
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
});
