import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python getAutonomousDatabase.py OCID

Retrieve a database
"""


#Setup
config = from_file(file_location="./oci-config")

try:
	if len(sys.argv) == 2:
		
		exampleGet = atp.getAutonomousDatabase(config, str(sys.argv[1]))

		print("Response: \n" + str(exampleGet.json()) )

	else:
		print("Please include the database OCID to retrieve")


except Exception as e: 
	print(e)



