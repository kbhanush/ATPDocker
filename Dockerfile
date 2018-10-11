FROM oraclelinux:7-slim

MAINTAINER oracle

RUN yum -y install java-1.8.0-openjdk wget && rm -rf /var/cache/yum

ENV JAVA_HOME /usr/lib/jvm/java-openjdk

#Set Wallet Directory
ENV WALLET_DIRECTORY wallet_DANNY

ADD ${WALLET_DIRECTORY} /opt/oracle/database/wallet/
RUN ls /opt/oracle/database/wallet/ && \
    sed -i s~"?/network/admin"~"/opt/oracle/database/wallet"~g /opt/oracle/database/wallet/sqlnet.ora

# Installing python pip

RUN echo "Installing EPEL, python-pip, unzip, libaio, oci_cli, requests, cx_Oracle"  && \
    yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm && \
    yum -y install python-pip &&\
    yum -y install unzip && \
    yum -y install libaio && \ 
    yum -y install nodejs npm --enablerepo=epel && \
    yum -y install git && \
    yum -y install nano && \
    yum clean all

    
RUN echo 'installing oci_cli, requests, cx_Oracle' && \
    pip install oci_cli requests cx_Oracle


# Setup folder structure

# Setup oracle instant client and sqlcl


ENV SQLPLUS oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.rpm

#ENV SQLCL sqlcl-18.2.0.zip
ENV SQLCL sqlcl-18.3.0.259.2029.zip

ENV INSTANT_CLIENT oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm
# ENV NODEJS node-v8.12.0-linux-x64.tar.xz

# set working directory
WORKDIR /opt/oracle/lib
# Add instant client, sqlcl and sqlplus rpm's to image
ADD ${INSTANT_CLIENT} ${SQLCL} ${SQLPLUS} ./
RUN echo "Installing instant client........" && \
   rpm -ivh ${INSTANT_CLIENT} && \
   echo "Installing SQL*Plus..........." && \
   rpm -ivh ${SQLPLUS} && \
   unzip ${SQLCL} && \
   rm ${INSTANT_CLIENT} ${SQLPLUS} ${SQLCL} && \
   mkdir -p /opt/oracle/database/wallet

#set env variables
#ENV ORACLE_BASE /opt/oracle/lib/instantclient_12_2
ENV LD_LIBRARY_PATH /usr/lib/oracle/12.2/client64/lib/:$LD_LIBRARY_PATH
ENV TNS_ADMIN /opt/oracle/database/wallet/
#ENV ORACLE_HOME /opt/oracle/lib/instantclient_12_2
ENV PATH $PATH:/usr/lib/oracle/12.2/client64/bin:/opt/oracle/lib/sqlcl/bin

WORKDIR /opt/oracle/tools/nodejs
RUN mkdir sdk apps

# Get the ATPConnectionTest node app
WORKDIR /opt/oracle/tools/nodejs/apps
RUN git clone https://github.com/kbhanush/ATPConnectionTest && \
    mv ATPConnectionTest/* . && \
    rm -r ATPConnectionTest
EXPOSE 3050

# install Java SDK 
# in /opt/oracle/tools/java/sdk
# lib/ contains libraries & third-party/lib contains dependencies
WORKDIR /opt/oracle/tools/java/sdk
ADD https://github.com/oracle/oci-java-sdk/releases/download/v1.2.47/oci-java-sdk.zip .
RUN unzip oci-java-sdk.zip && \
    rm oci-java-sdk.zip

# install JDBC 
# in /opt/oracle/tools/java
ENV JDBC_DIR /opt/oracle/tools/java
WORKDIR ${JDBC_DIR}

#Local
#ADD ojdbc8-full.tar.gz .


# Sample apps - Java, Python, Node
# in /opt/oracle/apps/<app_name>
# Java 
ENV JAVA_APP /opt/oracle/tools/java/sdk/ATPJava
# WORKDIR ${JAVA_APP}
# RUN git clone https://github.com/sblack4/ATP-REST-Java.git ATPJava && \
#     cd ATPJava && \
#     mkdir lib
WORKDIR ${JAVA_APP}
RUN wget --content-disposition https://github.com/sblack4/ATP-REST-Java/blob/master/ATPJava.tar.gz?raw=true && \
    tar xvzf ATPJava.tar.gz && \
    mkdir lib && \
    wget http://central.maven.org/maven2/info/picocli/picocli/3.6.1/picocli-3.6.1.jar -P lib
WORKDIR ${JAVA_APP}/lib

ENV PATH $PATH:${JAVA_APP}/bin

# Python
ENV PYTHON_APP /opt/oracle/tools/python/sdk
WORKDIR ${PYTHON_APP}
RUN git clone https://github.com/dannymartin/ATPPython.git && \
   mv ATPPython/python/sdk/* . && \
   mkdir ../apps && \
   mv exampleConnection.py sales.csv ../apps && \
   rm -r ATPPython
ENV PATH $PATH:${PYTHON_APP}/

# Node 
ENV NODE_APP /opt/oracle/tools/nodejs
WORKDIR ${NODE_APP}
RUN git clone https://github.com/kbhanush/ATP-REST-nodejs.git && \
    mv ATP-REST-nodejs/* sdk/ && \
    rm -r ATP-REST-nodejs && \
    cd sdk && \
    npm install -g oracledb http-signature jssha && \
    npm install


ENV PATH $PATH:${NODE_APP}/


# Uninstall packages
RUN echo "Cleaning up yum packages........................." && \
    yum -y remove unzip && \
    yum -y remove wget && \
    yum -y remove git
   