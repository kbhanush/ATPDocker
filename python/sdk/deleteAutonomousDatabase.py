import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python deleteAutonomousDatabase.py start 

Delete the database given the DB OCID
"""


#Setup
config = from_file(file_location="./oci-config")

try:
	if len(sys.argv) == 2:
		
		exampleDelete = atp.deleteAutonomousDatabase(config, sys.argv[1])

		print("Response: "+ str(exampleDelete))

	else:
		print ("Please add the Database OCID as the argument!")


except Exception as e: 
	print(e)
