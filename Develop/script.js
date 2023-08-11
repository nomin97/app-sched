// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours of 9am to 5pm
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist

// variables
var savebtn = document.querySelectorAll(".btn");
var timeBlocksEl = document.querySelectorAll(".time-block");
var userInput = [];

renderText()

// display date & time
function clock() {
  $('#currentDay').text(dayjs().format('MMMM DD, YYYY hh:mm A'));
  timeblockloop()
  setTimeout(clock, 1000);
}
clock()

function timeblockloop() {
  // run each timeblock through the function
  timeBlocksEl.forEach((timeblock, i) => {
    colorBlocks(timeblock, i)
  });
}

// check time and add corresponding styling 
function colorBlocks(timeblock, i) {
  // finds the current hour
  var currentHour = dayjs().format('H');
  if (i + 9 == currentHour) {
    timeBlocksEl[i].classList.remove("future");
    timeBlocksEl[i].classList.remove("past");
    timeBlocksEl[i].classList.add("present");
  } else if (i + 9 < currentHour) {
    timeBlocksEl[i].classList.remove("present");
    timeBlocksEl[i].classList.remove("future");
    timeBlocksEl[i].classList.add("past");
  } else {
    timeBlocksEl[i].classList.remove("past");
    timeBlocksEl[i].classList.remove("present");
    timeBlocksEl[i].classList.add("future");
  }
}

// save button
savebtn.forEach((button, i) => {
  savebtn[i].addEventListener("click", saveFunction);
})

// save to local storage
function saveFunction(e) {
  var parentId = e.target.parentElement.parentElement.getAttribute("id");
  var parentEl = document.getElementById(parentId);
  var object = {
    id: parentId,
    content: parentEl.children[1].value
  }
  // check if text is in timeblock 
  const matchingText = userInput.findText(
    (item) => item.id === object.id
  )
  if (matchingText !== -1) {
    userInput[matchingText] = { id: object.id, content: object.content }
  } else {
    userInput.push(object);
  }
  localStorage.setItem("savedText", JSON.stringify(userInput))
}
// get text from local storage
function renderText() {
  userInput = JSON.parse(localStorage.getItem("savedText") || "[]");
  for (var i = 0; i < userInput.length; i++) {
    var parentEl = document.getElementById(userInput[i].id);
    parentEl.children[1].textContent = userInput[i].content;
  }
}