class CreateGames < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.references :user, foreign_key: true
      t.references :user_2, foreign_key: true
      t.integer :result
      t.string :description
      t.string :name

      t.timestamps
    end
  end
end
