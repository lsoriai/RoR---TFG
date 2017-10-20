class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
  	# Con esta funcion especificamos cuales son los parámetros que debemos de
  	# pasar al modelo (BD). Entonces estamos permitiendo que se guarde en nuestra
  	# base de datos el nombre de usuario, el email, contraseña, contraseña confirmada, 
  	# el remember (tick)
  	# Las siguiente lineas vienen a significar lo mismo: que permite que se almacenen
  	# datos de autenticacion de contraseña y confirmación de contraseña y el otro
  	# el current-pasword

  	# A esto se le llama PARAMETROS FUERTES --> BUSCAR??
  	# Este código prohiben los parámetros de Action Controller así que has de ser
  	# consciente de que parámetros estás permitiendo recordar en el módulo de tal manera
  	# que no permitas las ex...

  	# REFERENCIA --> http://devise.plataformatec.com.br/

    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
  
end