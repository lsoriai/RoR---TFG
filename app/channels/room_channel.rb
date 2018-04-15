class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak (data)
  	#Cuando se escribe un mensaje este lo almacenamos en la base de datos, 
  	#para que sean persistentes y podemos mostrarlos en la ventana del chat
  	Message.create! content: data['message']
    #@message = Message.new({
    # :content => data['message'],
    # :user => current_user.username
    # });
    #@message.save
  end
end
