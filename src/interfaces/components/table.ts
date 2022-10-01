export default interface IListTableProps<T extends {}> {
    items: T[];
    editable: boolean;
    downloadable: boolean;
}
