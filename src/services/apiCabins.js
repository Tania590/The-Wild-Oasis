import supabase, { supabaseURL } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = typeof newCabin.image === "string";

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    console.error(storageError);
    throw new Error(
      "Cabin Image could not be uploaded and the cabin was not created"
    );
  }
}

// import supabase, { supabaseURL } from "./supabase";

// export async function getCabins() {
//   const { data, error } = await supabase.from("cabins").select("*");
//   if (error) {
//     console.error(error);
//     throw new Error("Cabins could not be loaded");
//   }
//   return data;
// }

// export async function deleteCabin(id) {
//   const { error, data } = await supabase.from("cabins").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be deleted");
//   }
//   return data;
// }

// export async function createCabin(newCabin) {
//   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
//     "/",
//     ""
//   );

//   const imagePath = `${supabaseURL}/storage/v1/object/public/cabin-images/${imageName}`;

//   const { data, error } = await supabase
//     .from("cabins")
//     .insert([{ ...newCabin, image: imagePath }])

//     .select();

//   if (error) {
//     console.error(error);
//     throw new Error("Cabin could not be created");
//   }

//   const { error: storageError } = await supabase.storage
//     .from("cabin-images")
//     .upload(imageName, newCabin.image);

//   if (storageError) {
//     await supabase.from("cabins").delete().eq("id", data[0].id);
//     console.error(storageError);
//     throw new Error(
//       "Cabin Image could not be uploaded and the cabin was not created"
//     );
//   }
// }
