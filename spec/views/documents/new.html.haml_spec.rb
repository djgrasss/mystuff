require 'spec_helper'

describe "documents/new" do
  before(:each) do
    assign(:document, stub_model(Document,
      :title => "MyString",
      :description => "MyString",
      :url => "MyString"
    ).as_new_record)
  end

  it "renders new document form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", documents_path, "post" do
      assert_select "input#document_title[name=?]", "document[title]"
      assert_select "input#document_description[name=?]", "document[description]"
      assert_select "input#document_url[name=?]", "document[url]"
    end
  end
end
