Jienote::Application.routes.draw do
  resources :events, except: [:new]
  resources :items
  resources :texts
  resources :images
  resources :documents


  root  'static_pages#home'
  match '/help',    to: "static_pages#help",    via: 'get'
  match '/team',   to: "static_pages#team",   via: 'get'
  resources :users
  resources :sessions, only: [:new, :create, :destroy]
  match '/signup',  to: 'users#new',            via: 'get'
  match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'

  #facebook auth
  get 'auth/:provider/callback', to: 'users#authin'
  #get 'logout', to: 'sessions#destroy'

  resources :api, :defaults => { :format => 'json' } do
    collection do
      get 'get_html'
      get 'notifications_count'
      get 'check_signin'

      post 'get_html'
      post 'extract_time'
    end
  end

  #constraints subdomain: 'api' do #, 
  scope module: 'api', defaults: {:format => 'json'} do
    namespace :v1 do
      resources :events do
        collection do
        end
      end
      resources :aws do
        collection do
          get :new_params
        end
      end
      resources :qr_codes do
        collection do
          get :new_aws_params
        end
      end
    end
  end
  #namespace :admin do
  #  resources :posts, :comments
  #end
  #resources :posts, module: 'admin'
  
  # If you want to route /posts (without the prefix /admin) to 
  # Admin::PostsController, you could use
  #scope module: 'admin' do
  #  resources :posts, :comments
  #end
  #or 
  #resources :posts, module: 'admin'
  #
  #/admin/posts to PostsController
  #

  

 

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
