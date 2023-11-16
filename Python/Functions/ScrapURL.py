# scraper.py
from bs4 import BeautifulSoup
import requests

def scrapFromUrl():
    urlArray = []#716
    for i in range(200,300):
        # URL of the webpage you want to scrape
        scrapUrl = 'https://www.realtysouth.com/proxy/getproperties3.aspx?companyid=646&accountid=592873&clientid=0&mlsID=-16&foreclosure=false&sold=None&isbranded=false&mapapproxaddress=true&version=2.5&page=' + str(i) + '&pagesize=250&mapid=279664662131432620&mlssold=SoldExclusive&currency=USD&criteria=searchmls[]-16~geocoords[gquad]36.18702172843971|28.79212654410026|-85.26285197352362|-89.20694377039862~groupproptype[in]200|300|400|800~listingstatuscode[in]2097152~searchmode[]viewport&culture=en'
        # scrapUrl = "https://www.realtysouth.com/proxy/getproperties3.aspx?companyid=646&accountid=592873&clientid=0&mlsID=-16&foreclosure=false&sold=None&isbranded=false&mapapproxaddress=true&version=2.5&page=1&pagesize=250&mapid=279664662131432620&currency=USD&criteria=groupproptype%5Bin%5D200%7Esearchmls%5B%5D%2D16%7Elistingstatuscode%5Bin%5D16384|4209715|521241540|536870912%7Egeocoords%5Bgquad%5D34%2E201836437849195|30%2E929588191879795|%2D84%2E35849692439032|%2D90%2E11129881953192&culture=en"
        print("started")
        # Send a GET request to the URL 
        response = requests.get(scrapUrl)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the HTML content of the page
            soup = BeautifulSoup(response.text, 'html.parser')
            # print("parserred data")

            # Example: Extract the title of the page
            #seoURL:'/ListingDetails/6644-WHITE-OAK-LANE-HUEYTOWN-AL-35023/1345793',geoCodeLat:33.424000,geoCodeLng:-87.067523,mlsID:328,mlsNumber:'1345793',companyID:646,extraFilesCode:33,address:'6644 WHITE OAK LANE ',mlsCity:'HUEYTOWN',state:'AL',loName:'RealtySouth-Huntsville-BHM'
            text = soup.text
            word_list = text.split(",")
            # print(word_list)
            # print("divided words")

            for element in word_list:
                if "seoURL:'" in element:
                    modifiedURL = element.split("{seoURL:'")[1]
                    second = modifiedURL.split("'")[0]
                    url = ("https://www.realtysouth.com" + second)
                    urlArray.append(url)
                    #https://www.realtysouth.com/ListingDetails/1622-FRANKLIN-PARC-DRIVE-WARRIOR-AL-35180/1357756
            print("done wih scrap")
        else:
            print(f'Failed to retrieve the webpage. Status code: {response.status_code}')
    return urlArray
