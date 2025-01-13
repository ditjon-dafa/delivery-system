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
  const tabToDeactivate = Array.from(tabLinks).find((tab) =>
    tab.classList.contains("active")
  );
  tabToDeactivate.classList.remove("active");

  const tabContentToHide = document.getElementById(
    tabToDeactivate.getAttribute("tab-name")
  );
  tabContentToHide.classList.add("hide");

  const activeTab = event.currentTarget;
  activeTab.classList.add("active");

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

const btnRegisterClient = document.getElementById("register");
btnRegisterClient.addEventListener("click", registerClient);

function registerClient() {
  console.log("button clicked");
  const clientName = document.getElementById("name").value;

  const clientPhoneNumber = document.getElementById("phoneNumber").value;

  const clientAddress = document.getElementById("address").value;
  const clientLatitudePosition = document.getElementById("lat").value;
  const clientLongitudePosition = document.getElementById("long").value;

  const clientPaymentMethod = document.querySelector(
    "#paymentMethods > input:checked"
  ).value;

  if (!clientName) {
    alert("Fill the input with name!");
    return;
  }
  if (!clientPhoneNumber) {
    alert("Fill the input with phone number!");
    return;
  }
  if (isNaN(clientPhoneNumber)) {
    alert("Incorrect phone number input!");
    return;
  }

  const regexp = /^003556[0-9]{8}$/;

  if (!regexp.test(clientPhoneNumber)) {
    alert("Incorrect phone number format (format: 003556XXXXXXXX) !");
    return;
  }

  if (!clientAddress) {
    alert("Fill the input with address !");
    return;
  }

  if (!clientLatitudePosition) {
    alert("Fill the input with latitude number !");
    return;
  }
  if (isNaN(clientLatitudePosition)) {
    alert("Incorrect Lattitude input !");
    return;
  }
  if (!clientLongitudePosition) {
    alert("Fill the input with longtitude number !");
    return;
  }
  if (isNaN(clientLongitudePosition)) {
    alert("Incorrect longtitude number !");
    return;
  }

  console.log(
    "Values",
    clientName,
    clientPhoneNumber,
    clientAddress,
    clientLatitudePosition,
    clientLongitudePosition,
    clientPaymentMethod
  );
}
