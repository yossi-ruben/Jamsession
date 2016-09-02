class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :encrypted_password
      t.string :profile_pic_file_name
      t.string :profile_pic_file_path

      t.timestamps(null: false)
    end
  end
end
