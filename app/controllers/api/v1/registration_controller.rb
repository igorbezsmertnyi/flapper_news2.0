class Api::V1::RegistrationController < UsersController
  def create
    @user = User.create(user_params)

    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }
    end
  end

  private

  def user_params
    params.require(:registration).permit(:first_name, :last_name, :email, :password)
  end
end
