# Assignment – Time Scraper API

This project is part of an assignment that required building a custom Node.js API using only native modules. The API fetches the latest 6 stories from Time.com and returns them in JSON format.

## 📌 Features

- Built with native `http` and `https` modules (no external libraries)
- Fetches live data from Time.com's RSS feed
- Parses and returns the latest 6 stories
- Clean, lightweight, and easy to run

## 🚀 How to Run

1. Clone the repository:
   git clone https://github.com/Aadill67/time-scraper-api.git
   

3. Navigate to the project folder:
  cd Assignment


5. Run the server:
   node server.js

4. Open your browser and visit:
  http://localhost:5000/getTimeStories


## 🧾 Output Format

```json
[
{
 "title": "Story Title",
 "link": "https://time.com/..."
},
...
]


> 💡 **Note:** If the JSON response appears unformatted in your browser, you can right-click and choose “Pretty Print” (or use a browser extension like JSON Viewer) to view it in a structured format.



