class CreatePeticions < ActiveRecord::Migration[5.1]
  def change
    create_table :peticions do |t|
      t.references :user1
      t.references :user2
      t.boolean :estado, default: false

      t.timestamps
    end
  end
end
