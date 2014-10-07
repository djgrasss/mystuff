class Api::V1::ImagesController < ApplicationController
  def new_aws_params
    @s3_direct_post = S3_BUCKET.presigned_post(
        key: "uploads/#{SecureRandom.uuid}/${filename}",
        success_action_status: 201,
        acl: :public_read
    )
    render json: {
        response: {
            s3_direct_post_url_host: @s3_direct_post.url.host,
            s3_direct_post_url: @s3_direct_post.url.to_s,
            s3_direct_post_fields:  @s3_direct_post.fields.to_json(),
        }
    }
  end
  def create

  end
end
