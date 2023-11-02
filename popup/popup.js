
async function exportTabs() {
  const tabs = await chrome.tabs.query({});
  tabs.reload

  const paths = new Array();
  for (const tab of tabs) {
    const tabURL = tab.url;
    paths.push(tabURL);
  }

  const pathString = paths.join("\n");

  const blob = new Blob([pathString], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateNow = now.toISOString().slice(0, 10).replaceAll("-", "");
  const timeNow = now.toISOString().slice(11, 19).replaceAll(":", "");;

  const fileName = `${dateNow}_${timeNow}_tabs.txt`;

  chrome.downloads.download({
    url: url,
    filename: fileName,
  });
}

async function exportTabsAsMarkdown() {
  const tabs = await chrome.tabs.query({});
  tabs.reload

  const paths = new Array();
  for (const tab of tabs) {
    const tabTitle = tab.title;
    const tabURL = tab.url;
    const tabMd = `- [${tabTitle}](${tabURL})`;
    paths.push(tabMd);
  }

  const pathString = paths.join("\n");

  const blob = new Blob([pathString], { type: "text/md" });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const dateNow = now.toISOString().slice(0, 10).replaceAll("-", "");
  const timeNow = now.toISOString().slice(11, 19).replaceAll(":", "");;

  const fileName = `${dateNow}_${timeNow}_tabs.md`;

  chrome.downloads.download({
    url: url,
    filename: fileName,
  });
}

function importTabs() {
  let file = this.files[0];
  let fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = function () {
    let fileStr = fileReader.result;
    var separateLines = fileStr.split(/\r?\n|\r|\n/g);
    for (const line of separateLines) {
      try {
        let url = new URL(line);
        chrome.tabs.create({
          url: line,
        });
      }
      catch (err) { }
    }
  };

}

document.getElementById('exportTabs').addEventListener('click', exportTabs, false);
document.getElementById('exportTabsToMd').addEventListener('click', exportTabsAsMarkdown, false);
document.getElementById('importTabs').addEventListener('change', importTabs, false);
