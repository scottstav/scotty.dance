class Post
  attr_accessor :id, :title, :created, :object_key

  def initialize(id, title, created, object_key)
    @id = id
    @title = title    
    @created = created
    @object_key = object_key
  end
end
