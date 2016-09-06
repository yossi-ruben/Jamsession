class AddImageToSongs < ActiveRecord::Migration[5.0]
  def change
    add_column :songs, :img_file_name, :string
    add_column :songs, :img_file_path, :string
  end
end
