require 'aws-sdk'
require_relative 'post'

class PostDAO

  def initialize
    @ddb = Aws::DynamoDB::Client.new({region: 'us-east-1'})
    @post_type_index = "post_type-index"
  end
  
  def get_posts
    puts "Queryings posts table for default posts"
    @ddb.query(
      {
        table_name: "posts",
        index_name: @post_type_index,
        key_condition_expression: "#post_type = :pt",
        expression_attribute_names: {
          "#post_type" => "post_type"
        },
        expression_attribute_values: {
          ":pt" => "default" 
        }
      }
    ).items
  end

  def create_post(title:)
    id = patherize(title)
    puts "Creating a new post with title #{title} and id #{id}"
    begin
      @ddb.put_item(item: {
                      "id" => id,
                      "created" => Time.now.to_i,                      
                      "title" => title, 
                      "post_type" => "default",                       
                    },
                    table_name: "posts",
                    condition_expression: "attribute_not_exists(id)"
                   )
      puts "Sucessfully wrote #{id}"
    rescue Aws::DynamoDB::Errors::ConditionalCheckFailedException => c
      puts "#{c.message}: A post with id #{id} probably already exists. Ignoring."
    rescue Aws::DynamoDB::Errors::ServiceError => error
      puts "Failed to create post with id #{id}: #{error}"
      raise error
    end
    id
  end

  def patherize(str)
    str.downcase.gsub(/\s+/, '_').gsub(/[^a-z_0-9]/, '')
  end
end
