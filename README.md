# ATP Docker 
Sample Scripts to get started with Oracle's OCI SDK & CLI. Packaged with love in one Docker image. 


## About
Try out the Oracle Cloud Infrastructure Java SDK! I've tried to make this as simple as possible, but to *reallly* use the SDK you must read the docs! For developing with the `java` SDK read the java sdk docs, but if all you want to do is run this app you can get by with the SDK/CLI configuration docs. They will walk you through getting the required values to authenticate. 

- java sdk docs https://docs.cloud.oracle.com/iaas/Content/API/SDKDocs/javasdk.htm 
- download the java sdk https://github.com/oracle/oci-java-sdk/releases 
- sdk/cli config docs https://docs.cloud.oracle.com/iaas/Content/API/Concepts/sdkconfig.htm 
- Download SQLcl https://www.oracle.com/technetwork/developer-tools/sqlcl/overview/index.html 

### Example Scripts 

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

```bash
/opt/oracle/tools/oci

# Example OCI-SDK Java App
/opt/oracle/tools/java/sdk/ATPJava

# Example OCI-SDK Python App
/opt/oracle/tools/python/sdk/ATPPython

# Example OCI Nodejs App
/opt/oracle/tools/node/ATPNode

```


## Running 

### W/ Docker
To run you'll need to get those values and make sure that you've got Docker installed

1. make    `~/.oci/config`
2. fill with values *
3. generate key `openssl genrsa -out ~/.oci/oci_api_key.pem 2048` *
4. make public key *
5. add public key to tenancy *
1. download dependencies (instantClient, sqlcl, ojdbc8, sqlplus, picocli)
6. build the docker image with `docker build -t oci .`
7. run the docker container with `docker run -it oci bash`
1. copy your `~/.oci/config` to your container by running the command 
```bash
docker cp ~/.oci <CONTAINER_NAME>:~
```
8. play with the example scripts! the container has the text editor `nano`


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
- https://github.com/sblack4/ATP-REST-Java
