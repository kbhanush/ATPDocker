import cx_Oracle
import csv
import sys

"""
Example script to load data into table and query ATP instance via python. 

Three arguments are accepted in this order Username, Password, and the DNS

Usage:
python exampleConnection.py Username Password DSN
"""

def exampleConnection(con):
	cur = con.cursor()


	#Create the table to load data into
	cur.execute("""create table sales_transactions (
				Transaction_date VARCHAR(26),	Product VARCHAR(26), Price NUMBER(8), 
				Payment_Type VARCHAR(26), Name VARCHAR(26), City VARCHAR(48), 
				State VARCHAR(26), Country VARCHAR(26), Account_Created VARCHAR(26), 
				Last_Login VARCHAR(26), Latitude NUMBER(20), Longitude NUMBER(20))""")

	#Read in the file

	results = []
	reader = csv.reader(open("sales.csv","r"))
	for line in reader:
		results.append(line)

	#Example inserting file into table via python
	cur.executemany("""insert into sales_transactions(Transaction_date,Product,Price,Payment_Type,Name,City,State,
			Country,Account_Created,Last_Login,Latitude,Longitude) values (:1, :2, :3, :4, :5, :6, :7, :8, :9, :10, :11, :12)""", results)

	#Verify our results
	selectReturn = cur.execute("select * from sales_transactions where price > 3600")
	#Print select statement
	for line in selectReturn:
		print (line)


#Basic sanitation
if len(sys.argv) == 4:
	try:
		con = cx_Oracle.connect(sys.argv[1], sys.argv[2], sys.argv[3])
		print (con.version)

		print("You have successfully connected!")

		#Example function to load data into a table and run a select statement, printing the results
		#Commented out by default
		#exampleConnection(con)

		con.close()
	except Exception as e: 
		print(e)
else:
	print("Please enter the required three arguments (Username, Password, and DSN")


