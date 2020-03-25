require 'dynamoid'
class BaseAppRecord
  include Dynamoid::Document

  Dynamoid.configure do |config|
    config.namespace = nil
  end
end
