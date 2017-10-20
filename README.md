== README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


Please feel free to use a different markup language if you do not plan to run
<tt>rake doc:app</tt>.


## Instructions

rails generate migration add_data_to_users first_name:string last_name:string avatar:attachment


rails generate migration create_games user:references user_2:references result:integer description:string name:string


rails generate model games user:references user_2:references result:integer description:string name:string
rails generate controller Games


rails generate scaffold movement game:references n_mov:integer figure:string cord:integer color:string