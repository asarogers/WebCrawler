import mysql.connector



# Replace these with your own database credentials
host ="192.168.1.111"
user ="ace"
password ="A90@1491s"
database= "webcrawler"

try:
    # Connect to the MySQL server
    connection = mysql.connector.connect(
        host=host,
        user=user,
        password=password,
        database=database
    )

    if connection.is_connected():
        print(f"Connected to MySQL database '{database}'")

        # Perform database operations here

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    # Close the database connection when done
    if 'connection' in locals() and connection.is_connected():
        connection.close()
        print("Connection closed")
