import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python createAutonomousDatabase.py DatabaseName DisplayName Password CPUCount StorageSizeInTBs

Creates an Autonomous Database Instance with given parameters
"""


#Setup
config = from_file(file_location="./oci-config")

try:

	#print(config
	#Database body to create
	body = {
		  "compartmentId" : config["compartmentid"],
		  "displayName" : sys.argv[1],
		  "dbName" : sys.argv[2],
		  "adminPassword" : sys.argv[3],
		  "cpuCoreCount" : int(sys.argv[4]),
		  "dataStorageSizeInTBs" : int(sys.argv[5])
	}

	exampleCreate = atp.createAutonomousDatabase(config, body)

	#Get the ID of the ATP instance just created
	exampleId = exampleCreate.json()['id']
	print(exampleId)
	print(exampleCreate.json())

except Exception as e: 
	print(e)


