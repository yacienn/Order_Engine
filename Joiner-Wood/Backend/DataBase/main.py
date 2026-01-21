import psycopg2 
def Connection () :
 conn = psycopg2.connect(
    host="localhost",
    dbname="Joiner_System",
    user="postgres",
    password="yacine",
    port=5432
 )
 return conn 