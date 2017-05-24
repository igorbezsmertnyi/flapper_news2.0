Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :news_page, only: [:index, :show, :create, :update, :destroy] do
        resources :news_comments, only: [:create, :index, :destroy]

        member do
          put '/upvote' => 'news_page#upvote'
          put '/disupvote' => 'news_page#disupvote'
        end
      end

      resources :registration, only: :create
      resources :sessions, only: [:create, :destroy]

      post '/validate_token' => 'sessions#validate_token'

      post '/upload_content_image' => 'post_content_image#image_upload'
      delete '/delete_content_image/:id' => 'post_content_image#image_remove'
    end
  end

end
