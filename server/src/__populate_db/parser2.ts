import { MongoCallback, Db } from "mongodb";

alert("ciao");
var _courses = [];
window.onload = () => {
	
	var MongoClient = require('mongodb').MongoClient;

	var uri = "mongodb://lorenzo:PWD@unibo-orientation-cluster-shard-00-00-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-01-p2i0j.mongodb.net:27017,unibo-orientation-cluster-shard-00-02-p2i0j.mongodb.net:27017/unibo-orientation?ssl=true&replicaSet=unibo-orientation-cluster-shard-0&authSource=admin";
	
	
	
	let plusminusres = document.getElementsByClassName("plusminus-results")[0];
	let schools = plusminusres.getElementsByClassName("output-list-school");
	let schoolCourses = plusminusres.getElementsByClassName("school-courses");
	
	
	
	//homi delle scuole dentro span
    for (let schoolIdx = 0; schoolIdx < schools.length; schoolIdx++) {
        let schoolName = schools[schoolIdx].getElementsByTagName("span")[0].innerText;//!
		let courses=schoolCourses[schoolIdx];
        let n_courses = courses.getElementsByTagName("dt").length;
        let color = getComputedStyle(schools[schoolIdx]).borderLeftColor;
        if (schoolIdx === 5) color = 'rgb(255, 255, 255)';
		for(let courseIdx=0;courseIdx<n_courses;courseIdx++) {
			let courseName = courses.getElementsByTagName("dt")[courseIdx].innerText;//!
			//console.log(courseName);
			let courseHTML = courses.getElementsByTagName("dd")[courseIdx].innerHTML;
			let beginLaurea = courseHTML.indexOf("<b>");
			let endLaurea = courseHTML.indexOf("</b>");
			let laurea = courseHTML.substring(beginLaurea, endLaurea).substring(3);//!tipo laurea
			
			let newLine = courseHTML.indexOf("<br>");
			let courseHTMLt = courseHTML.substring(newLine).substring(4);
			newLine = courseHTMLt.indexOf("<br>");
			
			let courseHTML2 = courseHTMLt.substring(newLine).substring(4);
			let beginSede = courseHTML2.indexOf("Sede didattica:");
			let endSede = courseHTML2.indexOf("<br>");
			let sedeDidattica = courseHTML2.substring(beginSede, endSede).substring(16);//!
			
			newLine = courseHTML2.indexOf("<br>");			
			let courseHTML3 = courseHTML2.substring(newLine).substring(4);
			let beginOrdinamento = courseHTML3.indexOf("Ordinamento");
			let endOrdinamento = courseHTML3.indexOf("-");
			let ordinamento = courseHTML3.substring(beginOrdinamento, endOrdinamento).substring(11).trim();//!
			
			let beginCode = courseHTML3.indexOf("Codice");
			let endCode = courseHTML3.indexOf("<br>");
			let codice = courseHTML3.substring(beginCode, endCode).substring(7);//!
			//console.log(courses.getElementsByTagName("dd")[courseIdx].innerHTML);
			
			newLine = courseHTML3.indexOf("<br>");
			let courseHTML4 = courseHTML3.substring(newLine).substring(4);
            let beginYears = courseHTML4.indexOf("Anni");
            courseHTML4 = courseHTML4.substring(beginYears);
			let endYears = courseHTML4.indexOf("<br>");
            let yearsActive = courseHTML4.substring(0, endYears).substring(13).replace(/<\/?[^>]+(>|$)/g, "");;//!
			
			newLine = courseHTML4.indexOf("<br>");
			let courseHTML5 = courseHTML4.substring(newLine).substring(4);
			let beginLanguage = courseHTML5.indexOf("Lingua");
			courseHTML5 = courseHTML5.substring(beginLanguage);
			let endLanguage = courseHTML5.indexOf("<br>");
            let language = courseHTML5.substring(0, endLanguage).substring(7).trim();//!
            let languages = language.split(",");
            for (let i = 0; i < languages.length; i++)
                languages[i] = languages[i].trim();
			
			let links2 = courses.getElementsByTagName("dd")[courseIdx].getElementsByTagName("a");
			let courseInfoLink = links2[0].href;//!
			let didacticPlanLink = links2[1].href;//!
			let courseSiteLink = links2[2].href;//!
			
			let courseObj = {
                school: {
                    name: schoolName,
                    color: color//;
                },
				courseName: courseName,
				degreeType: laurea,
				city: sedeDidattica,
				regulations: ordinamento,
				code: codice,
				activeYears: yearsActive,
				languages: languages,
				courseInfoUrl: courseInfoLink,
				didacticPlanUrl: didacticPlanLink,
				courseSiteUrl: courseSiteLink,
			}
            /**/
            _courses.push(courseObj);
            console.log(courseObj);
		}
    }

    var FileSaver = require('file-saver');
    var blob = new Blob([JSON.stringify(_courses)], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(blob, "hello world.txt");
};
