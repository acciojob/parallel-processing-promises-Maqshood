//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

function downloadAllImages(images) {
  loading.classList.remove("hidden");
  error.classList.add("hidden");
  output.innerHTML = "";

  const promises = images.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(imgElements => {
      imgElements.forEach(img => output.appendChild(img));
    })
    .catch(errMsg => {
      error.textContent = errMsg;
      error.classList.remove("hidden");
    })
    .finally(() => {
      loading.classList.add("hidden");
    });
}

btn.addEventListener("click", () => {
  downloadAllImages(images);
});