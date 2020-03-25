# coding: utf-8
require_relative 'post'

module PostController

  def self.create(event:, context:)
    post_title = JSON.parse(event['body'])['title']

    return lambda_response(statusCode: 400, body: {message: 'Unable to create post. Check your request'}) if !post_title
    posts = Post.where(title: post_title)
    if posts.count != 0
      return lambda_response(statusCode: 200, body: {message: 'That title already exists.'})
    end

    post = Post.new title: post_title
    return lambda_response(statusCode: 500, body: {message: 'Failed to save.'}) unless post.save

    lambda_response(
      statusCode: 200,
      body: {
        id: post.id
      }
    )
  end

  def self.edit(event:, context:)
    id = event.dig('pathParameters', 'id')
    return lambda_response(statusCode: 401, body: {message: 'Please pass id  to edit.'}) unless id
    post = Post.find(id)

    lambda_response(
      statusCode: 200,
      body: {
        put_url: post.signed_put_url
      }
    )
  end

  def self.get(event:, context:)
    id = event.dig('pathParameters', 'id')
    if id
      post = Post.find(id)
      post.markdown = post.get_object_content
      return lambda_response(statusCode: 200, body: { post: post })
    end

    begin
      posts = Post.where(post_type: Post::POST_TYPE_DEFAULT).all
      r = posts.map { |p|
        p.markdown = p.get_object_content
        p
      }
    rescue StandardError => error
      puts "get_posts failed with the following error: #{error.message}"
      return lambda_response(statusCode: 500, body: {message: error.message})
    end

    lambda_response(
      statusCode: 200,
      body: { posts: r }
    )
  end

  def self.lambda_response(statusCode:, body:, encode: true)
    json_body = encode ? body.to_json : JSON.dump(body)
    {
      statusCode: statusCode,
      headers: {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"},
      body: json_body
    }
  end

end
