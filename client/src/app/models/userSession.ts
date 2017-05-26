export class UserSession {
  id: number
  token: string
  user: {
    email: string
    image_url: string
    first_name: string
    last_name: string
    session_id: number
  }
}
