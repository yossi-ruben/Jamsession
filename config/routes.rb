Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }

  root to: 'songs#unfinished_songs'
  
  resources :users

  resources :songs
  get 'songs/:id/info', to: 'songs#info'

  root 'app#index'

end
