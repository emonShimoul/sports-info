const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("input-value");

searchInput.addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == "Enter") {
        searchBtn.click();
    }
});

const displayError = (text) => {
    const showError = document.getElementById('show-error');
    showError.textContent = '';
    const h3 = document.createElement('h3');
    h3.classList.add('text-danger', 'text-center','mt-5');
    h3.innerText = text;
    showError.appendChild(h3);
}


document.getElementById('search-button').addEventListener('click', () => {
    const searchResult = async () => {
        const searchResultDiv = document.getElementById('search-result');
        searchResultDiv.textContent = '';
        const details = document.getElementById('display-details');
        details.textContent = '';
        const inputValue = document.getElementById('input-value');
        const inputResult = inputValue.value;
        inputValue.value = '';
        if (inputResult == '') {
            displayError("Please, Enter a Team name!!");
        }
        else {
            const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${inputResult}`;
            const res = await fetch(url);
            const data = await res.json();
            showResult(data);
        }
    }
    searchResult();
});

const showResult = (data) => {
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.textContent = '';
    const showError = document.getElementById('show-error');
    showError.textContent = '';
    const details = document.getElementById('display-details');
    details.textContent = '';
    console.log(data.teams);
    if(data.teams == null){
        displayError("Your searching result is not found. Try another team name!!");
    }
    data.teams.forEach(element => {
        // console.log(element);
        const div = document.createElement('div');
        div.classList.add('p-5', 'm-3', 'border', 'border-info', 'bg-light', 'rounded-3', 'text-center');
        div.innerHTML = `
        <h5 class="text-info">${element.strTeam}</h5>
        <button onclick="displayDetails(${element.idTeam})" class="btn btn-secondary btn-sm mt-3 text-white">Show Details</button>
        `;
        searchResultDiv.appendChild(div);
    });
}


const displayDetails = async(id) => {
    const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const finalData = data.teams[0];
    console.log(finalData);
    const details = document.getElementById('display-details');
    details.textContent = '';
    const div = document.createElement('div');
    div.classList.add('mb-3','bg-info', 'border','border-3', 'border-dark', 'p-3');
    div.innerHTML = `
    <div class="text-center">
    <img width="300px" class="mb-3" src=${finalData.strTeamLogo} alt="Logo is not available...">
    </div>
    <p><span class='fw-bold text-white pe-1'>Country : </span>${finalData.strCountry}</p>
    <p><span class='fw-bold text-white pe-1'>Sport : </span>${finalData.strSport}</p>
    <p><span class='fw-bold text-white pe-1'>Stadium : </span>${finalData.strStadium}</p>
    <p><span class='fw-bold text-white pe-1'>Stadium Location : </span>${finalData.strStadiumLocation}</p>
    <p><span class='fw-bold text-white pe-1'>Description: </span>${finalData.strDescriptionEN}</p>
    <p><span class='fw-bold text-white pe-1'>Website: </span><a class="text-decoration-none" href="https://${finalData.strWebsite}">${finalData.strWebsite}</a></p>
    <p><span class='fw-bold text-white pe-1'>Facebook: </span><a class="text-decoration-none" href="https://${finalData.strFacebook}">${finalData.strFacebook}</a></p>
    <p><span class='fw-bold text-white pe-1'>Instagram: </span><a class="text-decoration-none" href="https://${finalData.strInstagram}">${finalData.strInstagram}</a></p>
    <p><span class='fw-bold text-white pe-1'>Youtube: </span><a class="text-decoration-none" href="https://${finalData.strInstagram}">${finalData.strYoutube}</a></p>
    `;
    console.log(finalData.strFacebook);
    details.appendChild(div);
}