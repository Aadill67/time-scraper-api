//basic setup
const http = require("http");
const https = require("https");

const PORT = 5000;


//Web Server Creation and Routing
http
  .createServer((req, res) => {
    //console.log("Requested URL:", req.url);
    if (req.url === "/getTimeStories") {
      getStoriesFromTime((latestStories) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(latestStories));
      });
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
  })
  .listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });


  //Data Fetching function
function getStoriesFromTime(callback) {
  const options = {
    hostname: "time.com",
    path: "/feed/",
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  };
  https
    .get(options, (resp) => {
      let htmlContent = "";

      resp.on("data", (chunk) => (htmlContent += chunk));
      resp.on("end", () => {
        const latestStories = parseStories(htmlContent);
        callback(latestStories);
      });
    })
    .on("error", (err) => {
      console.error("Error fetching Time.com:", err.message);
      callback([]);
    });
}


//XML Parsing
function parseStories(xml) {
  const latestStories = [];

  let blocks = xml.split("<item>");

  for (let i = 1; i < blocks.length && latestStories.length < 6; i++) {
    const storyBlock = blocks[i];
    let title = "";
    let link = "";

    const startTitle = storyBlock.indexOf("<title>");
    const endTitle = storyBlock.indexOf("</title>");
    if (startTitle !== -1 && endTitle !== -1) {
      title = storyBlock.substring(startTitle + 7, endTitle).trim();
    }
    const startLink = storyBlock.indexOf("<link>");
    const endLink = storyBlock.indexOf("</link>");

    if (startLink !== -1 && endLink !== -1) {
      link = storyBlock.substring(startLink + 6, endLink).trim();
    }
    if (title && link) {
      latestStories.push({ title, link });
    }
  }

  return latestStories;
}
