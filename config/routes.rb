Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }
  root to: 'songs#unfinished_songs'
  resources :users
  resources :songs
end
