require 'aws-sdk'

module PostHelper

  def self.patherize(str)
    str.downcase.gsub(/\s+/, '_').gsub(/[^a-z_0-9]/, '')
  end
end
