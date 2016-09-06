# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160906174801) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "master_track_id"
    t.text     "body"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "connections", force: :cascade do |t|
    t.integer  "follower_id"
    t.integer  "followed_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "feature_tracks", force: :cascade do |t|
    t.string   "description"
    t.integer  "talent_id"
    t.integer  "user_id"
    t.string   "file_name"
    t.string   "file_path"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "song_id"
  end

  create_table "genres", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "master_track_id"
    t.integer  "user_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "master_features", force: :cascade do |t|
    t.integer  "master_track_id"
    t.integer  "feature_track_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "master_tracks", force: :cascade do |t|
    t.integer  "song_id"
    t.string   "description"
    t.string   "file_name"
    t.string   "file_path"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "song_genres", force: :cascade do |t|
    t.integer  "song_id"
    t.integer  "genre_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "song_talents", force: :cascade do |t|
    t.integer  "song_id"
    t.integer  "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "songs", force: :cascade do |t|
    t.string   "title"
    t.integer  "bpm"
    t.string   "key"
    t.string   "time_signature"
    t.text     "background"
    t.boolean  "finished"
    t.integer  "owner_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "img_file_name"
    t.string   "img_file_path"
  end

  create_table "talents", force: :cascade do |t|
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_genres", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "genre_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_talents", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "talent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "encrypted_password"
    t.string   "profile_pic_file_name"
    t.string   "profile_pic_file_path"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end
