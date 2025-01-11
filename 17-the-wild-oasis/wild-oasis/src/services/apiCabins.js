import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins can not be fetched');
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);
    if (error) {
        console.error(error);
        throw new Error('Cabin can not be deleted');
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = typeof newCabin && newCabin.image === 'string' && newCabin.image.startsWith(supabaseUrl)

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    let query = supabase.from('cabins');
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }])
    } else {
        query = query.update([{ ...newCabin, image: imagePath }])
            .eq('id', id);

    }

    const { data, error } = await query
        .select()
        .single();

    if (error) {
        console.error(error);
        throw new Error('Cabin was not created');
    }

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    if (storageError) {
        const { data, error } = await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        throw new Error('Failed to upload image as a result the cabin was not created');
    }

    return data;
}