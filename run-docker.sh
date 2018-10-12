#!/bin/bash 


DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

OCI_DIR="$DIR/.oci"
WALLET_DIR="$DIR/wallet*"
BOOL_BUILD=0 # 1 to build

function getOciDir() {
    if [ ! -e ${OCI_DIR} ]; then
        echo "please enter the directory for your oci configuration"
        read OCI_DIR
    fi
}

function getWalletDir() {
    if [ ! -e ${WALLET_DIR[1]} ]; then 
        echo "please enter the wallet directory"
        read WALLET_DIR
    else 
        WALLET_DIR=${WALLET_DIR[1]}
    fi 
}

function main() {
    echo "call using ./run-docker.sh oci_dir wallet_dir"
    
    if [ -z "$1" ]; then
        getOciDir
    else 
        OCI_DIR="$1"
    fi

    if [ -z "$2" ]; then 
        getWalletDir
    else 
        WALLET_DIR="$2"
    fi

    if [ $BOOL_BUILD -eq 1 ]; then
        docker build -t openworld .
    fi

    docker run \
        -it \
        -v "$OCI_DIR":/root/.oci \
        -v "$WALLET_DIR":/opt/oracle/database/wallet \
        -p 3050:3050 \
        -l openworld \
        openworld:latest \
        bash

}


main "$@"