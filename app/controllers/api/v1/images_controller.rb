class Api::V1::ImagesController < ApplicationController
  def new
    @s3_direct_post = S3_BUCKET.presigned_post(
        key: "uploads/#{SecureRandom.uuid}/${filename}",
        success_action_status: 201,
        acl: :public_read
    )
    @image = Image.new
    render json: {
        s3_direct_post: @s3_direct_post,
        image: @image
    }
  end
end
