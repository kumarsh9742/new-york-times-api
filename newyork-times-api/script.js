var horizonatal1 =document.getElementById('horizonatal1');
var displaySection =document.getElementById('displaySection');
let data="";
async function generate(){    
      let selArry=[];
      let nystoryurl =`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=UwdQlRDCvBuFsFG3zeW8wwrdOm19XQhA`;
      let response = await fetch(nystoryurl);
      let result = await response.json();
      data=result;
      console.log("result.results.length",result.results.length,"<br>");

      let divms = document.createElement('div');
      divms.setAttribute('class', 'row');
      divms.setAttribute("style","margin-right: 60px");
      divms.setAttribute("style","margin-left: 60px");
      
      for (let i = 0; i < result.results.length; i++) {
           let mainSelection = (result.results[i].section);
           let datams ="";
           if(mainSelection.length>0){
               datams =mainSelection;
           }
           if(!selArry.includes(datams) && datams != "") {
            selArry.push(datams);
           }
        
       }
       console.log(selArry);
       let sortSelArry=selArry.sort();
       console.log(sortSelArry);


      for(let sma=0;sma<sortSelArry.length;sma++){

            let ulli = document.createElement('ul');
            ulli.setAttribute("class","nav nav-tabs nav-fill mt-2");
            ulli.setAttribute("style","margin-right: 10px");
            let smali = document.createElement('li');
            smali.setAttribute("class","nav-item");
            let smaA = document.createElement('a');
            smaA.setAttribute("class","nav-link");
            smaA.setAttribute("href","#");
            smaA.setAttribute("onclick",`getNews('${sortSelArry[sma]}')`);
            smaA.setAttribute("value",sortSelArry[sma]);

           // smaA.setAttribute("onclick",selArry[sma]+"()");

            smaA.innerHTML = sortSelArry[sma];
            smali.appendChild(smaA);
            ulli.appendChild(smali);
            divms.appendChild(ulli);
            horizonatal1.appendChild(divms);

      }
     let sectionName='world';
     for (let i = 0; i < data.results.length; i++)
     {

         if(sectionName === data.results[i].section )
         {    
             let row = document.createElement('div');
             row.className = 'row mt-3';
             row.setAttribute("style","margin-right: 0px");
              let months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
              var col = document.createElement('div');
              col.className = 'col col-12 mt-3 ml-2';
              let myDate = new Date(data.results[i].created_date);
              let createdMonth = months[myDate.getMonth()];
              let createdDate = myDate.getDate();
              let createdPeriod = createdMonth + " " + createdDate;
              if(data.results[i].section=="us")
              {
                  let convertus = data.results[i].section;
                  data.results[i].section = convertus.toUpperCase();
              }
              else if(data.results[i].section=="nyregion")
              {
                  data.results[i].section = "New York";
              }
              displayArea = `<div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span class='text-primary'>${data.results[i].title}</span>  
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class = 'card container'>
                   <div class = 'row xs-column-reverse '>
                    <div class = 'col-md-8 top-padding mb-3'>
                     <p class = 'card-text'>
                      <br><br>
                      <span class="title"><strong>${data.results[i].title}</span></strong>
                       <div class="d-flex justify-content-between">
                     <span style="color : gray"><b>${createdPeriod}</b></span><br><br>
                      <span class="byLine">${data.results[i].byline}</span>
                     </div><br>
                    <span>${data.results[i].abstract}</span><br><br>
                   <a href="${data.results[i].url}">Continue Reading</a>
                  </div>
                  <div class="col-md-4 right-padding">
                 <img src = '${data.results[i].multimedia[0].url}' class = 'card-img' id = 'image'>
                  </p>
                </div>
                </div>
              </div>
             </div>
          </div>
          </div>`;
              col.innerHTML = displayArea;
              row.appendChild(col);
              displaySection.appendChild(row);
          }
       
   }
          


}
generate();

function getNews(newsType)
 {
      displaySection.innerHTML = "";
      let sectionName = newsType
      let sectionDetails = data.results;
      
      for (let i = 0; i < data.results.length; i++)
       {

           if(sectionName === data.results[i].section )
           {    
               let row = document.createElement('div');
               row.className = 'row mt-3';
               row.setAttribute("style","margin-right: 10px");
                let months = ["Jan","Feb","Mar","April","May","June","July","Aug","Sep","Oct","Nov","Dec"];
                var col = document.createElement('div');
                col.className = 'col col-12 mt-3 ml-2';
                let myDate = new Date(data.results[i].created_date);
                let createdMonth = months[myDate.getMonth()];
                let createdDate = myDate.getDate();
                let createdPeriod = createdMonth + " " + createdDate;
                if(data.results[i].section=="us")
                {
                    let convert = data.results[i].section;
                    data.results[i].section = convert.toUpperCase();
                }
                else if(data.results[i].section=="nyregion")
                {
                    data.results[i].section = "New York";
                }
                displayArea = `<div class="accordion" id="accordionExample">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h2 class="mb-0">
                    <button class="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        <span class='text-primary'>${data.results[i].title}</span>  
                    </button>
                  </h2>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                  <div class = 'card container'>
                   <div class = 'row xs-column-reverse '>
                    <div class = 'col-md-8 top-padding mb-3'>
                     <p class = 'card-text'>
                      <br><br>
                      <span class="title"><strong>${data.results[i].title}</span></strong>
                       <div class="d-flex justify-content-between">
                     <span style="color : gray"><b>${createdPeriod}</b></span><br><br>
                      <span class="byLine">${data.results[i].byline}</span>
                     </div><br>
                    <span>${data.results[i].abstract}</span><br><br>
                   <a href="${data.results[i].url}">Continue Reading</a>
                  </div>
                  <div class="col-md-4 right-padding">
                 <img src = '${data.results[i].multimedia[0].url}' class = 'card-img' id = 'image'>
                  </p>
                </div>
                </div>
              </div>
             </div>
          </div>
          </div>`;
                col.innerHTML = displayArea;
                row.appendChild(col);
                displaySection.appendChild(row);
            }
         
     }
}

