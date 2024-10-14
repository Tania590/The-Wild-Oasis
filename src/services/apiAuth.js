import supabase, { supabaseURL } from "./supabase";

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

export async function updateCurrentUser({ fullName, avatar, password }) {
  let updatesObj;
  if (password) updatesObj = { password };
  if (fullName) updatesObj = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updatesObj);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  const imageName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(imageName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseURL}/storage/v1/object/public/avatars/${imageName}?t=2024-10-02T08%3A49%3A57.765Z`,
    },
  });
  if (error2) throw new Error(error2.message);
  console.log(updatedUser);
  return updatedUser;
}
