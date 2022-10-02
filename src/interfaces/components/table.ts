export default interface IListTableProps<T extends {}> {
    items: T[];
    hasDetail?: boolean;
    editable?: boolean;
    downloadable?: boolean;
    deletable?: boolean;
}
