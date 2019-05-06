

  // 01.01,
  // 06.01,
  // 19.04,
  // 22.04,
  // 01.05,
  // 30.05,
  // 21.06,
  // 22.06,
  // 02.11,
  // 24.12,
  // 25.12,
  // 26.12


const holydays = new Map();

holydays.set(00, new Set([01, 06]))
holydays.set(03, new Set([19, 22]))
holydays.set(04, new Set([01, 30]))
holydays.set(05, new Set([21, 22]))
holydays.set(10, new Set([02]))
holydays.set(11, new Set([24, 25, 26]))

//console.log(09 === 9)

//if (holydays.has(date.month) && holydays.get(date.month).has(date.day))




function counter() {

    let x = setInterval(() => {
      let now = new Date().getTime();
      let end = document.getElementById("date").value;
      if (end == "") {
        document.getElementById("counter").innerHTML = "Enter the date!"
      } else {
        end = new Date(document.getElementById("date").value).getTime();
        let distance = end - now;
        //console.log(distance);
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("counter").innerHTML = days + " days " + hours + " hours "
        + minutes + " minutes " + seconds + " seconds ";

        if (distance < 0) {
          clearInterval(x);
          document.getElementById("counter").innerHTML = "EXPIRED";
        }
      }
      }, 1000)}


function whereStart() {
  let start = document.getElementById("start").value;
  if (start == "") {
    document.getElementById("start").valueAsDate = new Date();
    return new Date()
  } else {
     return new Date(start);
  }
}


function countDaysLeft() {
  let start = whereStart();
  let end = document.getElementById("date").value;
  if (end == "") {
    document.getElementById("daysLeft").innerHTML = "Enter end date!";
  } else {
    end = new Date(end);

    let days = 0;
    while (start < end) {
      days++;
      start.setDate(start.getDate() + 1);
    }
  document.getElementById("daysLeft").innerHTML = `${days} days left`;
  }
}

function workingDaysLeft() {
  let start = whereStart();
  let end = document.getElementById("date").value;
  if (end == "") {
    document.getElementById("wDaysLeft").innerHTML = "Enter end date!";
  } else {
    end = new Date(end);

    let wdays = 0;
    while (start < end) {

      if (start.getDay() !== 0 && start.getDay() !== 6) {
        wdays++;
      }
      start.setDate(start.getDate() + 1);
    }
    document.getElementById("wDaysLeft").innerHTML = `${wdays} working days left`;
  }
}

function skipHolydays() {
  let start = whereStart();
  let end = document.getElementById("date").value;
  if (end == "") {
    document.getElementById("noHoly").innerHTML = "Enter end date!";
  } else {
    end = new Date(end);

    let wdays = 0;
    let holy = 0;
    while (start < end) {
      console.log(holydays.get(start.getMonth()))
      if (start.getDay() !== 0 && start.getDay() !== 6) {
        wdays++;
      }
      if (holydays.has(start.getMonth()) && holydays.get(start.getMonth()).has(start.getDate())) {
        holy++;

      }
      start.setDate(start.getDate() + 1);
    }
    document.getElementById("noHoly").innerHTML = `${wdays - holy} working days left`;
  }
}


document.getElementById("countDaysLeft").addEventListener("click", countDaysLeft);
document.getElementById("countWDaysLeft").addEventListener("click", workingDaysLeft);
document.getElementById("noHolydays").addEventListener("click", skipHolydays);
document.getElementById("showCounter").addEventListener("click", counter);
