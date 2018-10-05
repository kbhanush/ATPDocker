import oci
from oci.config import from_file
import atp, regions
import sys

"""
Example scripts demonstrating how to use the ATP Rest APIs for python

Usage:
python listAutonomousDatabase.py 

List the databases in the compartment specified in the oci-config file
"""


#Setup
config = from_file(file_location="./oci-config")

try:
		
	exampleList = atp.listAutonomousDatabase(config)

	print("Response: \n" + str(exampleList.json()) )


except Exception as e: 
	print(e)



