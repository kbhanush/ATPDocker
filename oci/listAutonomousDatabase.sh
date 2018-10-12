#!/bin/bash


# supply compartment id 
oci db autonomous-database list -c "$@"

