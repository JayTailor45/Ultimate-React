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

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])
        .select()
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