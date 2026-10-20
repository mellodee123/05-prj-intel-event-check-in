const checkInForm = document.getElementById("checkInForm");
const attendeeCountDisplay = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCountDisplay = document.getElementById("waterCount");
const zeroCountDisplay = document.getElementById("zeroCount");
const powerCountDisplay = document.getElementById("powerCount");
const attendeeList = document.getElementById("attendeeList");
const attendeeEmptyState = document.getElementById("attendeeEmptyState");
const savedAttendees = localStorage.getItem("attendees");
let attendees = savedAttendees ? JSON.parse(savedAttendees) : [];
let totalAttendees = Number(localStorage.getItem("totalAttendees")) || 0;
const maxGoal = 50;

attendeeCountDisplay.textContent = totalAttendees;
const savedCompletionPercentage = (totalAttendees / maxGoal) * 100;
progressBar.style.width = `${savedCompletionPercentage}%`;
waterCountDisplay.textContent = Number(localStorage.getItem("waterCount")) || 0;
zeroCountDisplay.textContent = Number(localStorage.getItem("zeroCount")) || 0;
powerCountDisplay.textContent = Number(localStorage.getItem("powerCount")) || 0;

function displayAttendees() {
  attendeeList.textContent = "";
  attendeeEmptyState.style.display = attendees.length === 0 ? "block" : "none";

  for (let index = 0; index < attendees.length; index = index + 1) {
    const attendeeItem = document.createElement("li");
    const attendeeName = document.createElement("span");
    const attendeeTeam = document.createElement("span");

    attendeeName.className = "attendee-name";
    attendeeName.textContent = attendees[index].name;
    attendeeTeam.className = "attendee-team";
    attendeeTeam.textContent = attendees[index].team;

    attendeeItem.appendChild(attendeeName);
    attendeeItem.appendChild(attendeeTeam);
    attendeeList.appendChild(attendeeItem);
  }
}

displayAttendees();

checkInForm.addEventListener("submit", function (event) {
  event.preventDefault();

  totalAttendees = totalAttendees + 1;
  localStorage.setItem("totalAttendees", totalAttendees);
  attendeeCountDisplay.textContent = totalAttendees;
  const completionPercentage = (totalAttendees / maxGoal) * 100;
  progressBar.style.width = `${completionPercentage}%`;

  const attendeeName = document.getElementById("attendeeName").value;
  const teamSelect = document.getElementById("teamSelect");
  const selectedTeam = teamSelect.value;
  const teamName = teamSelect.options[teamSelect.selectedIndex].text;
  const welcomeMessage = `Welcome, ${attendeeName} from ${teamName}!`;
  attendees.push({ name: attendeeName, team: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  displayAttendees();
  const teamCount = document.getElementById(`${selectedTeam}Count`);
  teamCount.textContent = Number(teamCount.textContent) + 1;
  localStorage.setItem(`${selectedTeam}Count`, teamCount.textContent);
  const greeting = document.getElementById("greeting");
  greeting.textContent = welcomeMessage;
  greeting.classList.add("success-message");
  greeting.style.display = "block";

  if (totalAttendees === maxGoal) {
    const waterTeamCount = Number(
      document.getElementById("waterCount").textContent,
    );
    const zeroTeamCount = Number(
      document.getElementById("zeroCount").textContent,
    );
    const powerTeamCount = Number(
      document.getElementById("powerCount").textContent,
    );
    const highestTeamCount = Math.max(
      waterTeamCount,
      zeroTeamCount,
      powerTeamCount,
    );
    const winningTeams = [];

    if (waterTeamCount === highestTeamCount) {
      winningTeams.push("Team Water Wise");
    }

    if (zeroTeamCount === highestTeamCount) {
      winningTeams.push("Team Net Zero");
    }

    if (powerTeamCount === highestTeamCount) {
      winningTeams.push("Team Renewables");
    }

    greeting.textContent = "Attendance goal reached! Congratulations to ";

    for (let index = 0; index < winningTeams.length; index = index + 1) {
      if (index > 0) {
        greeting.append(", ");
      }

      const winningTeam = document.createElement("strong");
      winningTeam.textContent = winningTeams[index];
      greeting.appendChild(winningTeam);
    }

    greeting.append("!");
    greeting.classList.add("celebration-message");
  }

  console.log(attendeeName);
  console.log(selectedTeam);
  console.log(welcomeMessage);
  console.log(totalAttendees);
  console.log(completionPercentage);

  checkInForm.reset();
});
