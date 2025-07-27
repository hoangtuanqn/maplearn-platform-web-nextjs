export interface SidebarType {
    title: string;
    url: string;
    image: string;
    className?: string;
}
export interface NewType extends SidebarType {
    createdAt: string;
}
