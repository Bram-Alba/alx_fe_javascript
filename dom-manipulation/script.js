// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Save quotes to localStorage
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  // Display random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
  
    quoteDisplay.innerHTML = `"${quote.text}" — <strong>${quote.category}</strong>`;
  
    // Save last viewed quote (session storage)
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
  
  // Export quotes to JSON file
  function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
  
    URL.revokeObjectURL(url);
  }
  
  // Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
  
    fileReader.onload = function (event) {
      const importedQuo
  