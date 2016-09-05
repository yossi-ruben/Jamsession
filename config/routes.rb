Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'registrations'}


  root to: 'songs#home_page'

  resources :users
  get 'users/:id/info', to: 'users#info'


  resources :songs
  get 'songs/:id/info', to: 'songs#info'
  get '/unfinished_songs', to: 'songs#unfinished_songs'
  get '/finished_songs', to: 'songs#finished_songs'

  resources :feature_tracks, only: :create
  resources :master_tracks, only: :create
  resources :comments, only: :create
  resources :likes, only: :create
  delete '/likes', to: 'likes#destroy'

  get 'new_genres_talents', to: 'talents#new_genres_talents'
  post 'registrations/genres_talents', to: 'registrations#create_genres_talents'

end
