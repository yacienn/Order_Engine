from main import Connection
conn = Connection()
cur =conn.cursor()

def Add_Prodect(name , price , type ) : 
    cur.execute("INSERT INTO Proudects (name , price , type ) VALEUS (%s , %s , %s)",
                 (name , price , type))
    print(f"Product {name} are Added")
    conn.commit()

