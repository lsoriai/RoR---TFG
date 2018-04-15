class Message < ApplicationRecord
	#Con este sentencia indicamos que se realice el proceso una vez que se
	#haya almacenado el mensaje en la base de datos de forma correcta
	#el trabajo que vamos a realizar es MessageBroadcastJob (controlador)
	#que se ejecutará cuando la cola d elos procesos esté vacía
	#esto s elo indicamos con el perform_later
	after_create_commit { MessageBroadcastJob.perform_later self }
	belongs_to :user
end
