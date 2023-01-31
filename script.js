// Display today's date in the format Tuesday, January 31 as per the mockup
const today = moment().format("dddd, MMMM D ");
const currentDay = $("#currentDay");
currentDay.text(today);
console.log(currentDay);
