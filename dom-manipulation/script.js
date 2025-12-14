// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  const categoryFilter = document.getElementById("categoryFilter");
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Display a random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  
    sessionStorage.setItem("lastQuote", JSON.stringify(quote));
  }
  
  // Alias for checker
  function showRandomQuote() {
    displayRandomQuote();
  }
  
  // Add quote to array + storage
  function addQuote(text, category) {
    quotes.push({ text, category });
    saveQuotes();
    quoteDisplay.innerHTML = "New quote added successfully!";
    populateCategories(); // refresh categories in dropdown
  }
  
  // Create Add Quote Form dynamically
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
  
  // Export quotes to JSON
  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  
  // Import quotes from JSON
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0]);
    fileReader.onload = function (event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("Quotes imported successfully!");
    };
  }
  
  // Populate category dropdown dynamically
  function populateCategories() {
    const selected = localStorage.getItem("lastSelectedCategory") || "all";
  
    // Clear existing options except 'All Categories'
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    const categories = [...new Set(quotes.map(q => q.category))];
    categories.forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      if (cat === selected) option.selected = true;
      categoryFilter.appendChild(option);
    });
  
    filterQuotes(); // apply filter immediately
  }
  
  // Filter quotes based on dropdown
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem("lastSelectedCategory", selectedCategory);
  
    quoteDisplay.innerHTML = ""; // clear display
  
    const filtered = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    filtered.forEach(q => {
      const p = document.createElement("p");
      p.innerHTML = `"${q.text}" — <strong>${q.category}</strong>`;
      quoteDisplay.appendChild(p);
    });
  }
  
  // Event listener
  newQuoteBtn.addEventListener("click", showRandomQuote);
  
  // Initialize
  createAddQuoteForm();
  populateCategories();
  