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
    const tempElement = document.createElement("div");

    document.querySelectorAll('[contenteditable="true"]').forEach((element) => {
      tempElement.appendChild(element.cloneNode(true));
    });

    const options = {
      margin: 1,
      filename: "sample.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(options).from(tempElement).save();
  });
});
