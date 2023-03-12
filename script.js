// Display today's date in the format Tuesday, January 31 as per the mockup
const today = moment().format("dddd, MMMM D ");
const currentDay = $("#currentDay");
currentDay.text(today);

// Grab elements
const saveBtn = $(".form-group > button");

function initLocalStorage() {
  // Initialize Local Storage
  let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
  if (!eventStorage) {
    localStorage.setItem("eventStorage", JSON.stringify([]));
  }
}

function storeEventInLocalStorage(inputValue, inputID) {
  const event = { inputValue, inputID };

  let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));

  // filter() returns a copy of the object, so changes will not be reflected in the original array
  let result = eventStorage.find((obj) => {
    return obj.inputID === inputID;
  });

  if (!result) {
    eventStorage.push(event);
  } else {
    result.inputValue = inputValue;
  }

  localStorage.setItem("eventStorage", JSON.stringify(eventStorage));
}

function displayStoredEvents() {
  let eventStorage = JSON.parse(localStorage.getItem("eventStorage"));

  eventStorage.forEach((eventObj) => {
    let iD = `#${eventObj.inputID}`;
    let value = eventObj.inputValue;

    //Put back event on the page after refresh
    let targetedTextArea = $(iD);
    targetedTextArea.attr("value", value);
  });
}

/*---------------------------------------------------------*/
initLocalStorage();

displayStoredEvents();

saveBtn.on("click", function () {
  const input = $(this).siblings(".form-control");
  const inputValue = input.val();
  const inputID = input.attr("id");
  console.log(inputValue);

  if (inputValue) {
    input.attr("value", inputValue);
    storeEventInLocalStorage(inputValue, inputID);
  }
});

// Work with time
const currentTime = moment().format("h a");
// console.log(currentTime);
const currentTime2 = moment().format("H a");
// console.log(currentTime2);
// let ooo = moment("9", "hh").format("HH");
// console.log(ooo);

// let kkk = moment().hour().format("HH");
// console.log(kkk);
