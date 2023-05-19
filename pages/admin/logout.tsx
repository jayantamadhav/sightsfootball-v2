import { signOut } from "next-auth/react";
import { useRouter } from "next/router"
import React from "react"
import routes from "../../lib/routes";

export default () => {
    const router = useRouter();
    React.useEffect(() => {
        signOut({ redirect: true, callbackUrl: routes.ADMIN_LOGIN})
    }, [])
    return (<></>)
}