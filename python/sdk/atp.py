import requests
from oci.signer import Signer

import regions

"""
Helper method for auth
"""
def atpSign(config):
	auth = Signer(
	    tenancy=config['tenancy'],
	    user=config['user'],
	    fingerprint=config['fingerprint'],
	    private_key_file_location=config['key_file'],
	    pass_phrase=config['pass_phrase']
	)

	return auth

"""
createAutonomousDatabase

Create an ATP instance given the config, endpoint from regions.py and body

Returns ID of the created ATP instance

TODO: verify body params are correct
"""
def createAutonomousDatabase(config, body):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/"

	try:
		response = requests.post(endpoint, json=body, auth=auth)
		response.raise_for_status()
	except Exception as e: 
		print(e)

	return response


"""
deleteAutonomousDatabase

Deletes an ATP instance given the autonomousDatabaseId

"""
def deleteAutonomousDatabase(config, autonomousDatabaseId):


	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId

	try:
		response = requests.delete(endpoint, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response


"""
getAutonomousDatabase

Retrieves an ATP instance given the autonomousDatabaseId

"""
def getAutonomousDatabase(config, autonomousDatabaseId):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId

	try:
		response = requests.get(endpoint, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response


"""
listAutonomousDatabase

Lists all ATP instances

"""
def listAutonomousDatabase(config):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases?compartmentId=" + config['compartmentid']

	try:
		response = requests.get(endpoint, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response


"""
restoreAutonomousDatabase

Restores an ATP instance given the autonomousDatabaseId and time to restore

TODO: verify time is in the past

"""
def restoreAutonomousDatabase(config, autonomousDatabaseId, restoreTime):

	#Set the auth
	auth = atpSign(config)

	body= { "timestamp": restoreTime }

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId + "/actions/restore"

	try:
		response = requests.post(endpoint, json=body, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response


"""
startAutonomousDatabase

Starts an ATP instance given the autonomousDatabaseId

"""
def startAutonomousDatabase(config, autonomousDatabaseId):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId + "/actions/start"

	try:
		response = requests.post(endpoint, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response

"""
stopAutonomousDatabase

Stops an ATP instance given the autonomousDatabaseId

"""
def stopAutonomousDatabase(config, autonomousDatabaseId):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId + "/actions/stop"

	try:
		response = requests.post(endpoint, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response


"""
updateAutonomousDatabase

Updates an ATP instance given the autonomousDatabaseId, and the body params

TODO: add check for body params are all correct
"""
def updateAutonomousDatabase(config, body, autonomousDatabaseId):

	#Set the auth
	auth = atpSign(config)

	#set the endpoint
	endpoint = "https://" + regions.autonomousDatabase[config["region"]] + "/20160918/autonomousDatabases/" + autonomousDatabaseId

	try:
		response = requests.put(endpoint, json=body, auth=auth)
		response.raise_for_status()
	#Should be more specific with exception
	except Exception as e: 
		print(e)

	return response



