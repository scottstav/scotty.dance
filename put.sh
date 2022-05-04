#!/bin/bash

# run this after you've done org publish my-website
# this should live in init.el eventually

# in case anything was manually uploaded to s3
aws s3 cp --recursive s3://scotty.dance/media/ ~/public_html/tmp_merge
cp ~/public_html/tmp_merge/* ~/public_html/media/
rm -r ~/public_html/tmp_merge

aws s3 cp ~/public_html/ s3://scotty.dance --recursive --profile personal
aws cloudfront create-invalidation --distribution-id EOLU1AIPLIWAZ  --paths '/*' --profile personal
