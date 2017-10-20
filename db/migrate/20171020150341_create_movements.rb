class CreateMovements < ActiveRecord::Migration[5.1]
  def change
    create_table :movements do |t|
      t.references :game, foreign_key: true
      t.integer :n_mov
      t.string :figure
      t.integer :cord
      t.string :color

      t.timestamps
    end
  end
end
