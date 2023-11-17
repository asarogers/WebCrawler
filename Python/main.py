from Functions.SqlFunctions import InsertNewRow, InsertAllDataIntoNewRow, GetAllFromColumn
from Functions.ScrapURL import scrapFromUrl
from Functions.ScrapAllFeatures import ScrapAllFeatures
from Functions.ConnectionToDatabase import get_db_connection

def main():
    

    table = "rental"
    columnName = "Url"
    unresolvedErrors = []
    connection = get_db_connection()

    if connection:
        try:
            # array = scrapFromUrl()
            # for data in array:
            #     print("testing")
            #     InsertNewRow(table, columnName, data,connection, 1)
            
            urls = GetAllFromColumn(table, columnName,connection)
            for id in range(95836, (95837)):
                url = urls[id][0]
    #         # url = "https://www.realtysouth.com/ListingDetails/3745-SPORTSMAN-LAKE-ROAD-ODENVILLE-AL-35120/1358034"
                dict = ScrapAllFeatures(url)
                print(dict)
                print("start = " +str(id))
                f = open("lastUsed.txt", "a")
                f.write("\nstart = " +str(id))
                f.close()
                response = InsertAllDataIntoNewRow(table,columnName, url, dict,connection, id)
                
                if response:
                    unresolvedErrors.append(response)
                    print(unresolvedErrors)
        finally:
            # Close the database connection when done
            connection.close()
            print("Connection closed")
    

if __name__ == "__main__":
    main()