var viz_home
var viz_away
var viz_avg
var _ParamA = "Arsenal"
var _ParamB ="Arsenal"

var baseurl = "https://public.tableau.com/views/TeamStats_16582409510560/"



function openPage(evt, xyz) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  
  document.getElementById(xyz).style.display = "block";
  evt.currentTarget.className += " active";

  var _selpage = document.getElementById(xyz).id
}


// document.getElementById("Home").click();
  
function submit_btn() {
  var _ParamA = document.getElementById("TeamA").value;
  var _ParamB = document.getElementById("TeamB").value;
  console.log(_ParamA)
  console.log("button pressed")
  // if (_selpage="Dashboard") {
  console.log*('createComparisonViz')
  createComparisonViz(_ParamA, _ParamB);
  // } 
  document.getElementById('team').value=_ParamA ;
  document.getElementById('opponent').value=_ParamB ;
}

function createComparisonViz(_ParamA, _ParamB) {
  // Home Team Viz url
	// var _ParamA = "Manchester City"
  // var _ParamB ="Chelsea"
  console.log("create " + _ParamA)
  var url_home = baseurl + "HomeTeam?:showVizHome=no&TeamA_param=" + _ParamA
	var url_away = baseurl + "AwayTeam?:showVizHome=no&TeamB_param=" + _ParamB

  var containerDiv = document.getElementById("vizContainer"),
  	
		options = {
			hideTabs: true,
			onFirstInteractive: function () {
				console.log("Home loaded.");
			}
		};

    if (viz_home) { // If a viz object exists, delete it.
      viz_home.dispose();
    }
	 viz_home = new tableau.Viz(containerDiv, url_home, options);
  
   // Away Team Viz URL
	var containerDiv1 = document.getElementById("vizContainer1"),

	options = {
		hideTabs: true,
		onFirstInteractive: function () {
			console.log("Away Loaded");
		}
	};
  if (viz_away) { // If a viz object exists, delete it.
    viz_away.dispose();
  }
	viz_away = new tableau.Viz(containerDiv1, url_away, options);
	// Create a viz object and embed it in the container div.

}

function createShotsViz() {

  var url_avg = baseurl + "ShotsbyMonths"

  // Avg Shots viz
	var avgShotsContainer = document.getElementById("vizContainerAvg"),
  
	options = {
		hideTabs: true,
		onFirstInteractive: function () {
			console.log("Average Shots Loaded");
		}
	};

  if (viz_avg) { // If a viz object exists, delete it.
    viz_avg.dispose();
  }
  viz_avg = new tableau.Viz(avgShotsContainer, url_avg, options);
	// Create a viz object and embed it in the container div.
}

window.onload = function() {
  document.getElementById('Home').click();
};


var form = document.getElementById("myForm");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);


// function foo() {
//   document.getElementById("test").click();
//   return false;
// }


function foo(event) {
  event.preventDefault();
  let team = document.getElementById("team").value;
  let opponent = document.getElementById("opponent").value;
  let venue = document.getElementById("venue").value;
  let day = document.getElementById("day").value;
  let xg = document.getElementById("xg").value;
  let xga = document.getElementById("xga").value;


  fetch("/", {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: "team="+team+"&opponent="+opponent+"&venue="+venue+"&day="+day+"&xg="+xg+"&xga="+xga
  })
  .then((response) => response.text())
  .then((responseText) => {
    document.getElementById("results").innerHTML ='<font size="6">' + team + " is expected to " + responseText+'</font>';
  })
  .catch((error) => {
      console.error(error);
  });
}