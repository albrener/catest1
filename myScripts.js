
var SAMPLE_POST = 'http://www.mapquestapi.com/directions/v2/route?key=tSjaHQ1rpkMBay4jGeUSUzMX30RrQe0S&from=MY_ORIGIN&to=MY_DESTINATION&callback=renderNarrative&timeType=1&useTraffic=true'

function formatRequest(destination) {
	document.getElementById('narrative').innerHTML = 'Pending...';
	var script = document.createElement('script');
	script.type = 'text/javascript';

	var newURL = SAMPLE_POST;
	
	if (destination == 1)
	{
	   newURL = newURL.replace('MY_ORIGIN', '985 Rue Lynne, Laval, QC');
	   newURL = newURL.replace('MY_DESTINATION', '4999 Boulevard de Maisonneuve Ouest, Westmount, QC');
	}
	else
	{
	   newURL = newURL.replace('MY_DESTINATION', '985 Rue Lynne, Laval, QC');
	   newURL = newURL.replace('MY_ORIGIN', '4999 Boulevard de Maisonneuve Ouest, Westmount, QC');
	}

	script.src = newURL;
	document.body.appendChild(script);
};

function renderNarrative(response) {
	var legs = response.route.legs;
	var html = '';
	var j = 0;
	var maneuver;
	var use40 = false;
	var use20 = false;
	var routeName;

	for (j = 0; j < legs[0].maneuvers.length; j++) {
	
		maneuver = legs[0].maneuvers[j];
		
		if (maneuver.narrative.indexOf('QC-40') > -1) {
		   use40 = true;
		   break;
		}
		else if (maneuver.narrative.indexOf('QC-20') > -1) {
         use20 = true;
         break;
      }
	}
	
	if (use40) {
	   routeName = " on Decarie is ";
	}
	else if (use20) {
	   routeName = " on Highway 20 is ";
   }
   else {
	   routeName = " on Other route is ";
   }
	
	var phrase = 'Estimated time' + routeName + fromSeconds(response.route.realTime);
	html += '</td>'
   html += '<td>' + phrase + '</td>'
   html += '</tr>';
   
   /*var u = new SpeechSynthesisUtterance(phrase);
   u.lang = "en";
   speechSynthesis.speak(u);*/

	document.getElementById('narrative').style.display = "";
	document.getElementById('narrative').innerHTML = html;
};

function fromSeconds(sec) {
   var d=new Date(0,0,0);
   d.setSeconds(+sec);
   return (d.getHours() ? d.getHours()+':' : '')+d.getMinutes()+' minutes '+d.getSeconds()+' seconds.';
};

function collapseResults(divName) {
	document.getElementById(divName).style.display = "none";
};

function sayIt(phrase) {
	var u = new SpeechSynthesisUtterance(phrase);
   u.lang = "en";
   speechSynthesis.speak(u);
}





