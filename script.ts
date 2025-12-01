// -----------------------------
// 🔥 GLOBAL CONSTANTS
// -----------------------------
const ADMIN_PASSWORD = "Yash_Christmas_2025"; // <<< your hardcoded admin password

// Non-null DOM references (safe because HTML includes these IDs)
const giftContainer = document.getElementById("gift-container")!;
const toastBox = document.getElementById("toast")!;
const adminSection = document.getElementById("admin-section")!;
const addItemSection = document.getElementById("add-item-section")!;
const addItemForm = document.getElementById("add-item-form") as HTMLFormElement;

// -----------------------------
// 🎄 Utility: Toast Message
// -----------------------------
function showToast(message: string): void {
  toastBox.innerText = message;
  toastBox.className = "toast show";
  setTimeout(() => {
    toastBox.className = "toast";
  }, 2000);
}


// -----------------------------
// 🎄 DEFAULT INITIAL GIFT LIST
// -----------------------------
const DEFAULT_ITEMS = [
  {
    name: "Woop 5.0",
    link: "https://www.amazon.in/Whoop-5-0-Peak-Membership-Personalized/dp/B0FCFN34QP/ref=sr_1_1?crid=2ILZ66M6TZG70&dib=eyJ2IjoiMSJ9.5rVCabD4SeWzCBCkk5_yZfL4lHo2PKUDSkC2e9KxTqOnect-IvzGQiNHiWXb3k-fJT0t0wW0jX8bESGN2Z8-ap2Ho0W2AdH038CONCT9BaJVQwk5r4fSQ73ffu8BZevZUV2WdNqyvBiWGI6KFc9S-oiKG-EJSp1OR7se2s1xCe_JzofWNiPFp1OijSiRa_R30Bidx_bG9nBtSMVidbnUmHwauqkYb4HU7GyTh0WZ_IxpUgqJ94EK1y3oNA4ooUZduXTlpFettrKoawH2JPLuidVRDMYER_vauDoOuZxH4pU.8Rf7KlGzDIKhum1QMX6ry12hvH1tKdX8Kt_4k3lzGOg&dib_tag=se&keywords=woop+band+5.0&qid=1764154539&sprefix=woop+%2Caps%2C597&sr=8-1"
  },
  {
    name: "Nike Pegasus EasyOn UK-10",
    link: "https://www.nike.com/in/t/pegasus-easyon-road-running-shoes-NMBl5l/FQ7837-002"
  },
  {
    name: "Stubble & Co Roll Top 20L Bag (Black)",
    link: "https://www.stubbleandco.com/products/the-roll-top-20l?srsltid=AfmBOor5yhCiFoiW5RaxS0MIL8huqeVLpY70yBXLH_gvlTMofxMGvRnU&variant=40445040165050"
  },
  {
    name: "Lamy Safari Medium Nib Fountain Pen (Umbra)",
    link: "https://makoba.com/products/lamy-safari-fountain-pen-umbra"
  },
  {
    name: "Marshall Emberton II",
    link: "https://www.marshall.com/in/en/product/emberton-ii?pid=1006234"
  },
  {
    name: "Instax Mini 12 Camera",
    link: "https://www.instax.in/products/instax-mini-12-camera?variant=43187635126403"
  }
];

// -----------------------------
// 🎁 Load Gift List From LocalStorage
// -----------------------------
function loadGiftItems(): void {
  let saved = localStorage.getItem("giftList");

  // If first time, load defaults
  if (!saved) {
    localStorage.setItem("giftList", JSON.stringify(DEFAULT_ITEMS));
    saved = localStorage.getItem("giftList");
  }

  const items: { name: string; link: string }[] = saved ? JSON.parse(saved) : [];

  giftContainer.innerHTML = ""; // Clear previous

  items.forEach((item) => {
    const li = document.createElement("li");
    li.className = "card";
    li.innerHTML = `
      ${item.name}
      <a href="${item.link}" target="_blank">Buy</a>
    `;
    giftContainer.appendChild(li);
  });
}

// -----------------------------
// 🔐 Verify Admin Login
// -----------------------------
function openAdminLogin(): void {
  const password = prompt("Enter Admin Password:");

  if (!password) {
    showToast("🚫 Password required!");
    return;
  }

  if (password === ADMIN_PASSWORD) {
    showToast("✅ Welcome Admin!");
    adminSection.style.display = "none";
    addItemSection.style.display = "block";
  } else {
    showToast("❌ Wrong password! Santa does not approve! 🎅");
  }
}

// -----------------------------
// ➕ Add New Item To Gift List
// -----------------------------
addItemForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const itemName = (document.getElementById("item-name") as HTMLInputElement).value.trim();
  const itemLink = (document.getElementById("item-link") as HTMLInputElement).value.trim();

  if (!itemName || !itemLink) {
    showToast("⚠ Please fill all fields!");
    return;
  }

  const savedList = localStorage.getItem("giftList");
  const items: { name: string; link: string }[] = savedList ? JSON.parse(savedList) : [];

  items.push({ name: itemName, link: itemLink });
  localStorage.setItem("giftList", JSON.stringify(items));

  showToast("🎉 Item Added Successfully!");

  // Reset form
  addItemForm.reset();

  // Refresh Display
  loadGiftItems();

  // Redirect to homepage automatically
  setTimeout(() => {
    addItemSection.style.display = "none";
    adminSection.style.display = "block";
  }, 800);
});

// -----------------------------
// 🚀 Initialize Page
// -----------------------------
(window as any).openAdminLogin = openAdminLogin; // Make function available in HTML
loadGiftItems();