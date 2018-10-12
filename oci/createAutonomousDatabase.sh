#!/bin/bash


# Usage: oci db autonomous-database create [OPTIONS]
# Error: Missing option(s) --admin-password, --compartment-id, --cpu-core-count, --data-storage-size-in-tbs, --db-name.

oci db autonomous-database create "$@"

