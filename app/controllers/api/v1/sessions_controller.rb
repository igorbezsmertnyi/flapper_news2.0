class Api::V1::SessionsController < UsersController

  def create
    find_by_email = User.find_by(email: params[:email])
    @current_user = find_by_email.authenticate(params[:password])

    if @current_user && !logged_in?
      @session = sign_in(@current_user)

      render json: @session
    else
      render json: { errors: @session.errors.full_messages }
    end
  end

  def destroy
    @current_session = Session.find_by_id(params[:id])
    @current_session.user.update(session_id: nil, last_seen: Time.now.utc)
    @current_session.destroy
  end

  def validate_token
    @user = Session.find_by_token(params[:token])
    if @user
      render json: @user
    else
      render body: false, status: :unauthorized
    end
  end
end
