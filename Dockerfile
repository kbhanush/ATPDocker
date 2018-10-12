FROM oraclelinux:7-slim

MAINTAINER oracle

# ==========================================
# install JDK 
RUN yum -y install java-1.8.0-openjdk wget && rm -rf /var/cache/yum
ENV JAVA_HOME /usr/lib/jvm/java-openjdk

# ==========================================
# Install from yum
RUN echo "Installing EPEL, python-pip, unzip, libaio, oci_cli, requests, cx_Oracle"  && \
    yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm && \
    yum -y install python-pip &&\
    yum -y install unzip && \
    yum -y install libaio && \ 
    yum -y install nodejs npm --enablerepo=epel && \
    yum -y install git && \
    yum -y install nano && \
    yum clean all


# install from pip
RUN echo 'installing oci_cli, requests, cx_Oracle' && \
    pip install oci_cli requests cx_Oracle

# ==========================================
# Setup oracle instant client and sqlcl
ENV SQLPLUS oracle-instantclient12.2-sqlplus-12.2.0.1.0-1.x86_64.rpm
ENV SQLCL sqlcl-18*.zip
ENV INSTANT_CLIENT oracle-instantclient12.2-basic-12.2.0.1.0-1.x86_64.rpm

WORKDIR /opt/oracle/lib
ADD ${INSTANT_CLIENT} ${SQLCL} ${SQLPLUS} ./
RUN echo "Installing instant client........" && \
   rpm -ivh ${INSTANT_CLIENT} && \
   echo "Installing SQL*Plus..........." && \
   rpm -ivh ${SQLPLUS} && \
   unzip ${SQLCL} && \
   rm ${INSTANT_CLIENT} ${SQLPLUS} ${SQLCL} && \
   mkdir -p /opt/oracle/database/wallet && \
   mkdir -p /opt/oracle/tools/oci

#set env variables
ENV ORACLE_BASE /opt/oracle/lib/instantclient_12_2
ENV LD_LIBRARY_PATH /usr/lib/oracle/12.2/client64/lib/:$LD_LIBRARY_PATH
ENV TNS_ADMIN /opt/oracle/database/wallet/
ENV ORACLE_HOME /opt/oracle/lib/instantclient_12_2
ENV PATH $PATH:/usr/lib/oracle/12.2/client64/bin:/opt/oracle/lib/sqlcl/bin

# ==========================================
# add wallet and .oci dir
# TODO: change to volume command 
ENV WALLET_DIRECTORY wallet_REALAPPLICATI.zip
WORKDIR /opt/oracle/database/wallet

#ADD ${WALLET_DIRECTORY} /opt/oracle/database/wallet/
#RUN ls /opt/oracle/database/wallet/ && \
#    unzip wallet_REALAPPLICATI.zip && \
#    sed -i s~"?/network/admin"~"/opt/oracle/database/wallet"~g /opt/oracle/database/wallet/sqlnet.ora


# ==========================================
# install node app
WORKDIR /opt/oracle/tools/nodejs
RUN mkdir sdk apps
# Get the ATPConnectionTest node app
WORKDIR /opt/oracle/tools/nodejs/apps
RUN git clone https://github.com/kbhanush/ATPConnectionTest && \
    mv ATPConnectionTest/* . && \
    rm -r ATPConnectionTest
EXPOSE 3050


# ==========================================
# install Sample apps - Java SDK sample 
ENV JAVA_APP /opt/oracle/tools/java/sdk
WORKDIR ${JAVA_APP}
RUN wget --content-disposition https://github.com/sblack4/ATPJava/blob/master/ATPJava.zip?raw=true && \
    unzip ATPJava.zip && \
    rm ATPJava.zip && \
    mkdir lib && \
    wget http://central.maven.org/maven2/info/picocli/picocli/3.6.1/picocli-3.6.1.jar -P lib
WORKDIR ${JAVA_APP}/lib
ENV PATH $PATH:${JAVA_APP}/bin

# install Java SDK 
# lib/ contains libraries & third-party/lib contains dependencies
WORKDIR ${JAVA_APP}
ADD https://github.com/oracle/oci-java-sdk/releases/download/v1.2.47/oci-java-sdk.zip .
RUN mkdir java-sdk && \
    mv oci-java-sdk.zip java-sdk && \
    cd java-sdk && \
    unzip oci-java-sdk.zip && \
    mv lib/*.jar ../lib && \
    mv third-party/lib/*.jar ../lib && \
    cd .. && \
    rm -rf java-sdk

# install Java JDBC
ENV JDBC_DIR ${JAVA_APP}/lib
WORKDIR ${JDBC_DIR}
RUN wget --content-disposition https://github.com/sblack4/ojdbc8-full/blob/master/ojdbc8-full.tar.gz?raw=true
RUN tar xvzf ojdbc8-full.tar.gz && \
    mv ojdbc8-full/* .

# ==========================================
# Python SDK sample app, also setup for OCI-CLI bash scripts
ENV PYTHON_APP /opt/oracle/tools/python/sdk
WORKDIR ${PYTHON_APP}
RUN git clone https://github.com/dannymartin/ATPPython.git && \
   mv ATPPython/python/sdk/* . && \
   mv ATPPython/oci/* /opt/oracle/tools/oci/ && \
   mkdir ../apps && \
   mv exampleConnection.py sales.csv ../apps && \
   rm -r ATPPython
ENV PATH $PATH:${PYTHON_APP}/

# ==========================================
# Node REST calls sample app
ENV NODE_APP /opt/oracle/tools/nodejs/sdk
WORKDIR ${NODE_APP}
RUN git clone https://github.com/kbhanush/ATP-REST-nodejs.git && \
    mv ATP-REST-nodejs/* . && \
    rm -r ATP-REST-nodejs && \
    node -v && \
    npm -v && \
    npm install -g oracledb http-signature jssha && \
    npm install
ENV PATH $PATH:${NODE_APP}


# Uninstall packages
RUN echo "Cleaning up yum packages........................." && \
    yum -y remove unzip && \
    yum -y remove wget && \
    yum -y remove git
   