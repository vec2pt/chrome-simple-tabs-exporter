const tabs = await chrome.tabs.query({});
tabs.reload

function exportTabs() {

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

};



function importTabs() {
  console.log('This is a popup!');
};


const exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', async () => exportTabs());

const importButton = document.getElementById('importButton');
importButton.addEventListener('click', async () => importTabs());



// var file = document.getElementById("input").files[0];
// var reader = new FileReader();
// reader.onload = function(e){
//   console.log(e.target.result);
// }
// console.log(reader.readAsText(file));



const inputElement = document.getElementById("file");
inputElement.addEventListener("change", handleFiles, false);

function handleFiles() {
  const fileList = this.file; /* now you can work with the file list */
  const numFiles = fileList.length;
  console.log(numFiles);
}
