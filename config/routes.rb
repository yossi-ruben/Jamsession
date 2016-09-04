Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'users/sessions' }


  root to: 'songs#home_page'

  resources :users
  get 'users/:id/info', to: 'users#info'

  resources :songs
  get 'songs/:id/info', to: 'songs#info'
  get '/unfinished_songs', to: 'songs#unfinished_songs'
  get '/finished_songs', to: 'songs#finished_songs'

  root 'app#index'

end
