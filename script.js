// Display today's date in the format Tuesday, January 31 as per the mockup
const today = moment().format("dddd, MMMM D ");
const currentDay = $("#currentDay");
currentDay.text(today);
// console.log(currentDay);

const currentTime = moment().format("h a");
// console.log(currentTime);
const currentTime2 = moment().format("H a");
// console.log(currentTime2);
// let ooo = moment("9", "hh").format("HH");
// console.log(ooo);

// let kkk = moment().hour().format("HH");
// console.log(kkk);

//span inside #form
const form = $("#form");
const formGroup = $(".form-group");
const saveBtn = $(".form-group > button");
// function saveEvent() {}
// const input = $(saveBtn).siblings("#this");

// console.log(saveBtn);

let eventStorage = [];

function initLocalStorage() {
  eventStorage = JSON.parse(localStorage.getItem("eventStorage"));
  if (!eventStorage) {
    localStorage.setItem("eventStorage", JSON.stringify([]));
  }
}

initLocalStorage();

/*
initialize 
[] 
if [] exists > grab it 
else create


*/

/*
Find the value of the first element/object in the array, otherwise undefined is returned.

var result = jsObjects.find(obj => {
  return obj.b === 6
})
 */

function storeEventInLocalStorage(inputValue, inputID) {
  const event = { inputValue, inputID };

  // let cityList = JSON.parse(localStorage.getItem("cityList"));
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

saveBtn.on("click", function (e) {
  // alert("Clickedddddddd");
  const input = $(this).siblings(".form-control");
  const inputValue = input.val();
  const inputID = input.attr("id");
  console.log(inputValue);
  // console.log(input);
  // console.log(e);

  storeEventInLocalStorage(inputValue, inputID);
});
/* if inside a formGroup 
    - a saveBtn is clicked
    - if input is empty > do nothing
    - else save that input value

*/
