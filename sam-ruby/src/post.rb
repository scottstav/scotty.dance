require_relative 'dynamo_record'
require_relative 's3_helper'

class Post < BaseAppRecord
  POST_TYPE_DEFAULT = 'default'

  include S3Helper

  table name: :posts

  field :title
  field :object_key
  field :markdown
  field :post_type, :string, default: POST_TYPE_DEFAULT

  global_secondary_index name: 'post_type-index', hash_key: :post_type, projected_attributes: :all

  validates_presence_of :title

  before_create do
    self.object_key = patherize title
    touch_object
  end
end
