const redirectToSearch = () => {
  const inputValue = document.getElementById("txt-url").value;
  const encodedValue = encodeURIComponent(inputValue);
  window.location.href = `search?result=${encodedValue}`;
};

const getSearchQuery = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("result");
};

const searchVideos = () => {
  const inputValue = document.getElementById("txt-url").value;
  document.getElementById("loader").style.display = "inline";

  fetch(
    `https://me0xn4hy3i.execute-api.us-east-1.amazonaws.com/staging/api/resolve/resolveYoutubeSearch?search=${inputValue}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loader").style.display = "none";
      displayResults(data);
    })
    .catch((error) => {
      document.getElementById("loader").style.display = "none";
      console.error("Error fetching data:", error);
    });
};

const displayResults = (data) => {
  const resultContainer = document.getElementById("result");
  resultContainer.innerHTML = "";
  const rowDiv = document.createElement("div");
  rowDiv.className = "row";
  rowDiv.id = "list-video";

  data.data.forEach((video) => {
    const colDiv = document.createElement("div");
    colDiv.className = "col-xs-6 col-sm-4 col-md-3";
    colDiv.innerHTML = `
          <div class="thumbnail">
            <a href="download.html?result=${video.videoId}" target="_blank">
              <img class="lazyload ythumbnail" alt="${video.title}" src="${video.imgSrc}" data-src="${video.imgSrc}">
            </a>
            <div class="search-info">
              <a href="download.html?result=${video.videoId}">${video.title}</a><br>
            </div>
          </div>
        `;

    rowDiv.appendChild(colDiv);
  });

  resultContainer.appendChild(rowDiv);
};

const redirectToDownload = (videoId) => {
  const inputValue = videoId;
  const encodedValue = encodeURIComponent(inputValue);
  window.location.href = `download?result=${encodedValue}`;
};

const downloadVideo = (videoId) => {
  const downloadUrl = `https://www.yt2mp3s.me/api/widgetv2?url=https://www.youtube.com/watch?v=${videoId}`;

  const iframe = document.createElement("iframe");
  iframe.src = downloadUrl;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.allowtransparency = "true";
  iframe.scrolling = "yes";
  iframe.style.border = "none";

  const resultContainer = document.getElementById("data");
  resultContainer.innerHTML = "";
  resultContainer.appendChild(iframe);
};
