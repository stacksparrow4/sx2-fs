#!/bin/bash

scripts/build.sh && \
scripts/push.sh && \
scripts/k8s.sh