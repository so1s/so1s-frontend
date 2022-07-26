export default interface IListTableProps<T extends {}> {
    title: string;
    entity?: string;
    items: T[];
    itemKey: keyof T;
    enableBackspace?: boolean;
    hasDetail?: boolean;
    creatable?: boolean;
    editable?: boolean;
    downloadable?: boolean;
    deletable?: boolean;
    deleteAction?: (...args: any[]) => Promise<boolean>;
    deleteParams?: string[];
}
