require "rubygems"
require "sinatra"
require "json"
require "haml"
require File.expand_path(File.dirname(__FILE__) + '/lib/quote')

get '/' do
  haml :index
end

get '/update' do
  content_type :json
  quote = Quote.extract! params[:q]
  quote.to_json
end