# coding: utf-8
require 'json'
require_relative 'post_dao'
require_relative 's3_helper'

class Blog

  def initialize
    @post_dao = PostDAO.new
    @s3_helper = S3Helper.new
  end

  # Add new entry to dynamo
  # Create S3 object
  # Return pre-signed S3 URL for PUT
  # If title already exists, return a fresh signed URL
  def create_post(event:, context:)
    post_title = event["body"]["title"]
    return lambda_response(statusCode: 400, body: {message: 'Unable to create post. Check your request'}) if !post_title
    begin
      id = @post_dao.create_post(title: post_title)
      url = @s3_helper.signed_put_url(key: id)
    rescue StandardError => error
      puts "create_post failed with the following error: #{error.message}"
      return lambda_response(statusCode: 500, body: {message: error.message})
    end

    lambda_response(
      statusCode: 200,
      body: { request_url: url }
    )
  end

  def get_posts(event:, context:)
    ddb_posts = @post_dao.get_posts
    begin
      ddb_posts.each do |p|
        post_markdown = @s3_helper.get_object_content(name: p['id'])
        byebug
        p[:markdown] = post_markdown
      end
    rescue StandardError => error
      puts "get_posts failed with the following error: #{error.message}"
      return lambda_response(statusCode: 500, body: {message: error.message})
    end

    lambda_response(
      statusCode: 200,
      body: { posts: ddb_posts }
    )
  end

  def lambda_response(statusCode:, body:)
    {
      statusCode: statusCode,
      headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
      body: body.to_json
    }
  end
  
end
