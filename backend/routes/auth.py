from backend.supabase_client import supabase

def sign_up(email, password):
    try:
        user = supabase.auth.sign_up({"email": email, "password": password})
        return user
    except Exception as e:
        print(f"Error signing up: {e}")
        return None
    
def sign_in(email, password):
    try:
        user = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return user
    except Exception as e:
        print(f"Error signing in: {e}")
        return None
    
def sign_out():
    try:
        supabase.auth.sign_out()
        return {"message": "Signed out successfully"}
    except Exception as e:
        print(f"Error signing out: {e}")
        return None
    
def forgot_password(email):
    try:
        response = supabase.auth.reset_password_for_email(email)
        return response
    except Exception as e:
        print(f"Error in forgot password: {e}")
        return None
    
# sign_up("daniwave100@gmail.com", "hey12345")