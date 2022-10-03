export default interface IListTableProps<T extends {}> {
    title: string;
    entity?: string;
    items: T[];
    hasDetail?: boolean;
    editable?: boolean;
    downloadable?: boolean;
    deletable?: boolean;
}
