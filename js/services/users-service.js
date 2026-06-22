/* ==================================
   SiraLink Users Service
================================== */

class UsersService {
  constructor() {
    this.table = "users";
  }

  async getCurrentUser() {
    try {
      const { data: { user }, error } =
        await supabase.auth.getUser();

      if (error || !user) return null;

      const { data, error: dbError } =
        await supabase
          .from(this.table)
          .select("*")
          .eq("id", user.id)
          .single();

      if (dbError) throw dbError;

      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserById(id) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updateUser(id, updates) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update(updates)
        .eq("id", id)
        .select();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchUsers(keyword) {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select("*")
        .or(
          `full_name.ilike.%${keyword}%,email.ilike.%${keyword}%,location.ilike.%${keyword}%`
        );

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

window.usersService = new UsersService();