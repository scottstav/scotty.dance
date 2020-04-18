require 'aws-sdk-s3'

module S3Helper

  POSTS_BUCKET_NAME = 'posts.scotty.dance'

  def s3
    @s3 ||= Aws::S3::Resource.new
    @s3
  end

  def touch_object
    bucket = s3.bucket(POSTS_BUCKET_NAME)
    bucket.put_object(key: self.object_key)
  end

  def signed_put_url
    bucket = s3.bucket(POSTS_BUCKET_NAME)
    object = bucket.object(self.object_key)
    object.presigned_url(:put)
  end

  def get_object_content
    content = ""
    bucket = s3.bucket(POSTS_BUCKET_NAME)
    resp = bucket.object(self.object_key).get.body.read
    content = resp unless resp.nil? || resp.empty?
    content
  end

end
