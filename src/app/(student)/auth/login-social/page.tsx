import { Suspense } from "react";
import SocialPage from "./_components/SocialPage";
import Loading from "../../_components/Loading";

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <SocialPage />
        </Suspense>
    );
}
