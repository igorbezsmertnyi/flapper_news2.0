class Cover < ApplicationRecord
  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/assets/images/no-image-icon.jpg"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
