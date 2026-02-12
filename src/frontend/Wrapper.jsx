import image from "/Login-amico.svg";

export default function Wrapper({ children }) {
    return (
        <div
            style={{
                display: "flex",
                width: "80vw",
                height: "90vh",
                margin: "auto",
                borderRadius: "16px",
                overflow: "hidden",
                background: "#fff",
            }}>
            {/* LEFT PANEL */}
            <div
                style={{
                    flex: 1,
                    background: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <img src={image} alt='Illustration' style={{ width: "80%" }} />
            </div>

            {/* RIGHT PANEL */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}>
                {children}
            </div>
        </div>
    );
}
