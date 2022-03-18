import mysql.connector

db = mysql.connector.connect(
    host='database-1.ctn2lesi9qqn.us-east-1.rds.amazonaws.com', 
    user="admin",
    passwd="letsgethd",
    database="backup"       
)

mycursor = db.cursor()
mycursor.execute("select * from article where headline = 'Abdominal Fat'")
for x in mycursor:
    print(x)
