// --- Quotes & Storage ---
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const categoryFilter = document.getElementById("categoryFilter");

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// --- Display & Random Quote ---
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

function showRandomQuote() {
  displayRandomQuote();
}

// --- Add Quote ---
function addQuote(text, category) {
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  filterQuotes(); // show quotes matching current filter
  quoteDisplay.innerHTML = `"${text}" — <strong>${category}</strong> added successfully!`;
}

// --- Dynamic Add Quote Form ---
function createAddQuoteForm() {
  const formDiv = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";

  addButton.addEventListener("click", function () {
    if (textInput.value && categoryInput.value) {
      addQuote(textInput.value, categoryInput.value);
      textInput.value = "";
      categoryInput.value = "";
    }
  });

  formDiv.appendChild(textInput);
  formDiv.appendChild(categoryInput);
  formDiv.appendChild(addButton);
  document.body.appendChild(formDiv);
}

// --- Category Filtering ---
function populateCategories() {
  const selected = localStorage.getItem("lastSelectedCategory") || "all";
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';

  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    if (cat === selected) option.selected = true;
    categoryFilter.appendChild(option);
  });

  filterQuotes();
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("lastSelectedCategory", selectedCategory);

  quoteDisplay.innerHTML = "";
  const filtered = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  filtered.forEach(q => {
    const p = document.createElement("p");
    p.innerHTML = `"${q.text}" — <strong>${q.category}</strong>`;
    quoteDisplay.appendChild(p);
  });
}

// --- JSON Import/Export ---
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.readAsText(event.target.files[0]);
  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
}

// --- Server Sync & Conflict Resolution ---
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchQuotesFromServer() {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();
    return serverData.map(item => ({ text: item.title, category: "Server" }));
  }
  
  async function syncQuotes() {
    try {
      const serverQuotes = await fetchQuotesFromServer();
  
      let updated = false;
      serverQuotes.forEach(sq => {
        const exists = quotes.find(q => q.text === sq.text && q.category === sq.category);
        if (!exists) {
          quotes.push(sq);
          updated = true;
        }
      });
  
      if (updated) {
        saveQuotes();
        populateCategories();
        alert("Quotes updated from server!");
      }
  
    } catch (error) {
      console.error("Error syncing quotes:", error);
    }
  }
  

setInterval(syncWithServer, 30000); // auto sync every 30s

// --- Event Listeners ---
newQuoteBtn.addEventListener("click", showRandomQuote);

const syncBtn = document.getElementById("syncBtn");
if (syncBtn) syncBtn.addEventListener("click", syncWithServer);

// --- Initialize ---
createAddQuoteForm();
populateCategories();
