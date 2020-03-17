require 'aws-sdk'
require 'byebug'

class S3Helper

  def initialize
    @s3 = Aws::S3::Resource.new({region: 'us-east-1'})
    @posts_bucket_name = 'posts-scotty-dot-dance'
  end

  def signed_put_url(key:) 
    bucket = @s3.bucket(@posts_bucket_name)
    object = bucket.object(key)
    object.presigned_url(:put)
  end

  def get_object_content(name:)
    content = "Nothing here."
    bucket = @s3.bucket(@posts_bucket_name)
    resp = bucket.object(name).get.body.read
    content = resp unless resp.nil? || resp.empty?
    content
  end
  
end
