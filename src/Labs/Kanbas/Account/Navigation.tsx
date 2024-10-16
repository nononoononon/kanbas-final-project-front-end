import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
    const { pathname } = useLocation();
    const links = [
        { label: "Signin", path: "/Kanbas/Account/Signin" },
        { label: "Signup", path: "/Kanbas/Account/Signup" },
        { label: "Profile", path: "/Kanbas/Account/Profile" }
    ];

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    id={`wd-account-${link.label.toLowerCase()}-link`}
                    className={`list-group-item border border-0 ${
                        pathname.includes(link.label) ? "active text-black bg-white" : "text-danger"
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}