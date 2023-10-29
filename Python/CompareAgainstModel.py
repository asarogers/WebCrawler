# scraper.py
from bs4 import BeautifulSoup
import requests

# URL of the webpage you want to scrape
url = 'https://www.realtysouth.com/proxy/getproperties3.aspx?companyid=646&accountid=592873&clientid=0&mlsID=-16&foreclosure=false&sold=None&isbranded=false&mapapproxaddress=true&version=2.5&page=3&pagesize=250&mapid=279664662131432620&mlssold=SoldExclusive&currency=USD&criteria=searchmls[]-16~geocoords[gquad]36.18702172843971|28.79212654410026|-85.26285197352362|-89.20694377039862~groupproptype[in]200|300|400|800~listingstatuscode[in]2097152~searchmode[]viewport&culture=en'

# Send a GET request to the URL
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the HTML content of the page
    soup = BeautifulSoup(response.text, 'html.parser')

    # Example: Extract the title of the page
    for child in soup.children:
        print(f'Title of the webpage: {child}')
else:
    print(f'Failed to retrieve the webpage. Status code: {response.status_code}')
