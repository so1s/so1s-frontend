export default interface IListTableProps<T extends {}> {
    title: string;
    entity?: string;
    items: T[];
    itemKey: keyof T;
    hasDetail?: boolean;
    editable?: boolean;
    downloadable?: boolean;
    deletable?: boolean;
}
