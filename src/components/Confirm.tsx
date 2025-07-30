import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export function ConfirmAlertDialog({
    children,
    message,
    action,
}: {
    children: React.ReactNode;
    message: string;
    action: () => void;
}) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                    <AlertDialogTitle>Thao tác này có chắc chắn không?</AlertDialogTitle>
                    <AlertDialogDescription>{message} Nó không thể hoàn tác lại được đâu nhé!</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy thao tác</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 text-white hover:bg-red-500/90" onClick={action}>
                        Vẫn thực hiện
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
