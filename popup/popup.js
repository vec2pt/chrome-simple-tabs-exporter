const tabs = await chrome.tabs.query({});
tabs.reload

const paths = new Array();
for (const tab of tabs) {
  const pathname = tab.url;
  paths.push(pathname);
}

const pathString = paths.join("\n");

const blob = new Blob([pathString], { type: "text/plain" });
const url = URL.createObjectURL(blob);

const now = new Date();
const dateNow = now.toISOString().slice(0, 10).replaceAll("-", "");
const timeNow = now.toISOString().slice(11, 19).replaceAll(":", "");;

const filename = `${dateNow}_${timeNow}_tabs.txt`;

chrome.downloads.download({
  url: url,
  filename: filename,
});
