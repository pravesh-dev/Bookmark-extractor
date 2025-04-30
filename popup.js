function fetchBookmarks() {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const listContainer = document.getElementById("bookmarkList");
      listContainer.innerHTML = "";
  
      function processBookmarks(nodes) {
        nodes.forEach(node => {
          if (node.url) {
            const p = document.createElement("p");
            p.textContent = `${node.title} - ${node.url}`;
            listContainer.appendChild(p);
          }
          if (node.children) {
            processBookmarks(node.children);
          }
        });
      }
  
      processBookmarks(bookmarkTreeNodes);
    });
  }
  
  document.getElementById("exportBtn").addEventListener("click", function () {
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
      const blob = new Blob([JSON.stringify(bookmarkTreeNodes, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "bookmarks.json";
      downloadLink.click();
    });
  });
  
  fetchBookmarks();
  