import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python restoreAutonomousDatabase.py databaseOCID timeToRestore

Restores an Autonomous Database to the time specified
"""


#Setup
config = from_file(file_location="./oci-config")

try:

	if len(sys.argv) == 3:

		exampleRestore = atp.restoreAutonomousDatabase(config, sys.argv[1], sys.argv[2])

		print("Response: " + str(exampleRestore))

	else:
		print("Please give the required arguments")
	

except Exception as e: 
	print(e)


