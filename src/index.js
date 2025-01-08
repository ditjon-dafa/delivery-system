document.getElementById("client").style.display = "block";

let tabLinks = document.getElementsByClassName("tab-links");
let tabClient = Array.from(tabLinks).find(
  (tab) => tab.getAttribute("tab-name") == "client"
);
tabClient.className += " active";

const tabs = document.querySelectorAll(".tab-links");
tabs.forEach((tab) => {
  tab.addEventListener("click", showTabContent);
});

function showTabContent(event) {
  const tabName = event.currentTarget.getAttribute("tab-name");

  let tabsContent = document.getElementsByClassName("tab-content");
  for (let tab of tabsContent) {
    tab.style.display = "none";
  }

  let tabLinks = document.getElementsByClassName("tab-links");
  for (let tab of tabLinks) {
    tab.className = tab.className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}

let btnShowLocation = document.getElementById("location");
btnShowLocation.addEventListener("click", showLocation);

function showLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  let latitudeInput = document.getElementById("lat");
  latitudeInput.value = position.coords.latitude;

  let longituteInput = document.getElementById("long");
  longituteInput.value = position.coords.longitude;
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}
