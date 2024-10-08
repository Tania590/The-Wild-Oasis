import supabase from "./supabase";

export async function signupUser({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }
  return user;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
