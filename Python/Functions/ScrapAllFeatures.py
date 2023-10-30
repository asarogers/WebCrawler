import requests
from bs4 import BeautifulSoup
import re

def ScrapAllFeatures(url):
    data = []

    response = requests.get(url)
    if response.status_code == 200:
        # print("started scrapping from url")

        soup = BeautifulSoup(response.text, "html.parser")
        
        ul_elements = soup.find_all('ul', class_ = 'rng-listing-details-features-list')
        data = {}

        for ul_element in ul_elements:
            li_element = ul_element.find_all('li')

            for li in li_element:

                span_element = li.find('span')
                if span_element:
                    key = span_element.get_text(strip=True)
                    value = li.get_text(strip=True).replace(key, '', 1).strip()
                    data[key] = value
        

        address_div = soup.find('div', class_="rng-listing-details-listing-data-address")

        if address_div:
            address = address_div.find("h1").get_text(strip=True)
            data["address"] = address

        specs = soup.find('ul', class_='rng-listing-details-main-information-list')

        divPrice = soup.find('div', class_='rng-listing-details-main-information-market-estimate')
        price = ""
        for tag in divPrice:
            if "$" in tag.text:
                price = (tag.text)
                price = re.search(r'\d{1,3}(?:,\d{3})*(?:\.\d{2})?', price).group()
                price = price.replace(",","")
                data["price"] = price

        # if specs:
            li_elements = specs.find_all('li')

            

            

            if len(li_elements) >= 4:
                square_footage = li_elements[2].get_text(strip=True).replace(' sq. ft.', '')
                home_type = li_elements[3].get_text(strip=True)

                data["Square_Feet"] = square_footage
                data["Home_Type"] = home_type
        return data

        # for key,value in data.items():
        #     print(f"{key.replace(' ', '_')} : {value}")
        # print("Address: ", address)
        # Price, County, Full_Bathrooms, MLS_Market_Area, Property
        




    # for page_number in range(1, 4):
    #     # Send a GET request to the current URL
    #     response = requests.get(url)

    #     # Check if the request was successful
    #     if response.status_code == 200:
    #         print(page_number)
    #         # Parse the HTML content
    #         soup = BeautifulSoup(response.text, "html.parser")

    #         # Your scraping logic here for the current page

    #         # Find the "Next" link
    #         next_link = soup.find('a', class_='rn-search-prop-listings-sort-paging-number')

    #         if next_link:
    #             # Get the URL of the next page
    #             next_page_url = next_link.get('href')
    #             url = "https://www.example.com" + next_page_url
    #             print(page_number)
    #         else:
    #             # No "Next" link found, exit the loop
    #             print("no next")
    #             url = None
    #     else:
    #         print("Failed to retrieve the page:", response.status_code)
    #         break

