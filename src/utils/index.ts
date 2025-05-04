export const convertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
}

export const getObjectDiff = (original: Record<string, any>, current: Record<string, any>) => {
    const diff: Record<string, any> = {};
    for (const key in current) {
        const newValue = current[key];
        const oldValue = original[key];

        if (newValue !== oldValue && newValue !== "") {
            diff[key] = newValue;
        }
    }
    return diff;
};