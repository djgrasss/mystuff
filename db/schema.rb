# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141012221114) do

  create_table "documents", force: true do |t|
    t.string   "title"
    t.string   "description"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.string   "title"
    t.datetime "datetime"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.datetime "begin_datetime"
    t.datetime "end_datetime"
  end

  create_table "images", force: true do |t|
    t.integer  "user_id"
    t.string   "image_url"
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "frame_url"
    t.string   "page_url"
    t.integer  "item_id"
  end

  add_index "images", ["item_id"], name: "index_images_on_item_id"

  create_table "items", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "actable_id"
    t.string   "actable_type"
  end

  create_table "texts", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "selection_text", limit: 255
    t.string   "frame_url"
    t.string   "page_url"
    t.integer  "item_id"
  end

  add_index "texts", ["item_id"], name: "index_texts_on_item_id"

  create_table "users", force: true do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.boolean  "admin",           default: false
    t.string   "mystuff_token"
    t.integer  "index",           default: 0
    t.string   "firstname"
    t.string   "lastname"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true

end
