Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :news_page, only: [:index, :create, :update, :destroy]
end
