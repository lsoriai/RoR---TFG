json.extract! peticion, :id, :user1, :user2, :estado, :created_at, :updated_at
json.url peticion_url(peticion, format: :json)
