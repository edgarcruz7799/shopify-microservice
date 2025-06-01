import fs from 'fs/promises';


const CreateFileJSON = async (filename: string, data): Promise<void> => {
    try {
        await fs.writeFile(`${filename}.json`, JSON.stringify(data, null, 2));
        console.log('Archivo guardado exitosamente', data?.order_number);
    } catch (err) {
        console.error('Error al guardar el archivo:', err);
        throw new Error(`Error al guardar el archivo: ${err.message}`);
    }
}

const ReadFileJSON = async (filename: string): Promise<string> => {
    try {
        const data = await fs.readFile(`${filename}.json`, 'utf8');
        return data;
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        throw new Error(`Error al leer el archivo: ${err.message}`);
    }
}

export { CreateFileJSON, ReadFileJSON };