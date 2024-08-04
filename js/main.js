document.addEventListener("DOMContentLoaded", () => {
  const notification = document.getElementById("notification");

  function showNotification() {
    notification.style.display = "block";
    notification.style.opacity = "1";
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        notification.style.display = "none";
      }, 500);
    }, 1000);
  }

  document.querySelectorAll('[contenteditable="true"]').forEach((element) => {
    const id = element.id;
    if (localStorage.getItem(id)) {
      element.innerHTML = localStorage.getItem(id);
    }

    element.addEventListener("blur", () => {
      localStorage.setItem(id, element.innerHTML);
      showNotification();
    });
  });

  document.getElementById("download-btn").addEventListener("click", () => {
    const content = document.documentElement.outerHTML;
    const blob = new Blob([content], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "resume-page.pdf";
    document.body.appendChild(a);

    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  });
});
