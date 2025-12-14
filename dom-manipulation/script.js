// Quotes array
const quotes = [
    { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal.", category: "Motivation" }
  ];
  
  // DOM elements
  const quoteDisplay = document.getElementById("quoteDisplay");
  const newQuoteBtn = document.getElementById("newQuote");
  
  // Function to display a random quote
  function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
  
    // REQUIRED: innerHTML usage
    quoteDisplay.innerHTML = `"${randomQuote.text}" — <em>${randomQuote.category}</em>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const quoteTextInput = document.getElementById("newQuoteText");
    const quoteCategoryInput = document.getElementById("newQuoteCategory");
  
    const text = quoteTextInput.value.trim();
    const category = quoteCategoryInput.value.trim();
  
    if (text !== "" && category !== "") {
      quotes.push({ text, category });
  
      quoteTextInput.value = "";
      quoteCategoryInput.value = "";
  
      // Update DOM after adding
      quoteDisplay.innerHTML = "New quote added successfully!";
    }
  }
  
  // Event listener for button
  newQuoteBtn.addEventListener("click", displayRandomQuote);
  