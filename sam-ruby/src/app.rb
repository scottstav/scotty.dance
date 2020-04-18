# coding: utf-8
require 'aws-sdk-ec2'
require 'aws-sdk-s3'
require 'net/ssh'
require_relative 'post'

module PostController

  def self.create(event:, context:)
    post_title = JSON.parse(event['body'])['title']
    filename = JSON.parse(event['body'])['filename']

    return lambda_response(statusCode: 400, body: {message: 'Unable to create post. Check your request'}) if !post_title || !filename
    posts = Post.where(title: post_title)
    if posts.count != 0
      return lambda_response(statusCode: 200, body: {message: 'That title already exists.'})
    end
    posts = Post.where(object_key: filename)
    if posts.count != 0
      return lambda_response(statusCode: 200, body: {message: 'A file with this name is already posted. Move this copy to the public folder to update.'})
    end

    post = Post.new title: post_title, object_key: filename
    return lambda_response(statusCode: 500, body: {message: "#{filename} does not yet exist in S3, have you moved it to the public folder?"}) if post.get_object_content.nil? || post.get_object_content.empty?
    begin
      post.save
    rescue => e
      return lambda_response(statusCode: 500, body: {message: e.message})
    end

    lambda_response(
      statusCode: 200,
      body: {
        id: post.id,
        filename: filename,
        title: title,
        message: "Successfully published file #{filename} with title #{title}."
      }
    )
  end

  def self.delete(event:, context:)
    id = event.dig('pathParameters', 'id')
    if id
      Post.where(id: id).delete_all
      return lambda_response(statusCode: 200, body: { message: "Successfully deleted post with id #{id}." })
    end

    lambda_response(
      statusCode: 403,
      body: { message: "No id provided to delete." }
    )
  end

  def self.get(event:, context:)
    id = event.dig('pathParameters', 'id')
    if id
      post = Post.find(id)
      return lambda_response(statusCode: 200, body: { post: post })
    end

    begin
      posts = Post.where(post_type: Post::POST_TYPE_DEFAULT).all
    rescue StandardError => error
      puts "get_posts failed with the following error: #{error.message}"
      return lambda_response(statusCode: 500, body: {message: error.message})
    end

    lambda_response(
      statusCode: 200,
      body: { posts: posts }
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

module MinecraftServerController

  def self.start(event:, context:)
    ec2 = Aws::EC2::Resource.new(region: 'us-east-1')
    id = 'i-0b80db091f023a205'
    i = ec2.instance(id)
    if i.exists?
      puts "State: #{i.state.name}"
      case i.state.code
      when 0
        puts "#{id} is pending, so it will be running in a bit"
      when 16
        puts "#{id} is already started"
      when 48
        puts "#{id} is terminated, so you cannot start it"
      else
        i.start
      end
    end

    lambda_response(
      statusCode: 200,
      body: {
        ip: "minecraft.scotty.dance"
      }
    )
  end

  def self.state(event:, context:)
    s3 = Aws::S3::Client.new
    ec2 = Aws::EC2::Resource.new(region: 'us-east-1')
    id = 'i-0b80db091f023a205'
    i = ec2.instance(id)
    state = "unknown"
    players = "unknown"
    if i.exists?
      case i.state.code
      when 0
        puts "#{id} is pending, so it will be running in a bit"
      when 16
        puts "#{id} is already started, fetching users."
        # Fetch user info
        s3.get_object({ bucket:'keys-scotty-dot-dance', key:'minecraft_server.pem' }, target: '/tmp/key.pem')

        Net::SSH.start("minecraft.scotty.dance", "ec2-user", keys: "/tmp/key.pem") do |ssh|
          ssh.exec!('tmux send -t minecraft.0 "list" C-m')
          sleep 2
          players = ssh.exec!('cat /home/ec2-user/minecraft_server/logs/latest.log | grep "There are" | tail -1')
          puts players
        end
      when 48
        puts "#{id} is terminated, so you cannot start it"
      else
        puts "#{id} is stopped"

      end
      state = i.state.name
    end

    lambda_response(
      statusCode: 200,
      body: {
        state: state,
        players: players
      }
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
