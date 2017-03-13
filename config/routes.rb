Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  #get '/' => redirect("http://localhost:5100")
  root to: 'staitc#index'
  resources :news_page, only: [:index, :create]
end
