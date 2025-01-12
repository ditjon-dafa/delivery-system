const tabLinks = document.getElementsByClassName("tab-links");
Array.from(tabLinks).forEach((tab) => {
  if (tab.getAttribute("tab-name") == "client") {
    tab.classList.add("active");
  } else {
    const tabContent = document.getElementById(tab.getAttribute("tab-name"));
    tabContent.classList.add("hide");
  }
});

const tabs = document.querySelectorAll(".tab-links");
tabs.forEach((tab) => {
  tab.addEventListener("click", showTabContent);
});

function showTabContent(event) {
  //remove class "active" from active tab
  const tabToDeactivate = Array.from(tabLinks).find((tab) =>
    tab.classList.contains("active")
  );
  tabToDeactivate.classList.remove("active");

  //hide content of previous active tab
  const tabContentToHide = document.getElementById(
    tabToDeactivate.getAttribute("tab-name")
  );
  tabContentToHide.classList.add("hide");

  //add class "active" to current tab
  const activeTab = event.currentTarget;
  activeTab.classList.add("active");

  //show content of current tab
  const activeTabName = event.currentTarget.getAttribute("tab-name");
  const tabContentToDisplay = document.getElementById(activeTabName);
  tabContentToDisplay.classList.remove("hide");
}

const btnShowLocation = document.getElementById("location");
btnShowLocation.addEventListener("click", showLocation);

function showLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const latitudeInput = document.getElementById("lat");
  latitudeInput.value = position.coords.latitude;

  const longituteInput = document.getElementById("long");
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
