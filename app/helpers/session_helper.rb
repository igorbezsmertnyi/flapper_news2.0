module SessionHelper

  def sign_in(user)
    session_hash = { token: set_access_token,
                     user_id: user[:id] }
    @current_session = Session.create(session_hash)
    user = User.find_by_id(user).update(token: @current_session[:token],
                                        session_id: @current_session[:id])
    if user
      @current_session
    end
  end

  def current_user
    User.find_by_token(params[:token])
  end

  def logged_in?
    Session.find_by_token(params[:token])
  end

  private

  def set_access_token
    token = generate_token
  end

  def generate_token
    loop do
      token = SecureRandom.hex(30)
      break token unless Session.where(token: token).exists?
    end
  end
end
