from backend.supabase_client import supabase

def sign_up(email, password):
    try:
        user = supabase.auth.sign_up({"email": email, "password": password})
        return user
    except Exception as e:
        print(f"Error signing up: {e}")
        return None
    
# sign_up("daniwave100@gmail.com", "hey12345")