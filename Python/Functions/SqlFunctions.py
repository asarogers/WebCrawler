
import mysql.connector
from Functions.ConnectionToDatabase import get_db_connection
#provide the table you wish to insert data
#provide the name of the columnName you want to insert data
#provide the data you wish to insert

def InsertNewRow(table, columnName, data, connection, id):
    #get the connection
    

    #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()

            insert = "Insert into " + table +" (" + columnName +") VALUES ('"+ data +"')"
            # print(insert)
            cursor.execute(insert)

            # # # Commit the changes
            connection.commit()

            print("Data inserted successfully.")

        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"Insert id= {id} query = {insert}")
            #what happens if data exceeds the character limit in the database?
            if err.errno == 1406:
                #get the length of the data
                length = len(data)
                #create function to programmically update the database character limit for the column
                AlterColumnLength(table, columnName, length, connection, insert, id)


#provide the table you wish to insert data
#provide the name of the columnName you want to insert data
#provide the data you wish to insert
#provide the Url as the where condition

def UpdateRow(table, columnName, data, Url,connection, id):

    #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()
            data = data.replace(",", "")
            data = data.replace("'","")
            columnName = columnName.replace("-","_")
            columnName = columnName.replace("'","")

            insert = "Update " + table +" Set " + columnName +" = '"+ str(data) +"' Where Url ='" + Url +"'"
            # print(insert)
            cursor.execute(insert)

            # # # Commit the changes
            connection.commit()

            # print("Data updated successfully.")

            # all cases that break the code
        except mysql.connector.Error as err:
            resolvedErrors = [1054, 1406, 1060, 1366]
            print(f"Error: {err}")
            print(f"Update id= {id} query = {insert}")
            #what happens if the columnName does not exist?
            if err.errno == 1054:
                #get the capture the  columnName
                CreateNewColumn(table, columnName, data, connection, insert, id)
                #get the capture the  columnName
            #what happens if dupulicated data?
            elif err.errno == 1060:
                # just move on, should not break
                print("duplicate column")
            #error in the syntax
            elif err.errno not in resolvedErrors:
                print("not resolved", insert)
                return({"errorCode": err.errno, "syntax":insert })

            #what happens if data exceeds the character limit in the database?
            elif err.errno == 1406:
                #get the length of the data
                length = len(data)
                #create function to programmically update the database character limit for the column
                AlterColumnLength(table, columnName, length, connection, insert, id)
            
            #what happens if primitive is wrong type?
                #two options here:
            elif err.errno == 1366:
                #the primitive is a string into of integer
                #we should convert the column into a string in this case
                AlterColumnType(table, columnName, Url, connection, insert, id)
                # if its a integer instead of string
                #no problem should occur here in sql
            

            

            
        

def InsertAllDataIntoNewRow(table, columnName, url, dict, connection, id):
        unresolvedErrors = []
        #insert the data into the database, provide table, columnName name, and data
        InsertNewRow(table, columnName, url, connection, id)

        try:
            #loop through all the data in the dictionary
            for key,data in dict.items():
                
                #use the keys as columnName names, replace any spaces with underscores
                columnName = key.replace(' ', '_')
                columnName = columnName.replace("_-","")
                columnName = columnName.replace("/","_")

                #call the update function to update the columnName where the url = our url
                response = (UpdateRow(table, columnName, data, url,connection, id))
                if response:
                    unresolvedErrors.append(response)
            # print("Done.")
            return unresolvedErrors
        except AttributeError as err:
            unresolvedErrors.append({"errorCode": err, "syntax":url })
        #if code is 404, then delete it from database and let me know it happened
        

#given a table and columnName
#create a new column in MySql database
def CreateNewColumn(table, columnName, data, connection, oldInsert, id):
     #get the connection

    #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()


        #  print(f"{key.replace(' ', '_')} : {value}")
            insert = "Alter Table " + table +" Add " + columnName+" VARCHAR(" + str(len(data))+") NULL;" 
            # print(insert)
            cursor.execute(insert)
            cursor.execute(oldInsert)

            # Commit the changes
            connection.commit()

            print("Successfully created new column database.")

            # all cases that break the code
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"CREATE id= {id} query = {insert}")

def AlterColumnType(table, columnName, Url, connection, oldInsert, id):
     #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()


        #  print(f"{key.replace(' ', '_')} : {value}")
            insert = "ALTER Table " + table +" MODIFY COLUMN " + columnName+" varchar(" + str(2)+");" 
            cursor.execute(insert)
            cursor.execute(oldInsert)


            # Commit the changes
            connection.commit()

            print("Successfully ALTERED the length database.")

            # all cases that break the code
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"ALTER TYPE id= {id} query = {insert}")

def AlterColumnLength(table, columnName, length, connection, oldInsert, id):
    #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()


        #  print(f"{key.replace(' ', '_')} : {value}")
            insert = "ALTER Table " + table +" MODIFY COLUMN " + columnName+" varchar(" + str(length)+");" 
            print("insert")
            cursor.execute(insert)
            cursor.execute(oldInsert)

            # Commit the changes
            connection.commit()

            print("Successfully ALTERED the length database.")

            # all cases that break the code
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"ALTER LENGTH id= {id} query = {insert}")

def GetAllFromColumn(table, columnName,connection):

     #check if the connection is successful
    if connection:
        try:
            cursor = connection.cursor()


        #  print(f"{key.replace(' ', '_')} : {value}")
            query = "SELECT  " + columnName +" FROM " + table + " limit 190000"; 
            # print(insert)
            cursor.execute(query)

           # Fetch all rows
            rows = cursor.fetchall()

            print("Successfully gathered data.")
            return rows

            # all cases that break the code
        except mysql.connector.Error as err:
            print(f"Error: {err}")
            print(f"GETALL query = {query}")