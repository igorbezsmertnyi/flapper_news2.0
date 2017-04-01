Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :news_page, only: [:index, :show, :create, :update, :destroy] do
    resources :news_comments, only: [:create, :index]
  end

end
