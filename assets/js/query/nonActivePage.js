// Menonaktifkan fungsi klik kanan
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Menonaktifkan fungsi F12
document.onkeydown = function (e) {
  if (e.key === "F12") {
    return false;
  }
};

// Menonaktifkan Ctrl+U
document.onkeydown = function (e) {
  if (e.ctrlKey && e.key === 'u') {
    return false;
  }
};

// Menonaktifkan kombinasi tombol Ctrl+Shift+I
document.onkeydown = function (e) {
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    return false;
  }
};
