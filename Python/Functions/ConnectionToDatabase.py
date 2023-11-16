import mysql.connector


def get_db_connection():
        
    # Replace these with your own database credentials
    host ="localhost"
    user ="ace"
    password ="12345678"
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
            return connection

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None