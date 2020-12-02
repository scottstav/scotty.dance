#!/bin/bash

aws s3 cp ~/public_html/ s3://scotty.dance --recursive --profile personal
aws cloudfront create-invalidation --distribution-id EOLU1AIPLIWAZ  --paths '/*' --profile personal
