document.addEventListener('DOMContentLoaded', () => {
  const skipToContentLink = document.querySelector('.skip-to-content');
  let firstTabPressed = false;

  // Sembunyikan "Skip to Content" saat halaman dimuat
  skipToContentLink.style.display = 'none';

  // Function untuk menangani keydown event
  function handleTabKey(event) {
    if (event.key === 'Tab') {
      if (!firstTabPressed) {
        skipToContentLink.style.display = 'inline-block';
        skipToContentLink.focus();
        firstTabPressed = true;
      } else {
        // Hilangkan kelas 'show' jika "Skip to Content" kehilangan fokus
        skipToContentLink.classList.remove('show');
      }
    }
  }

  document.addEventListener('keydown', handleTabKey);

  skipToContentLink.addEventListener('blur', () => {
    // Hilangkan kelas 'show' jika "Skip to Content" link kehilangan fokus
    skipToContentLink.classList.remove('show');
  });
});
