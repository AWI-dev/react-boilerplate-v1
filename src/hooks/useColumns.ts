const useColumns = (baseFields: Array<{ label: string; uid: string; sortable?: boolean }>) => {
    const initialColumns = baseFields.map(field => field.uid);

    const columns = [
        { name: "ID", uid: "id", sortable: true },
        ...baseFields.map(field => ({
            name: field.label,
            uid: field.uid,
            sortable: field.sortable !== false, // Default to true if sortable is undefined
        })),
    ];

    return { initialColumns, columns };
};

export default useColumns;
