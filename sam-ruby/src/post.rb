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
  validates_format_of :object_key, with: /\A[a-zA-Z0-9_-]*\.md\z/, message: 'Filename must be url safe and end with .md.'

end
