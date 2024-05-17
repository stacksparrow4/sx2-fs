#!/bin/bash

kubectl delete -k . && \
kubectl apply -k .