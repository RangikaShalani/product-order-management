
export default function Navbar() {
    // const dispatch = useDispatch();

    return (
        <div
            style={{
                height: 60,
                background: "var(--navbar-bg)",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "0 20px",
                borderBottom: "1px solid var(--border)",
            }}
        >
            <button >Toggle Theme</button>
        </div>
    );
}

