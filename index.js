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

const getApiData = async (launchNumber, element, type) => {
    api_url = 'https://api.spacexdata.com/v3/launches/upcoming'
    const response = await fetch(api_url);
    const data = await response.json();
    if (type === 'name') {
        missionName = data[launchNumber-1].mission_name
        element.innerHTML = missionName
    }
    
    if (type === 'time') {
        missionTime = data[launchNumber-1].launch_date_local
        date = missionTime.slice(0, 10)
        time = missionTime.slice(11, 16)
        element.innerHTML = `${date}, ${time}` 
    
    }

    if (type === 'data') {
        details = data[launchNumber-1].details
        if (details === null) {
            
            launchSite = data[launchNumber-1].launch_site.site_name_long
            element.innerHTML = launchSite
            link = data[launchNumber-1].links.reddit_campaign
            link = data[launchNumber-1].links.reddit_campaign

            if (link != null) {

                element.href = link

            }

        
        } else {
            link = data[launchNumber-1].links.reddit_campaign

            if (link != null) {

                element.href = link

            }
            element.innerHTML = `${details.slice(0, 100)}...`

        }
    }
}
getApiData(1, firstLaunchName, 'name')
getApiData(2, secondLaunchName, 'name')
getApiData(3, thirdLaunchName, 'name')
getApiData(4, fourthLaunchName, 'name')
getApiData(5, fifthLaunchName, 'name')
getApiData(1, firstLaunchTime, 'time')
getApiData(2, secondLaunchTime, 'time')
getApiData(3, thirdLaunchTime, 'time')
getApiData(4, fourthLaunchTime, 'time')
getApiData(5, fifthLaunchTime, 'time')
getApiData(1, firstLaunchDetails, 'data')
getApiData(2, secondLaunchDetails, 'data')
getApiData(3, thirdLaunchDetails, 'data')
getApiData(4, fourthLaunchDetails, 'data')
getApiData(5, fifthLaunchDetails, 'data')
