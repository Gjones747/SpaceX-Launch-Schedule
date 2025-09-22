let firstLaunchTime = document.getElementById('firstLaunchTime');
let firstLaunchName = document.getElementById('firstLaunch');
let secondLaunchName = document.getElementById('secondLaunch')
let secondLaunchTime = document.getElementById('secondLaunchTime')
let thirdLaunchTime = document.getElementById('thirdLaunchTime')
let thirdLaunchName = document.getElementById('thirdLaunch')
let fourthLaunchTime = document.getElementById('fourthLaunchTime')
let fourthLaunchName = document.getElementById('fourthLaunch')
let fifthLaunchName = document.getElementById('fifthLaunch')
let fifthLaunchTime = document.getElementById('fifthLaunchTime')
let firstLaunchDetails = document.getElementById('firstLaunchDetails')
let secondLaunchDetails = document.getElementById('secondLaunchDetails')
let thirdLaunchDetails = document.getElementById('thirdLaunchDetails')
let fourthLaunchDetails = document.getElementById('fourthLaunchDetails')
let fifthLaunchDetails = document.getElementById('fifthLaunchDetails')


async function getResponse() {
    api_url = 'https://ll.thespacedevs.com/2.3.0/events/upcoming/?format=json'

    const response = await fetch(api_url);
    const data = await response.json();

    if (response.status == 429) {
        console.log("yeah ur cooked")

        $(".collapse").remove();

        $("#first-launch").remove();
        $("#secondLaunchInfo").remove();
        $("#thirdLaunchInfo").remove();
        $("#fourthLaunchInfo").remove();
        $("#fifthLaunchInfo").remove();
        $("#firstLaunch").remove()
        $("#secondLaunch").remove()
        $("#thirdLaunch").remove()
        $("#fourthLaunch").remove()
        $("#fifthLaunch").remove()
        
        $("body").append("<h1 id='firstLaunchInfo'>API ran out of tokens. Sorry :( </h1>")





        return 
    }





    return data

    

}


const getApiData = (launchNumber, element, type, data) => {

    if (type === 'name') {
        missionName = data.results[launchNumber-1].name
        element.innerHTML = missionName
    }
    
    if (type === 'time') {
        missionTime = data.results[launchNumber-1].date
        date = missionTime.slice(0, 10)
        time = missionTime.slice(11, 16)
        element.innerHTML = `${date}, ${time}` 
    
    }

    if (type === 'data') {
        details = data.results[launchNumber-1].description
        console.log(details)
        if (details === null) {
            
            launchSite = data.results[launchNumber-1].location
            element.innerHTML = launchSite
            var link 
            try {
                link = data.results[launchNumber-1].url
            } catch {
                link = data.results[launchNumber-1].info_urls[0].url
            }  

            if (link != null) {
                element.href = link
            }

        
        } else {
            var link 
            try {
                if (data.results[launchNumber-1].info_urls.length != 0) {
                    link = data.results[launchNumber-1].info_urls[0].url
                } else if (data.results[launchNumber-1].vid_urls.length != 0) {
                    link = data.results[launchNumber-1].vid_urls[0].url
                }
                
            } catch {
                link = null
            }

            if (link != null) {

                element.href = link

            }
            element.innerHTML = `${details.slice(0, 100)}...`

        }
    }
}

function formatData(data) {
    console.log(data)
    if (data != null) {
        getApiData(1, firstLaunchName, 'name', data)
        getApiData(2, secondLaunchName, 'name', data)
        getApiData(3, thirdLaunchName, 'name', data)
        getApiData(4, fourthLaunchName, 'name', data)
        getApiData(5, fifthLaunchName, 'name', data)
        getApiData(1, firstLaunchTime, 'time', data)
        getApiData(2, secondLaunchTime, 'time', data)
        getApiData(3, thirdLaunchTime, 'time', data)
        getApiData(4, fourthLaunchTime, 'time', data)
        getApiData(5, fifthLaunchTime, 'time', data)
        getApiData(1, firstLaunchDetails, 'data', data)
        getApiData(2, secondLaunchDetails, 'data', data)
        getApiData(3, thirdLaunchDetails, 'data',data)
        getApiData(4, fourthLaunchDetails, 'data', data)
        getApiData(5, fifthLaunchDetails, 'data', data)

    }
}



getResponse().then(resultingData => formatData(resultingData))
