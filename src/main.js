import Chart from 'chart.js';
let ctx = document.getElementById("myChart").getContext('2d');

let USRegex = /US+/g;
let NZRegex = /NZ+/g;
let NLRegex = /NL+/g;
let GBRegex = /GB+/g;
let FRRegex = /FR+/g;
let MaleRegex = /male+/g;
let FemaleRegex = /female+/g;
let yearRegex = /\d{4}/g;
let count = 1;
let UScount;
let NLcount;
let NZcount;
let GBcount;
let FRcount;
let maleCount;
let femaleCount;
let year88;
let year89;
let year90;
let year91;
let year92;
let year93;
let year94;
let year95;
let year96;
let year97;
let year88Regex = /1988+/g;
let year89Regex = /1989+/g;
let year90Regex = /1990+/g;
let year91Regex = /1991+/g;
let year92Regex = /1992+/g;
let year93Regex = /1993+/g;
let year94Regex = /1994+/g;
let year95Regex = /1995+/g;
let year96Regex = /1996+/g;
let year97Regex = /1997+/g;
let allYearRegex = /\d{4}/;
let e = document.getElementById("drpdown");
let dateReg = /([12]\d{3}[.-\/](0[1-9]|1[0-2])[.-\/](0[1-9]|[12]\d|3[01]))/;
let fnameExp = /.{1,}/;
let lnameExp = /.{1,}/;
let userArr = [];

let maleListFunction;
let maleonclick;

let url = "https://randomuser.me/api/?results=1000&inc=gender,name,nat,id,picture,dob&nat=us,nz,fr,gb,nl ";

let getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// query string: ?foo=lorem&bar=&baz
let fname = getParameterByName('fname'); // "lorem"
let lname = getParameterByName('lname'); // "" (present with empty value)
let dob = getParameterByName('dob'); // "" (present with no value)
let genders = getParameterByName('genders'); // "" (present with no value)
// var qux = getParameterByName('qux');

console.log("genders: " + genders);


fetch(url)
  .then(response => response.json())
  .then(userData => {
    console.log(userData.results[0]);
    for (let v = 0; v < userData.results.length; v++) {
      let rndYearnum = getRndInteger(1988, 1997);
      let rndMonthnum = getRndInteger(1, 12);
      let rndDaynum = getRndInteger(1, 30);
      // console.log("rndYearnum: " + rndYearnum.toString() + "/" + rndMonthnum + "/" + rndDaynum);
      userData.results[v].dob = rndYearnum.toString() + "/" + rndMonthnum + "/" + rndDaynum;
      //  data = data.replace(allYearRegex,rndYearnum.toString());
    }
    let data = '';
    let numRegex = /[0-9]+/g;
    let maleImgNum = getRndInteger(1, 85);
    let femaleImgNum = getRndInteger(1, 85);
    let rndYear = getRndInteger(1988, 1997);

    let newPerson = {
      name: { first: fname, last: lname },
      dob: dob,
      gender: genders,
      picture: { medium: "https://randomuser.me/api/portraits/med/men/81.jpg" },
      nat: "US"

    }


    if (newPerson.gender == "male") {
      newPerson.picture.medium = newPerson.picture.medium.replace(numRegex, maleImgNum.toString());

    } else if (newPerson.gender == "female") {
      newPerson.picture.medium = newPerson.picture.medium.replace("men", "women");
      newPerson.picture.medium = newPerson.picture.medium.replace(numRegex, femaleImgNum.toString());

    }
    if (newPerson.name.first != null) {
      console.log("NP " + newPerson);
      userData.results.push(newPerson);
      console.log("last " + userData.results[userData.results.length - 1]);
      userArr.push(userData.results[userData.results.length - 1]);

    }

    console.log("User Arr " + userArr[0]);

    userData.results.forEach(person => data += `name${count++}: ${person.name.first} ${person.name.last}\nDOB: ${person.dob}\ngender: ${person.gender}\nNAT: ${person.nat}\n\n`);
    // console.log("rndYear " + rndYear);



    console.log("Data: " + data);

    let peopleListFunction = () => {

      let toAdd = document.createDocumentFragment();
      for (let i = 0; i < userData.results.length; i++) {
        let divTag = document.createElement("div");
        divTag.id = "div" + i;
        divTag.innerHTML = userData.results[i].name.first + " " + userData.results[i].name.last + "<br />" + userData.results[i].gender + "<br />" + userData.results[i].dob + "<br />" + userData.results[i].nat + "<br />";
        document.getElementById("peopleContainer").appendChild(divTag);
        let userIMG = document.createElement("img");
        userIMG.src = userData.results[i].picture.medium;
        document.getElementById(divTag.id).appendChild(userIMG);
        let linebreak = document.createElement("br");
        document.getElementById(divTag.id).appendChild(linebreak);
        // document.getElementById("peopleList").innerHTML += userData.results[i].name.first + "\t"+ userData.results[i].name.last + "\n";
      }
    }


    peopleListFunction();


    document.getElementById("userCount").innerHTML = "Current # of Users: " + userData.results.length;
    let str = data.match(USRegex);
    let str2 = data.match(NZRegex);
    let str3 = data.match(NLRegex);
    let str4 = data.match(GBRegex);
    let str5 = data.match(FRRegex);

    // let years = data.match(yearRegex);
    // console.log(years);

    let males = data.match(MaleRegex);
    let females = data.match(FemaleRegex);
    femaleCount = females.length;
    maleCount = males.length - femaleCount;


    let countyear88 = data.match(year88Regex);
    let countyear89 = data.match(year89Regex);
    let countyear90 = data.match(year90Regex);
    let countyear91 = data.match(year91Regex);
    let countyear92 = data.match(year92Regex);
    let countyear93 = data.match(year93Regex);
    let countyear94 = data.match(year94Regex);
    let countyear95 = data.match(year95Regex);
    let countyear96 = data.match(year96Regex);
    let countyear97 = data.match(year97Regex);

    if (countyear88 == null) {
      countyear88 = [];
    }
    if (countyear89 == null) {
      countyear89 = [];
    }
    if (countyear90 == null) {
      countyear90 = [];
    }
    if (countyear91 == null) {
      countyear91 = [];
    }
    if (countyear92 == null) {
      countyear92 = [];
    }
    if (countyear93 == null) {
      countyear93 = [];
    }
    if (countyear94 == null) {
      countyear94 = [];
    }
    if (countyear95 == null) {
      countyear95 = [];
    }
    if (countyear96 == null) {
      countyear96 = [];
    }
    if (countyear97 == null) {
      countyear97 = [];
    }

    year88 = countyear88.length;
    year89 = countyear89.length;
    year90 = countyear90.length;
    year91 = countyear91.length;
    year92 = countyear92.length;
    year93 = countyear93.length;
    year94 = countyear94.length;
    year95 = countyear95.length;
    year96 = countyear96.length;
    year97 = countyear97.length;




    if (str == null && str.length < 1) {

      UScount = 0;
    } else {
      UScount = str.length;

    }

    if (str2 == null && str2.length < 1) {
      NZcount = 0;
    } else {
      NZcount = str2.length;
    }
    if (str3 == null && str3.length < 1) {
      NLcount = 0;
    } else {
      NLcount = str3.length;
    }
    if (str4 == null && str4.length < 1) {
      GBcount = 0;
    } else {
      GBcount = str4.length;
    }
    if (str5 == null && str5.length < 1) {
      FRcount = 0;
    } else {
      FRcount = str5.length;
    }

    //  console.log(UScount);
    console.log(data);

    let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["US", "NZ", "FR", "GB", "NL"],
        datasets: [{
          label: 'Nationality',
          data: [UScount, NZcount, FRcount, GBcount, NLcount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: false,
        maintainAspectRatio: true
      }
    });
    let ctx2 = document.getElementById("myChart2").getContext('2d');

    let myChart2 = new Chart(ctx2, {
      type: 'horizontalBar',
      data: {
        labels: ["Female", "Male"],
        datasets: [{
          label: 'Genders',
          data: [femaleCount, maleCount],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(0, 0, 0, 0.2)'

          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'

          ]
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        responsive: false,
        maintainAspectRatio: true
      }
    });


    // let myChart2 = new Chart(ctx2, {
    //   type: 'pie',
    //   data: {
    //     labels: ["Female", "Male"],
    //     datasets: [{
    //       backgroundColor: [
    //         "#2ecc71",
    //         "#3498db"
    //       ],
    //       data: [femaleCount, maleCount]
    //     }]
    //   }
    // })
    // let personDob =
    if (newPerson.dob == null) {
      newPerson.dob = 0;
    }
    // let newDob = newPerson.dob.match(yearRegex);
    // if (newDob == null) {
    //   newPerson.dob = 0;
    // }
    let ctx3 = document.getElementById("myChart3").getContext('2d');
    let myChart3 = new Chart(ctx3, {
      type: 'pie',
      data: {
        labels: ["1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997", newPerson.dob],
        datasets: [{
          backgroundColor: [
            "#2ecc71",
            "#3498db",
            '#000',
            '#fab',
            '#00f',
            '#42f468',
            '#41f4e2',
            '#41d3f4',
            '#b841f4',
            '#f44152',
            '#bbb'


          ],
          data: [year88, year89, year90, year91, year92, year93, year94, year95, year96, year97, 1]
        }]
      }
    })
  })
  .catch(e => console.log(e));


// console.log("OUT "+ UScount);



let myFunc = () => {
  console.log('myFunc called');
  document.getElementById('output').innerHTML = '<h1>' + document.getElementById('myText').value + '</h1>';
}

module.exports = {
  myFunc
}


let myFunction = () => {
  // var c = document.getElementById("myChart");
  // var c1 = document.getElementById("myChart2");
  // var c2 = document.getElementById("myChart3");
  // var ctx = c.getContext("2d");
  // var ctx2 = c1.getContext("2d");
  // var ctx3 = c2.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  ctx2.clearRect(0, 0, c1.width, c1.height);
  ctx3.clearRect(0, 0, c2.width, c2.height);
  let e = document.getElementById("drpdown");
  let strUser = e.options[e.selectedIndex].text;
  console.log("selected: " + strUser);
  let url = "https://randomuser.me/api/?results=" + strUser + "&inc=gender,name,nat,id,picture,dob&nat=us,nz,fr,gb,nl ";

  fetch(url)
    .then(response => response.json())
    .then(userData => {
      console.log(userData.results);
      for (let v = 0; v < userData.results.length; v++) {
        let rndYearnum = getRndInteger(1988, 1997);
        let rndMonthnum = getRndInteger(1, 12);
        let rndDaynum = getRndInteger(1, 30);
        console.log("rndYearnum: " + rndYearnum.toString() + "/" + rndMonthnum + "/" + rndDaynum);
        userData.results[v].dob = rndYearnum.toString() + "/" + rndMonthnum + "/" + rndDaynum;
        //  data = data.replace(allYearRegex,rndYearnum.toString());
      }
      let data = '';
      userData.results.forEach(person => data += `name${count++}: ${person.name.first} ${person.name.last}\nDOB: ${person.dob}\ngender: ${person.gender}\nNAT: ${person.nat}\n\n`);
      let toAdd = document.createDocumentFragment();
      for (let i = 0; i < userData.results.length; i++) {
        let divTag = document.createElement("div");
        divTag.id = "div" + i;
        divTag.innerHTML = userData.results[i].name.first + " " + userData.results[i].name.last + "<br />" + userData.results[i].gender + "<br />" + userData.results[i].dob + "<br />" + userData.results[i].nat + "<br />";
        document.getElementById("peopleContainer").appendChild(divTag);
        let userIMG = document.createElement("img");
        userIMG.src = userData.results[i].picture.medium;
        document.getElementById("peopleContainer").appendChild(userIMG);
        let linebreak = document.createElement("br");
        document.getElementById("peopleContainer").appendChild(linebreak);
        // document.getElementById("peopleList").innerHTML += userData.results[i].name.first + "\t"+ userData.results[i].name.last + "\n";
      }
      document.getElementById("userCount").innerHTML = "Current # of Users: " + userData.results.length;


      let str = data.match(USRegex);
      let str2 = data.match(NZRegex);
      let str3 = data.match(NLRegex);
      let str4 = data.match(GBRegex);
      let str5 = data.match(FRRegex);

      let males = data.match(MaleRegex);
      let females = data.match(FemaleRegex);
      femaleCount = females.length;
      maleCount = males.length - femaleCount;

      let countyear88 = data.match(year88Regex);
      let countyear89 = data.match(year89Regex);
      let countyear90 = data.match(year90Regex);
      let countyear91 = data.match(year91Regex);
      let countyear92 = data.match(year92Regex);
      let countyear93 = data.match(year93Regex);
      let countyear94 = data.match(year94Regex);
      let countyear95 = data.match(year95Regex);
      let countyear96 = data.match(year96Regex);
      let countyear97 = data.match(year97Regex);

      if (countyear88 == null) {
        countyear88 = [];
      }
      if (countyear89 == null) {
        countyear89 = [];
      }
      if (countyear90 == null) {
        countyear90 = [];
      }
      if (countyear91 == null) {
        countyear91 = [];
      }
      if (countyear92 == null) {
        countyear92 = [];
      }
      if (countyear93 == null) {
        countyear93 = [];
      }
      if (countyear94 == null) {
        countyear94 = [];
      }
      if (countyear95 == null) {
        countyear95 = [];
      }
      if (countyear96 == null) {
        countyear96 = [];
      }
      if (countyear97 == null) {
        countyear97 = [];
      }

      year88 = countyear88.length;
      year89 = countyear89.length;
      year90 = countyear90.length;
      year91 = countyear91.length;
      year92 = countyear92.length;
      year93 = countyear93.length;
      year94 = countyear94.length;
      year95 = countyear95.length;
      year96 = countyear96.length;
      year97 = countyear97.length;



      if (str == null && str.length < 1) {

        UScount = 0;
      } else {
        UScount = str.length;

      }

      if (str2 == null && str2.length < 1) {
        NZcount = 0;
      } else {
        NZcount = str2.length;
      }
      if (str3 == null && str3.length < 1) {
        NLcount = 0;
      } else {
        NLcount = str3.length;
      }
      if (str4 == null && str4.length < 1) {
        GBcount = 0;
      } else {
        GBcount = str4.length;
      }
      if (str5 == null && str5.length < 1) {
        FRcount = 0;
      } else {
        FRcount = str5.length;
      }
      document.getElementById("drpdown").style.display = "none";

      //  console.log(UScount);
      console.log(data);

      let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["US", "NZ", "FR", "GB", "NL"],
          datasets: [{
            label: 'Nationality',
            data: [UScount, NZcount, FRcount, GBcount, NLcount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          responsive: false,
          maintainAspectRatio: true
        }
      });
      let ctx2 = document.getElementById("myChart2").getContext('2d');
      let myChart2 = new Chart(ctx2, {
        type: 'horizontalBar',
        data: {
          labels: ["Female", "Male"],
          datasets: [{
            label: 'Genders',
            data: [femaleCount, maleCount],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(0, 0, 0, 0.2)'

            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)'

            ]
          }]
        },
        options: {
          scales: {
            xAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          responsive: false,
          maintainAspectRatio: true
        }
      });
      // let myChart2 = new Chart(ctx2, {
      //   type: 'pie',
      //   data: {
      //     labels: func,
      //     datasets: [{
      //       backgroundColor: [
      //         "#2ecc71",
      //         "#3498db"
      //       ],
      //       data: [femaleCount, maleCount]
      //     }]
      //   }
      // })
      let ctx3 = document.getElementById("myChart3").getContext('2d');
      let myChart3 = new Chart(ctx3, {
        type: 'pie',
        data: {
          labels: ["1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997"],
          datasets: [{
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              '#000',
              '#fab',
              '#00f',
              '#42f468',
              '#41f4e2',
              '#41d3f4',
              '#b841f4',
              '#f44152'


            ],
            data: [year88, year89, year90, year91, year92, year93, year94, year95, year96, year97]
          }]
        }
      })
      // let myChart3 = new Chart(ctx3, {
      //   type: 'pie',
      //   data: {
      //     labels: ["1988", "1989", "1990", "1991", "1992", "1993", "1994", "1995", "1996", "1997"],
      //     datasets: [{
      //       backgroundColor: [
      //         "#2ecc71",
      //         "#3498db",
      //         '#000',
      //         '#fab',
      //         '#00f',
      //         '#42f468',
      //         '#41f4e2',
      //         '#41d3f4',
      //         '##b841f4',
      //         '##f44152'


      //       ],
      //       data: [year88,year89,year90,year91,year92,year93,year94,year95,year96,year97]
      //     }]
      //   }
      // })
    })
    .catch(e => console.log(e));

}

module.exports = {
  myFunction
}



// module.exports = {
//   parseURLParams
// }
// let urlString = window.location.href;
// console.log("url string " + urlString);
// let urlParams = parseURLParams(urlString);
// console.log("URL PARAMS:" + urlParams);
let getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let func = () => {

  let x = data.match(allYearRegex);
  console.log("x " + x);
  return x;
}
let getPathFromUrl = () => {
  location.reload(true);
  window.location.href = window.location.href.split(/[?#]/)[0];


  // return window.location.href.split(/[?#]/)[0];

}
// console.log(getPathFromUrl(window.location.href));

module.exports = {
  getPathFromUrl
}



