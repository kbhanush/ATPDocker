
# OCI PYTHON

These scripts are intended to help any python developer get started connecting to Oracle Autonomous Database, as well as easily creating, updating, restoring, starting, stopping, etc. Follow the instructions to use the scripts already created here. Feel free to go into the code and learn for yourself as you get started.

# Getting Started

Open up your oci-config file to ensure that you have the correct information in place in order to get started

### **SETUP**: OCI-CONFIG


-	Below is an example oci-config file. It is standard practice to leave all variables in this file lowercase. Notice the compartment variable is added. This variable is necessary in order to proceed. This is the only place you need to specify the compartment ID or the region as the python scripts will pick up everything else themselves

```

  [DEFAULT]
  user=ocid1.user.oc1..aaaaaaaa4tfljmeejbutmrydmms62ooqdl2ay4x52m2xutb35nylnn6vupja
  fingerprint=d3:5b:36:21:2e:82:4b:b2:cf:de:31:4f:df:f2:ba:ad
  key_file=./oci_api_key.pem
  tenancy=ocid1.tenancy.oc1..aaaaaaaawrgt5au6hbledhhyas2secm3q2atqiuvihck45rbi3jyc5tfyfga
  region=us-phoenix-1
  compartmentId=ocid1.tenancy.oc1..aaaaaaaawrgt5au6hbledhhyas2secm3q2atqiuvihck45rbi3jyc5tfyfga



```

### **EXAMPLES**:

**Create Database**

```

python3 createAutonomousDatabase.py databaseName displayName password cpuCoreCount storageSizeInTBs

```

**Delete Database**

```

python3 deleteAutonomousDatabase.py databaseOCID

```

**Get Database**

```

python3 getAutonomousDatabase.py databaseOCID

```

**List Database**

```

python3 listAutonomousDatabase.py

```

**Start Database**

```

python3 startAutonomousDatabase.py databaseOCID

```

**Stop Database**

```

python3 stopAutonomousDatabase.py databaseOCID

```

**Update Database**

```

python3 updateAutonomousDatabase.py databaseOCID cpuCoreCount storageSizeInTBs

```

**Restore Database**

```

python3 restoreAutonomousDatabase.py databaseOCID timestamp

```


### **More Information**:

- [Autonomous Database REST API Information](https://docs.cloud.oracle.com/iaas/api/#/en/database/20160918/AutonomousDatabase/)

- [Database Python SDK](https://oracle-cloud-infrastructure-python-sdk.readthedocs.io/en/latest/api/database.html)
