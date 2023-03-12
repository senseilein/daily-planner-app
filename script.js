// Display today's date in the format Tuesday, January 31 as per the mockup
const today = moment().format("dddd, MMMM D ");
const currentDay = $("#currentDay");
currentDay.text(today);

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

function colourTimeBlocksBasedOnTime() {
  // const currentTime = parseInt(moment().format("H"));
  // console.log(`currentTime is ${currentTime}`);
  $(".form-control").each(function () {
    const currentTime = parseInt(moment().format("H"));
    console.log(`currentTime is ${currentTime}`);
    const thisBlock = $(this);
    // console.log($(this));
    const thisTimeBlock = thisBlock.data("time");
    // console.log(typeof thisTimeBlock);

    if (thisTimeBlock < currentTime) {
      thisBlock.addClass("past");
    } else if (thisTimeBlock > currentTime) {
      thisBlock.removeClass("past");
      thisBlock.addClass("future");
    } else {
      thisBlock.addClass("present");
      thisBlock.removeClass("past");
      thisBlock.removeClass("future");
    }
  });
}

/*---------------------------------------------------------*/
initLocalStorage();

displayStoredEvents();

colourTimeBlocksBasedOnTime();

// update colourBlocks every 5 minutes
const checkTime = setInterval(colourTimeBlocksBasedOnTime, 300000);

// save event
const saveBtn = $(".form-group > button");
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
