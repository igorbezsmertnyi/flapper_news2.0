# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Rewrite do
  rewrite %r{^(?!.*(api|\.)).*$}, '/index.html'
end

require ::File.expand_path('../config/environment',  __FILE__)
run Rails.application
