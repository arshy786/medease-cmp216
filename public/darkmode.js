'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('darkModeToggle');
  const body = document.body;
  // Function to enable dark mode
  function enableDarkMode() {
    body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
    if (toggle) toggle.setAttribute('aria-checked', 'true');
  }
  // Function to disable dark mode
  function disableDarkMode() {
    body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
    if (toggle) toggle.setAttribute('aria-checked', 'false');
  }
  // Apply saved dark mode preference
  const storedMode = localStorage.getItem('darkMode');
  if (storedMode === 'enabled') {
    enableDarkMode();
    if (toggle) toggle.checked = true;
  } else {
    disableDarkMode();
  }
  // Handle toggle interaction
  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  }
});