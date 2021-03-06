class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessor :login

  validates :username,
		    :presence => true,
		    :uniqueness => {
		      :case_sensitive => false
		    } 
  #No permite que el nombre de usuario tenga @ para que no ingresen un mail
  validates_format_of :username, with: /^[a-zA-Z0-9_\.]*$/, :multiline => true

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_hash).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    elsif conditions.has_key?(:username) || conditions.has_key?(:email)
      where(conditions.to_hash).first
    end
  end

  has_many :games
  has_many :games_2, class_name: Game, foreign_key: :user_2_id
  has_many :movements, through: :games
  has_many :peticions
  has_and_belongs_to_many :opponents, join_table: 'games', class_name: User, association_foreign_key: :user_id
  has_and_belongs_to_many :opponents_2, join_table: 'games', class_name: User, association_foreign_key: :user_2_id

end
