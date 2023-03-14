// Display today's date in the format Tuesday, January 31 as per the mockup
const today = moment().format("dddd, MMMM D ");
const currentDay = $("#currentDay");
currentDay.text(today);

/*-------------------------FUNCTIONS--------------------------------*/
function initLocalStorage() {
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

    //Put back events on the page after refresh
    let targetedTextArea = $(iD);
    targetedTextArea.attr("value", value);
  });
}

function colourTimeBlocksBasedOnTime() {
  const currentTime = parseInt(moment().format("H"));
  $(".form-control").each(function () {
    const thisBlock = $(this);

    const thisTimeBlock = thisBlock.data("time");

    if (thisTimeBlock < currentTime) {
      thisBlock.addClass("past");
      thisBlock.removeClass("present");
      thisBlock.removeClass("future");
    } else if (thisTimeBlock > currentTime) {
      thisBlock.addClass("future");
      thisBlock.removeClass("present");
      thisBlock.removeClass("past");
    } else {
      thisBlock.addClass("present");
      thisBlock.removeClass("past");
      thisBlock.removeClass("future");
    }
  });
}

/*-------------------------START PROGRAMME--------------------------------*/

initLocalStorage();

// retrieve events from localStorage and render them on the page
displayStoredEvents();

colourTimeBlocksBasedOnTime();

// update colourBlocks every 5 minutes
const checkTime = setInterval(colourTimeBlocksBasedOnTime, 300000);

// save events when corresponding button is clicked
const saveBtn = $(".form-group > button");
saveBtn.on("click", function () {
  const input = $(this).siblings(".form-control");
  const inputValue = input.val();
  const inputID = input.attr("id");

  if (inputValue) {
    input.attr("value", inputValue);
    storeEventInLocalStorage(inputValue, inputID);
  }
});
