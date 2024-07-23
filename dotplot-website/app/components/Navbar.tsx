export default function Navbar() {
    return ( 
    <div className="navbar bg-base-100">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">Dotplot Site</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
                <li><a>Sign Up</a></li>
                <li><a>Login</a></li>
            </ul>
        </div>
    </div>
    )
}