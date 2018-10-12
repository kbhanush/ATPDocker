# ATP Docker 
Sample Scripts to get started with Oracle's OCI SDK & CLI. Packaged with love in one Docker image. 

## About
Try out the Oracle Cloud Infrastructure developer tooling! I've tried to make this as simple as possible, but to *reallly* use the SDK you must read the docs! For developing read the appropriate sdk docs, but if all you want to do is run this app you can get by with the SDK/CLI configuration docs. They will walk you through getting the required values to authenticate. 

- java sdk  https://docs.cloud.oracle.com/iaas/Content/API/SDKDocs/javasdk.htm 
- python sdk https://docs.cloud.oracle.com/iaas/Content/API/SDKDocs/pythonsdk.htm
- sdk/cli config docs https://docs.cloud.oracle.com/iaas/Content/API/Concepts/sdkconfig.htm 
- OCI CLI https://github.com/oracle/oci-cli 
- REST API https://docs.cloud.oracle.com/iaas/api/


### Example Scripts 
these are the scripts, try them out with `node <command>.js`, `python <command>.py`, or `<command>` for java :)

For java the [Class Path](https://docs.oracle.com/javase/tutorial/essential/environment/paths.html) can be long I've written shell scripts to make demoing the functionality easier :) 

listed as `COMMAND [-h for help] [arg_1 arg_2 ...]` 

```
createAutonomousDatabase DBNAME DISPLAYNAME PASSWORD CPUCOUNT STORAGEINTBS
deleteAutonomousDatabase DBOCID
getAutonomousDatabase DBOCID
listAutonomousDatabases - no arguments
startAutonomousDatabase DBOCID
stopAutonomousDatabase DBOCID
backupAutonomousDatabase – is not included
restoreAutonomousDatabase DBOCID time
updateAutonomousDatabase CPUCount StorageInTBs DBOCID
```

### Docker Image Contents 

This image has a lot, including  
    - SQLCL
    - SQLPlus
    - OCI CLI 
    - `nano`
    - A bunch of sample apps, listed below

```bash
/opt/oracle/tools/oci

# Example OCI-SDK Java App
/opt/oracle/tools/java/sdk

# Example OCI-SDK Python App
/opt/oracle/tools/python/sdk

# Example OCI Nodejs App
/opt/oracle/tools/nodejs/apps

# REST calls in nodejs
/opt/oracle/tools/nodejs/sdk

```


## Running 

### W/ Docker
To run you'll need to get those values and make sure that you've got Docker installed

1. make    `~/.oci/config`
2. fill with values *
3. generate key `openssl genrsa -out ~/.oci/oci_api_key.pem 2048` *
4. make public key *
5. add public key to tenancy *
1. download dependencies and place in this directory
    - [instantClient](https://www.oracle.com/technetwork/database/database-technologies/instant-client/downloads/index.html) oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.rpm 
    - [sqlcl](https://www.oracle.com/technetwork/developer-tools/sqlcl/downloads/index.html) sqlcl-18.2.0.zip 
    - ojdbc8 (v18.3) https://www.oracle.com/technetwork/database/application-development/jdbc/downloads/index.html 
    - [sqlplus](https://www.oracle.com/technetwork/topics/linuxx86-64soft-092277.html) oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm 
6. build the docker image with `docker build -t oci .`
7. run the docker container with the convenience script `./run-docker.sh`

If you ran the container without mounting the wallet or ~/.oci config file you can copy them to the container like below
```bash
docker cp ~/.oci <CONTAINER_NAME>:/root
```
You will need your wallet file if you want to connect to the database


\* see this but fill it in with your own values :)  
example from https://docs.cloud.oracle.com/iaas/Content/API/Concepts/sdkconfig.htm
```
[DEFAULT]
user=ocid1.user.oc1..aaaaaaaafakeuser
fingerprint=20:3B:97:13:55:1c:5b:0d:d3:37:d8:50:4e:c5:3a:34
key_file=~/.oci/oci_api_key.pem
tenancy=ocid1.tenancy.oc1..aaaaaaaaba3pv6wkcr4jqae5f15p2b2m2yt2j6rx32uzr4h25vqstifsfdsq
region=us-ashburn-1
```


## Thanks 
- https://github.com/kbhanush/ATP-REST-nodejs
- https://github.com/dannymartin/ATPPython
- https://github.com/sblack4/ATPJava
- https://github.com/kbhanush/aOne
- https://github.com/christopherbeck/OCI-Rest-APIs-nodejs 
