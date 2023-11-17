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
                    key = key.replace("-","_")
                    key = key.replace("'","")
                    key = key.replace("/","_")
                    key = key.replace(' ', '_')
                    key = key.replace("_-","")
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
        
        removedColumn = [
            'Attic_Y/N','Number_of_Garage_Spaces_Main_Level','Number_of_Garage_Spaces_Basement_Level','Garage_Sqft_Or_Dimensions','Garage_Y_N',
            'Garage_YN','Attached_Garage_Y_N','Garage_Spaces','Subdivision_Minor','Year_Built_Desc','Room_3_Level','Room_1','Room_1_Level','Room_2',
            'ROOMS','Room_2_Level','Room_3','address','Room_4','Room_4_Level','Laundry_Location','Room_5','Room_5_Level','Room_6','Room_6_Level',
            'Room_7','Room_7_Level','Laundry_Space','Room_8','Room_8_Level','Fireplace_Location','AMENITIES','Attic','Room_9', 'Room_9_Level',
            'Fireplace_Details','Room_10_Level','Room_10','LOT_DESCRIPTION','Energy_Green_Features','Room_11','Room_11_Level','Basement_Style',
            'Room_12', 'Room_12_Level','Loft_Y_N','Basement_Style_III','Fireplace_Type','Pool_Features','Elementary_School','Room_13','Room_13_Level',
            'Pool_Y_N','Basement_Style_II','Room_14_Level','Room_15','Room_14','Lot_View','Room_15_Level','Room_15','Fireplace_Features','Home_Type',
            'Room_Master_Bathroom_Area', 'Room_Master_Bathroom_Length',   'Room_Master_Bathroom_Level','Room_Master_Bathroom_Width', 'Baths_Level_3', 
            'Mobile_Home_Manufacturer', 'Green_Energy_Efficient', 'Unit_Number',    'Common_Walls', 'Room_Bathroom_Five_Width', 
            'Room_Bathroom_Five_Area',  'Room_Bathroom_Five_Length', 'Room_Bathroom_Five_Level',    'Number_Of_Units_Total',    'Builder_Name', 
            'Green_Building_Verification_Type', 'Room_Bathroom_Two_Level',  'Room_Bathroom_One_Length', 'Room_Bathroom_One_Area',   
            'Room_Bathroom_One_Level', 'Room_Bathroom_One_Width', 'Type1_Eff_Y_N',  'Type2_Eff_Y_N', 'Type3_Eff_Y_N',   'Room_Bathroom_Two_Area',   
            'Room_Bathroom_Two_Length', 'Room_Bathroom_Two_Width','Pets_Allowed',   'Furnished', 'Bedroom_2_Area',  'Bedroom_2_Length', 
            'Bedroom_2_Level',  'Bedroom_2_Width','Bedroom_3_Area','Bedroom_3_Length','Bedroom_3_Level',    'Bedroom_3_Width','Bedroom_4_Area',
            'Bedroom_4_Length','Bedroom_4_Level',    'Bedroom_4_Width', 'Dining_Room_Length',    'Dining_Room_Level',    'Dining_Room_Width',
            'Family_Room_Area', 'Family_Room_Length',   'Family_Room_Level', 'Family_Room_Width', 'Kitchen_Area',  'Kitchen_Length', 
            'Kitchen_Level', 'Kitchen_Width', 'Living_Room_Area',   'Living_Room_Length', 'Living_Room_Level',  'Living_Room_Width',    
            'Master_Bedroom_Area', 'Master_Bedroom_Length', 'Master_Bedroom_Width', 'Boat_Facilities', 'View',  'custom_elem', 'custom_high', 
            'custom_middle',  'Water_Bod_Y_Name', 'Room_Bathroom_Three_Level', 'Room_Bedroom_Area', 'Room_Bedroom_Length', 'Room_Bedroom_Level',
              'Room_Bedroom_Width', 'Special_Listing_Conditions',   'Bedroom_5_Area',   'Bedroom_5_Length', 'Bedroom_5_Level','Bedroom_5_Width',
              'Spa_Features', 'Room_Bathroom_Three_Area','Room_Bathroom_Three_Length',    'Room_Bathroom_Three_Width','Rent_Includes',
              'Number_Of_Buildings','Gas'
              ]
        for column in removedColumn:
            if column in data:
                # print("pop data", column)
                data.pop(column)

                
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

