import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python exampleStart.py OCID 

Starts the database given the OCID
"""


#Setup
config = from_file(file_location="./oci-config")

try:
	if len(sys.argv) == 2:
		
		exampleStart = atp.startAutonomousDatabase(config, sys.argv[1])

		print("Response: " + str(exampleStart) )


except Exception as e: 
	print(e)



